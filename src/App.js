import React from 'react';
import Container from '@mui/material/Container';

import Header from './Header';
import Content from './Content';
import { QueryClient, QueryClientProvider } from "react-query";
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: "#00796b",
    },
    secondary: {
      main: "#d81b60",
    },
  },
});

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Header />
        <Container>
          <Content />
        </Container>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
