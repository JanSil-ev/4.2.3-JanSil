import Search from '.';
import { fireEvent, render, screen } from '@test-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { fetchJob } from '@/store/slice/JobSlice';
import { MemoryRouter } from 'react-router-dom';

const mockDispatch = vi.fn();
let mockState: any = {};

vi.mock('@/store/hooks', () => ({
  useAppDispatch: () => mockDispatch,
  useAppSelector: (selector: any) => selector(mockState),
}));

vi.mock('@/store/slice/JobSlice', () => ({
  fetchJob: vi.fn(),
}));

function renderWithRouter(ui: React.ReactElement) {
  return render(<MemoryRouter>{ui}</MemoryRouter>);
}

describe('Search component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockState = {
      job: { isLoading: false },
      filters: { city: 'Москва' },
    };
  });

  it('рендерится с полем ввода и кнопкой', () => {
    renderWithRouter(<Search />);
    expect(screen.getByPlaceholderText(/должность/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /найти/i })).toBeInTheDocument();
  });

  it('по клику на "Найти" вызывает fetchJob с query и city', () => {
    renderWithRouter(<Search />);
    const input = screen.getByPlaceholderText(/должность/i);
    fireEvent.change(input, { target: { value: 'Frontend' } });
    fireEvent.click(screen.getByRole('button', { name: /найти/i }));

    expect(mockDispatch).toHaveBeenCalled();
    expect(fetchJob).toHaveBeenCalledWith({ query: 'Frontend', city: 'Москва' });
  });

  it('по Enter вызывает fetchJob', () => {
    renderWithRouter(<Search />);
    const input = screen.getByPlaceholderText(/должность/i);
    fireEvent.change(input, { target: { value: 'React Developer' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    expect(mockDispatch).toHaveBeenCalled();
    expect(fetchJob).toHaveBeenCalledWith({ query: 'React Developer', city: 'Москва' });
  });
});
