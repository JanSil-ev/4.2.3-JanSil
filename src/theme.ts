import { createTheme } from '@mantine/core';

export const theme = createTheme({
  colors: {
    brand: [
      '#f2f4ff',
      '#e1e6fb',
      '#c3cdf7',
      '#9aaaf2',
      '#7086ed',
      '#4263EB', // основной
      '#364FC7', // тёмный вариант
      '#2f45ad',
      '#243685',
      '#1b2963',
    ],
  },

  primaryColor: 'brand',
  primaryShade: 5,

  fontFamily: 'Open Sans, system-ui, sans-serif',

  defaultRadius: 'md',

  components: {
    Button: {
      styles: {
        root: {
          fontFamily: 'Open Sans, system-ui, sans-serif',
          borderRadius: '8px',
          fontWeight: 500,
          fontSize: '14px',
          padding: '8px 16px',
          transition: 'background 0.2s ease, color 0.2s ease',
          textTransform: 'none',
        },
      },
    },

    Card: {
      styles: {
        root: {
          borderRadius: '12px',
          border: '1px solid #e6e6e6',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
          backgroundColor: '#fff',
        },
      },
    },

    Text: {
      styles: {
        root: {
          fontFamily: 'Open Sans, system-ui, sans-serif',
        },
      },
    },

    Badge: {
      styles: {
        root: {
          borderRadius: '4px',
          fontWeight: 600,
          fontSize: '10px',
          padding: '2px 6px',
          textTransform: 'uppercase',
        },
      },
    },
  },
});
