import Header from '.';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MantineProvider } from '@mantine/core';

function renderWithMantine(ui: React.ReactElement) {
  return render(<MantineProvider>{ui}</MantineProvider>);
}

describe('Header component', () => {
  it('должен отображать логотип и название', () => {
    renderWithMantine(<Header />);
    expect(screen.getByAltText('logo')).toBeInTheDocument();
    expect(screen.getByText('.FrontEnd')).toBeInTheDocument();
  });

  it('должен отображать навигационные кнопки', () => {
    renderWithMantine(<Header />);
    expect(screen.getByText('Вакансии FE')).toBeInTheDocument();
    expect(screen.getByText('Обо мне')).toBeInTheDocument();
  });

  it('кнопка "Вакансии FE" должна быть активной', () => {
    renderWithMantine(<Header />);
    const activeButton = screen.getByText('Вакансии FE').closest('button');
    expect(activeButton?.className).toMatch(/active/);
  });
});
