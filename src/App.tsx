import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { RecoilRoot } from 'recoil';
import TradePage from './page/TradePage';
import { StyledEngineProvider, CssBaseline, Box } from '@mui/material';
import { LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DebugObserver from './RecoilDebug';
import RoutePage from './page/RoutePage';
import SignModal from './components/Modal/SignModal';
// import SignModal from './components/Modal/SignModal';
// import RoutePage from './page/RoutePage';

// import { Home } from 'grommet-icons';
// <Route path={`:coinName`} element={<TradePage />} />
const App = () => {
  return (
    <RecoilRoot>
      <DebugObserver />
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <StyledEngineProvider>
          <CssBaseline />
          <SignModal />
          <RoutePage />
        </StyledEngineProvider>
      </LocalizationProvider>
    </RecoilRoot>
  );
};

export default App;
