import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MantineProvider } from '@mantine/core';
import { MemoryRouter } from 'react-router-dom';
import * as reduxHooks from '@/store/hooks';
import VacancyPage from './index';

// Мокаем useParams, чтобы возвращал id вакансии
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
  return {
    ...actual,
    useParams: () => ({ id: '1' }),
  };
});

// Мокаем Redux хуки
vi.mock('@/store/hooks', () => ({
  useAppDispatch: vi.fn(),
  useAppSelector: vi.fn(),
}));

function renderWithMantineAndRouter(ui: React.ReactElement) {
  return render(
    <MantineProvider>
      <MemoryRouter>{ui}</MemoryRouter>
    </MantineProvider>
  );
}

describe('VacancyPage component', () => {
  const mockDispatch = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (reduxHooks.useAppDispatch as any).mockReturnValue(mockDispatch);
  });

  it('рендерит карточку вакансии и описание, если данные есть', () => {
    (reduxHooks.useAppSelector as any).mockReturnValue({
      data: { items: [] },
      selectedVacancy: {
        id: '1',
        name: 'Frontend Developer',
        employer: { name: 'Tech Corp' },
        description: '<p>Описание вакансии</p>',
        alternate_url: 'https://hh.ru/vacancy/1',
      },
      isLoading: false,
      error: null,
    });

    renderWithMantineAndRouter(<VacancyPage />);

    expect(screen.getByText('Frontend Developer')).toBeInTheDocument();
    expect(screen.getByText('Tech Corp')).toBeInTheDocument();
    expect(screen.getByText(/О компании/i)).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /Перейти на hh.ru/i })
    ).toHaveAttribute('href', 'https://hh.ru/vacancy/1');
  });

  it('рендерит сообщение об ошибке при наличии error', () => {
    (reduxHooks.useAppSelector as any).mockReturnValue({
      data: null,
      selectedVacancy: null,
      isLoading: false,
      error: 'Ошибка сети',
    });

    renderWithMantineAndRouter(<VacancyPage />);

    expect(screen.getByText(/Ошибка загрузки/i)).toBeInTheDocument();
    expect(screen.getByText(/Ошибка сети/i)).toBeInTheDocument();
  });

  it('рендерит лоадер, если вакансия загружается', () => {
    (reduxHooks.useAppSelector as any).mockReturnValue({
      data: null,
      selectedVacancy: null,
      isLoading: true,
      error: null,
    });

    renderWithMantineAndRouter(<VacancyPage />);

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });
});
