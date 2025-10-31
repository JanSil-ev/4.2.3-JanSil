import ListJob from '.';
import { render, screen } from '@test-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';

const mockDispatch = vi.fn();
let mockState: any = {};

vi.mock('@/store/hooks', () => ({
  useAppDispatch: () => mockDispatch,
  useAppSelector: (selector: any) => selector(mockState),
}));

function renderWithRouter(ui: React.ReactElement) {
  return render(<MemoryRouter>{ui}</MemoryRouter>);
}

describe('ListJob component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('должен отображать Loader при загрузке', () => {
    mockState = {
      job: { isLoading: true, error: null, data: null },
      filters: { city: 'all' },
    };
    renderWithRouter(<ListJob />);
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('должен отображать сообщение об ошибке', () => {
    mockState = {
      job: { isLoading: false, error: 'Ошибка загрузки', data: null },
      filters: { city: 'all' },
    };
    renderWithRouter(<ListJob />);
    expect(screen.getByText(/Ошибка загрузки/i)).toBeInTheDocument();
  });

  it('должен отображать "Вакансии не найдены", если список пуст', () => {
    mockState = {
      job: { isLoading: false, error: null, data: { items: [] } },
      filters: { city: 'all' },
    };
    renderWithRouter(<ListJob />);
    expect(screen.getByText(/Вакансии не найдены/i)).toBeInTheDocument();
  });

  it('должен отображать список вакансий', () => {
    mockState = {
      job: {
        isLoading: false,
        error: null,
        data: {
          items: [
            { id: 1, name: 'Frontend Developer', employer: { name: 'Company A' } },
            { id: 2, name: 'React Engineer', employer: { name: 'Company B' } },
          ],
          pages: 1,
        },
      },
      filters: { city: 'all' },
    };

    renderWithRouter(<ListJob />);
    expect(screen.getByText(/Frontend Developer/i)).toBeInTheDocument();
    expect(screen.getByText(/React Engineer/i)).toBeInTheDocument();
  });
});
