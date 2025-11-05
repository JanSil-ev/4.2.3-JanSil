import Search from '.';
import { fireEvent, render, screen } from '@test-utils';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { setQuery } from '@/store/slice/searchSlice';

const mockDispatch = vi.fn();
const mockSetSearchParams = vi.fn();
let mockState: any = {};

vi.mock('@/store/hooks', () => ({
  useAppDispatch: () => mockDispatch,
  useAppSelector: (selector: any) => selector(mockState),
}));


vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<any>('react-router-dom');
  return {
    ...actual,
    useSearchParams: () => [new URLSearchParams(), mockSetSearchParams],
  };
});

function renderWithRouter(ui: React.ReactElement) {
  return render(<MemoryRouter>{ui}</MemoryRouter>);
}

describe('Search component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockState = {
      job: { isLoading: false },
    };
  });

  it('рендерится с полем ввода и кнопкой', () => {
    renderWithRouter(<Search />);
    expect(screen.getByPlaceholderText(/должность/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /найти/i })).toBeInTheDocument();
  });

  it('по клику на кнопку "Найти" вызывает setQuery и обновляет URL', () => {
    renderWithRouter(<Search />);
    const input = screen.getByPlaceholderText(/должность/i);
    fireEvent.change(input, { target: { value: 'Frontend' } });
    fireEvent.click(screen.getByRole('button', { name: /найти/i }));

    expect(mockDispatch).toHaveBeenCalledWith(setQuery('Frontend'));
    expect(mockSetSearchParams).toHaveBeenCalled();
  });

  it('по Enter в поле ввода вызывает setQuery и обновляет URL', () => {
    renderWithRouter(<Search />);
    const input = screen.getByPlaceholderText(/должность/i);
    fireEvent.change(input, { target: { value: 'React Developer' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    expect(mockDispatch).toHaveBeenCalledWith(setQuery('React Developer'));
    expect(mockSetSearchParams).toHaveBeenCalled();
  });

  it('при пустом поле ввода удаляет query из URL', () => {
    renderWithRouter(<Search />);
    const input = screen.getByPlaceholderText(/должность/i);
    fireEvent.change(input, { target: { value: '' } });
    fireEvent.click(screen.getByRole('button', { name: /найти/i }));

    expect(mockDispatch).toHaveBeenCalledWith(setQuery(''));
    expect(mockSetSearchParams).toHaveBeenCalled();
  });
});
