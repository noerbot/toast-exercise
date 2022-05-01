import React from 'react';
import Container from '@mui/material/Container';

import Header from './Header';
import Content from './Content';
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <Container>
        <Content />
      </Container>
    </QueryClientProvider>
  );
}

export default App;
