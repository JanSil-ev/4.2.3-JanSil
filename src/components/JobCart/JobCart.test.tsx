import JobCard from '.';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MantineProvider } from '@mantine/core';
import { JobCardProps } from '@/types';

function renderWithMantine(ui: React.ReactElement) {
  return render(<MantineProvider>{ui}</MantineProvider>);
}

const baseJob: JobCardProps = {
  id: '1',
  name: 'Frontend Developer',
  salary_range: { from: 100000, to: 150000, currency: '', gross: true },
  experience: { id: '1–3 года', name: '1–3 года' },
  employer: {
    name: 'Tech Corp',
    accredited_it_employer: true,
    alternate_url: 'https://hh.ru/vacancy/vacancie/Frontend Developer',
    id: ' ',
    trusted: true,
    url: ' ',
    vacancies_url: 'https://hh.ru/vacancy/vacancie/Frontend Developer',
  },
  work_format: [{ id: '1', name: 'Удалённо' }],
  address: { city: 'Москва' },
  alternate_url: 'https://hh.ru/vacancy/1',
};

describe('JobCard component', () => {
  it('должен отображать название вакансии и работодателя', () => {
    renderWithMantine(<JobCard {...baseJob} />);
    expect(screen.getByText('Frontend Developer')).toBeInTheDocument();
    expect(screen.getByText('Tech Corp')).toBeInTheDocument();
  });

  it('должен корректно отображать диапазон зарплаты', () => {
    renderWithMantine(<JobCard {...baseJob} />);
    expect(screen.getByText('100000 – 150000 ₽')).toBeInTheDocument();
  });

  it('должен отображать формат работы в виде бейджа', () => {
    renderWithMantine(<JobCard {...baseJob} />);
    expect(screen.getByText('УДАЛЁННО')).toBeInTheDocument();
  });

  it('должен отображать город, если он указан', () => {
    renderWithMantine(<JobCard {...baseJob} />);
    expect(screen.getByText('Москва')).toBeInTheDocument();
  });

  it('должен содержать ссылку "Смотреть вакансию" с правильным href', () => {
    renderWithMantine(<JobCard {...baseJob} />);
    const viewButton = screen.getByRole('link', { name: /смотреть вакансию/i });
    expect(viewButton).toHaveAttribute('href', 'https://hh.ru/vacancy/1');
    expect(viewButton).toHaveAttribute('target', '_blank');
  });
});
