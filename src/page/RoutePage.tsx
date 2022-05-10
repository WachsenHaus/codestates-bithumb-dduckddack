import { Box } from '@mui/material';
import classNames from 'classnames';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from '../components/Header/Header';
import ChatPage from './ChatPage';
import TradePage from './TradePage';
import UserPage from './UserPage';
import { loadFull } from 'tsparticles';
import Particles from 'react-tsparticles';
import bg_full from '../asset/img/bg_full.png';
import NewsPage from './NewsPage';
import MainPage from './MainPage';
import useChangeWebTitle from '../hooks/useChangeWebTitle';
import useInitialize from '../hooks/useInitialize';
import useResetObserverDrawData from '../hooks/useResetDrawData';
import { useGenerateSocket } from '../hooks/useWebSocket';

const RoutePage = () => {
  useGenerateSocket('CHAT');
  return (
    <>
      <BrowserRouter>
        <Box
          className={classNames(`gap-x-10`, `grid grid-cols-12 grid-rows-2 w-screen h-screen `, `grid-rows-[7%_auto]`)}
          style={{
            backgroundImage: `url(${bg_full})`,
          }}
        >
          <Box gridColumn={`span 12`}>
            <Header />
          </Box>
          <Routes>
            <Route path={`/`} element={<MainPage />} />
            <Route path={'/news'} element={<NewsPage />} />
            <Route path={'/user'} element={<UserPage />} />
            <Route path={'/chat'} element={<ChatPage />} />
            <Route path={`/trade`} element={<TradePage />} />
            <Route path={`/trade/:coinName`} element={<TradePage />} />
          </Routes>
        </Box>
      </BrowserRouter>
    </>
  );
};

export default RoutePage;
