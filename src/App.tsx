import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { theme } from './theme';
import { Page } from './components/Page';

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <Page/>
    </MantineProvider>
  );
}
