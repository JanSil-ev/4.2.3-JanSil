import ListJob from '.';
import { render, screen } from '@test-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const mockDispatch = vi.fn();
let mockState: any = {};

vi.mock('@/store/hooks', () => ({
  useAppDispatch: () => mockDispatch,
  useAppSelector: (selector: any) => selector(mockState),
}));

describe('ListJob component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('должен отображать Loader при загрузке', () => {
    mockState = {
      job: { isLoading: true, error: null, data: null },
      filters: { city: 'all' },
    };
    render(<ListJob />);
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('должен отображать сообщение об ошибке', () => {
    mockState = {
      job: { isLoading: false, error: 'Ошибка загрузки', data: null },
      filters: { city: 'all' },
    };
    render(<ListJob />);
    expect(screen.getByText(/Ошибка загрузки/i)).toBeInTheDocument();
  });

  it('должен отображать "Вакансии не найдены", если список пуст', () => {
    mockState = {
      job: { isLoading: false, error: null, data: { items: [] } },
      filters: { city: 'all' },
    };
    render(<ListJob />);
    expect(screen.getByText(/Вакансии не найдены/i)).toBeInTheDocument();
  });
});
