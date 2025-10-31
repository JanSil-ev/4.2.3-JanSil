import Skills from '.';
import { fireEvent, render, screen } from '@test-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { updateCityAndFetch } from '@/store/slice/filtersSlice';
import { addSkill, removeSkill, updateSkillsAndFetch } from '@/store/slice/skillsSlice';
import { MemoryRouter } from 'react-router-dom';

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

function renderWithRouter(ui: React.ReactElement) {
  return render(<MemoryRouter>{ui}</MemoryRouter>);
}

describe('Skills component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockState = {
      skills: { skills: ['React', 'TypeScript'] },
      filters: { city: 'all' },
    };
  });

  it('рендерит навыки и селект города', () => {
    renderWithRouter(<Skills />);
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('добавляет новый навык по клику на кнопку', () => {
    renderWithRouter(<Skills />);
    const input = screen.getByPlaceholderText(/навык/i);
    fireEvent.change(input, { target: { value: 'Redux' } });
    fireEvent.click(screen.getByTestId('add'));

    expect(addSkill).toHaveBeenCalledWith('Redux');
    expect(updateSkillsAndFetch).toHaveBeenCalledWith(['React', 'TypeScript', 'Redux']);
  });

  it('удаляет навык при клике на кнопку удаления', () => {
    renderWithRouter(<Skills />);
    const pill = screen.getByTestId('React');
    fireEvent.click(pill.querySelector('button')!); // клик по remove button
    expect(removeSkill).toHaveBeenCalledWith('React');
  });

  it('изменяет город при выборе из Select', async () => {
    renderWithRouter(<Skills />);

    const selectControl = screen.getByRole('combobox');
    fireEvent.mouseDown(selectControl);

    const option = await screen.findByText('Москва');
    fireEvent.click(option);

    expect(updateCityAndFetch).toHaveBeenCalledWith('1');
  });
});
