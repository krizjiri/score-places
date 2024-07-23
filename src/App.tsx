import './App.css';
import Places from './components/Places.tsx';
import Paper from '@mui/material/Paper';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Paper>
        <Places />
      </Paper>
    </QueryClientProvider>
  );
}

export default App;
