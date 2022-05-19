import React from 'react';
import { RecoilRoot } from 'recoil';
import {
  StyledEngineProvider,
  CssBaseline,
  ThemeProvider,
  createTheme,
} from '@mui/material';
import { LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DebugObserver from './RecoilDebug';
import RoutePage from './page/RoutePage';
import ChartModal from './components/Modal/ChartModal';
import axios from 'axios';

export const DDUCKDDACK_AXIOS = axios.create({});
const App = () => {
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });
  return (
    <RecoilRoot>
      <DebugObserver />
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <StyledEngineProvider>
          <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <ChartModal />

            <RoutePage />
          </ThemeProvider>
        </StyledEngineProvider>
      </LocalizationProvider>
    </RecoilRoot>
  );
};

export default App;
