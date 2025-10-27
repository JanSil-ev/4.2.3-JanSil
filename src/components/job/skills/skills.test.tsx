import Skills from '.';
import { fireEvent, render, screen } from '@test-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { updateCityAndFetch } from '@/store/slice/filtersSlice';
import { addSkill, removeSkill, updateSkillsAndFetch } from '@/store/slice/skillsSlice';

const mockDispatch = vi.fn();
let mockState: any = {};

vi.mock('@/store/hooks', () => ({
  useAppDispatch: () => mockDispatch,
  useAppSelector: (selector: any) => selector(mockState),
}));

vi.mock('@/store/slice/skillsSlice', () => ({
  addSkill: vi.fn(),
  removeSkill: vi.fn(),
  updateSkillsAndFetch: vi.fn(),
}));

vi.mock('@/store/slice/filtersSlice', () => ({
  updateCityAndFetch: vi.fn(),
}));

describe('Skills component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockState = {
      skills: { skills: ['React', 'TypeScript'] },
      filters: { city: 'all' },
    };
  });

  it('рендерит навыки и селект города', () => {
    render(<Skills />);
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/все города/i)).toBeInTheDocument();
  });

  it('добавляет новый навык по клику на кнопку', () => {
    render(<Skills />);
    const input = screen.getByPlaceholderText(/навык/i);
    fireEvent.change(input, { target: { value: 'Redux' } });
    fireEvent.click(screen.getByRole('button'));

    expect(addSkill).toHaveBeenCalledWith('Redux');
    expect(updateSkillsAndFetch).toHaveBeenCalledWith(['React', 'TypeScript', 'Redux']);
  });

  it('удаляет навык при клике на кнопку удаления', () => {
    render(<Skills />);
    fireEvent.click(screen.getByTestId('React'));

    !expect(screen.getByText('React'));
  });

  it('изменяет город при выборе из Select', async () => {
    render(<Skills />);

    const selectControl = screen.getByRole('combobox');
    fireEvent.mouseDown(selectControl);

    const option = await screen.findByText('Москва');
    fireEvent.click(option);

    expect(updateCityAndFetch).toHaveBeenCalledWith('1');
  });
});
