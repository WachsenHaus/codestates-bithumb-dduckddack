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
import { loadFull } from 'tsparticles';
import Particles from 'react-tsparticles';
import { loadStarsPreset } from 'tsparticles-preset-stars';
import bg_main from '../../asset/img/bg_main.png';
import { useGenerateSocket } from './hooks/useWebSocket';

// import SignModal from './components/Modal/SignModal';
// import RoutePage from './page/RoutePage';

// import { Home } from 'grommet-icons';
// <Route path={`:coinName`} element={<TradePage />} />
const App = () => {
  const particlesInit = async (main: any) => {
    console.log(main);
    await loadFull(main);
  };

  return (
    <RecoilRoot>
      <DebugObserver />
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <StyledEngineProvider>
          <Particles
            id="tsparticles"
            options={{
              // preset: 'stars',
              // backgroundMode: true,
              detectRetina: true,
              fps_limit: 120,
              zLayers: 0,
              fullScreen: true,
              style: {
                // opacity: '0.1',
                // position: 'fixed',
                width: '100vw',
                height: '100vh',
                // zIndex: '-1',
                // backgroundColor: 'black',
              },
            }}
            params={{
              particles: {
                number: {
                  value: 60,
                  density: {
                    enable: true,
                    value_area: 1500,
                  },
                },
                line_linked: {
                  enable: true,
                  opacity: 0.02,
                },
                move: {
                  direction: 'right',
                  speed: 0.05,
                },
                size: {
                  value: 1,
                },
                opacity: {
                  anim: {
                    enable: true,
                    speed: 1,
                    opacity_min: 0.05,
                  },
                },
              },
              interactivity: {
                events: {
                  onclick: {
                    enable: true,
                    mode: 'push',
                  },
                },
                modes: {
                  push: {
                    particles_nb: 1,
                  },
                },
              },
              retina_detect: true,
            }}
            init={particlesInit}
          />

          <CssBaseline />
          <SignModal />
          <RoutePage />
        </StyledEngineProvider>
      </LocalizationProvider>
    </RecoilRoot>
  );
};

export default App;
