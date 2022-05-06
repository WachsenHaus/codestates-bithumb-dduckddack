import { Box } from '@mui/material';
import classNames from 'classnames';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from '../components/Header/Header';
import ChatPage from './ChatPage';
import TradePage from './TradePage';
import UserPage from './UserPage';

const RoutePage = () => {
  return (
    <>
      <BrowserRouter>
        <Box className={classNames(`grid grid-cols-12 `)}>
          <Box gridColumn={`span 12`}>
            <Header />
          </Box>
          <Routes>
            <Route path={'/user'} element={<UserPage />} />
            <Route path={'/chat'} element={<ChatPage />} />
            <Route path={`/:coinName`} element={<TradePage />} />
            <Route path={`/`} element={<TradePage />} />
          </Routes>
        </Box>
      </BrowserRouter>
    </>
  );
};

export default RoutePage;
