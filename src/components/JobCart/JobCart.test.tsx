import JobCard from '.';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MantineProvider } from '@mantine/core';
import { MemoryRouter } from 'react-router-dom';
import { JobCardProps } from '@/types';

function renderWithMantineAndRouter(ui: React.ReactElement) {
  return render(
    <MantineProvider>
      <MemoryRouter>{ui}</MemoryRouter>
    </MantineProvider>
  );
}

const baseJob: JobCardProps = {
  id: '1',
  name: 'Frontend Developer',
  salary_range: { from: 100000, to: 150000, currency: '', gross: true },
  experience: { id: '1–3 года', name: '1–3 года' },
  employer: {
    name: 'Tech Corp',
    accredited_it_employer: true,
    alternate_url: 'https://hh.ru/vacancy/FrontendDeveloper',
    id: '1',
    trusted: true,
    url: 'https://hh.ru/company/1',
    vacancies_url: 'https://hh.ru/vacancies/company/1',
  },
  work_format: [{ id: 'REMOTE', name: 'Удалённо' }],
  address: { city: 'Москва' },
  alternate_url: 'https://hh.ru/vacancy/1',
  description: 'Описание вакансии',
};

describe('JobCard component', () => {
  it('отображает название вакансии и работодателя', () => {
    renderWithMantineAndRouter(<JobCard {...baseJob} />);
    expect(screen.getByText('Frontend Developer')).toBeInTheDocument();
    expect(screen.getByText('Tech Corp')).toBeInTheDocument();
  });

  it('корректно отображает диапазон зарплаты', () => {
    renderWithMantineAndRouter(<JobCard {...baseJob} />);
    expect(screen.getByText('100000 – 150000 ₽')).toBeInTheDocument();
  });

  it('отображает формат работы как бейдж', () => {
    renderWithMantineAndRouter(<JobCard {...baseJob} />);
    expect(screen.getByText('УДАЛЁННО')).toBeInTheDocument();
  });

  it('отображает город, если он указан', () => {
    renderWithMantineAndRouter(<JobCard {...baseJob} />);
    expect(screen.getByText('Москва')).toBeInTheDocument();
  });

  it('содержит кнопку "Смотреть вакансию" с корректным маршрутом', () => {
    renderWithMantineAndRouter(<JobCard {...baseJob} />);
    const viewButton = screen.getByRole('link', { name: /смотреть вакансию/i });
    expect(viewButton).toHaveAttribute('href', '/vacancies/1');
  });

  it('содержит кнопку "Откликнуться" с внешней ссылкой hh.ru', () => {
    renderWithMantineAndRouter(<JobCard {...baseJob} />);
    const replyButton = screen.getByRole('link', { name: /откликнуться/i });
    expect(replyButton).toHaveAttribute('href', 'https://hh.ru/vacancy/1');
    expect(replyButton).toHaveAttribute('target', '_blank');
  });
});
