import { Box } from '@mui/material';
import classNames from 'classnames';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from '../components/Header/Header';
import ChatPage from './ChatPage';
import TradePage from './TradePage';
import UserPage from './SiginUpPage';
import NewsPage from './NewsPage';
import MainPage from './MainPage';
import { useGenerateSocket } from '../hooks/useWebSocket';
import SiginUpPage from './SiginUpPage';
import SignInModal from '../components/Modal/SignInModal';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { atomUserInfo, TypeUser } from '../atom/user.atom';

const RoutePage = () => {
  useGenerateSocket('CHAT');

  const setUserInfo = useSetRecoilState(atomUserInfo);
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    const email = localStorage.getItem('email');
    const id = localStorage.getItem('id');
    const nickName = localStorage.getItem('nickName');

    if (accessToken && refreshToken && email && id && nickName) {
      const userInfo: TypeUser = {
        accessToken: accessToken,
        refreshToken: refreshToken,
        userInfo: {
          email: email,
          id: Number(id),
          nickName: nickName,
        },
      };
      setUserInfo(userInfo);
    }
  }, []);

  return (
    <>
      <BrowserRouter>
        <SignInModal />
        <div className={classNames(`w-screen h-screen max-w-full max-h-full`)}>
          <div
            className={classNames('grid grid-cols-12 ', ` h-full w-full`)}
            style={{
              gridTemplateRows: '8% auto',
            }}
          >
            <div className={classNames(`col-span-full row-span-1 `)}>
              <Header />
            </div>
            <div className={classNames(`col-span-full row-start-2 row-span-1`)}>
              <Routes>
                <Route path={`/`} element={<MainPage />} />
                <Route path={'/news'} element={<NewsPage />} />
                <Route path={'/user'} element={<SiginUpPage />} />
                <Route path={'/chat'} element={<ChatPage />} />
                <Route path={`/trade`} element={<TradePage />} />
                <Route path={`/trade/:coinName`} element={<TradePage />} />
              </Routes>
            </div>
          </div>
        </div>
      </BrowserRouter>
    </>
  );
};

export default RoutePage;
