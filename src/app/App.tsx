import React from 'react';
import { Navigations } from './navigations';
import { ThemeProvider } from 'styled-components/native';
import { theme } from './theme';

const App = () => (
  <ThemeProvider theme={theme}>
    <Navigations />
  </ThemeProvider>
);

export default App;
