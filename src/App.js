import { Box } from '@mui/material';
import './App.css';
import Navbar from './component/Navbar';
import Main from './component/Main';

function App() {
  return (
    <Box>
      <Navbar/>
      <Box>
        <Main/>
      </Box>
    </Box>
  );
}

export default App;
