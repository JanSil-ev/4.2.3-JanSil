import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MantineProvider } from '@mantine/core';
import { MemoryRouter } from 'react-router-dom';
import Header from '.';

function renderWithProviders(ui: React.ReactElement) {
  return render(
    <MantineProvider>
      <MemoryRouter>{ui}</MemoryRouter>
    </MantineProvider>
  );
}

describe('Header component', () => {
  it('должен отображать логотип и название', () => {
    renderWithProviders(<Header />);
    expect(screen.getByAltText('logo')).toBeInTheDocument();
    expect(screen.getByText('.FrontEnd')).toBeInTheDocument();
  });

  it('должен отображать навигационные элементы', () => {
    renderWithProviders(<Header />);
    expect(screen.getByText('Вакансии FE')).toBeInTheDocument();
    expect(screen.getByText('Обо мне')).toBeInTheDocument();
  });

  it('ссылка "Вакансии FE" должна быть активной', () => {
    renderWithProviders(<Header />);
    const activeLink = screen.getByText('Вакансии FE').closest('a');
    expect(activeLink?.className).toMatch(/active/);
  });

  it('кнопка "Обо мне" должна содержать аватар и текст', () => {
    renderWithProviders(<Header />);
    const aboutButton = screen.getByText('Обо мне').closest('button');
    expect(aboutButton).toBeInTheDocument();
    expect(screen.getByRole('img')).toBeInTheDocument();
  });
});
