import '@mantine/core/styles.css';

import { MantineProvider } from '@mantine/core';
import AppRoutes from './Routes';
import { theme } from './theme';

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <AppRoutes />
    </MantineProvider>
  );
}
