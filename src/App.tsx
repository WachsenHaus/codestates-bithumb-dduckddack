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
import SignModal from './components/Modal/SignModal';

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
            <SignModal />
            <RoutePage />
          </ThemeProvider>
        </StyledEngineProvider>
      </LocalizationProvider>
    </RecoilRoot>
  );
};

export default App;
