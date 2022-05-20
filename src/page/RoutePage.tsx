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
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import {
  atomUserChartDatas,
  atomUserInfo,
  IUserChatDatas,
  TypeUser,
} from '../atom/user.atom';
import NotFoundPage from './NotFoundPage';
import axios from 'axios';
import { API_USER } from '../api/user.api';
import CONST_ROUTE from '../Routes';
import MyPage from './MyPage';
import { API_DRAW } from '../api/draw.api';
import { dduckddackResponseVO } from '../type/api';
import { DDUCKDDACK_AXIOS } from '../App';
import CommonModal from '../components/Modal/CommonModal';

const RoutePage = () => {
  useGenerateSocket('CHAT');
  useGenerateSocket('SUBSCRIBE');

  const setUserInfo = useSetRecoilState(atomUserInfo);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    const email = localStorage.getItem('email');
    const id = localStorage.getItem('id');
    const nickName = localStorage.getItem('nickName');
    const imagePath = localStorage.getItem('imagePath');

    if (accessToken && refreshToken && email && id && nickName && imagePath) {
      // 로그인 시도후 성공적으로 된다면 저장할것,,
      const userInfo: TypeUser = {
        accessToken: accessToken,
        refreshToken: refreshToken,
        userInfo: {
          email: email,
          id: Number(id),
          nickName: nickName,
          imagePath: imagePath,
        },
      };

      DDUCKDDACK_AXIOS.defaults.headers.common['Authorization'] = refreshToken;

      // getDrawImage(Number(id),);
      setUserInfo(userInfo);
    }
  }, []);

  useEffect(() => {}, []);

  // 도화지 도메인으로부터 데이터를 받아옴

  // const getDrawImage = async (id: number, coinName: string) => {
  //   try {
  //     const result = await DDUCKDDACK_AXIOS.get<
  //       dduckddackResponseVO<IUserChatDatas[]>
  //     >(`${API_DRAW.GET_IMAGE}`, {
  //       params: {
  //         userId: id,
  //         coin: coinName,
  //       },
  //     });
  //     if (result.data.status === 'ok') {
  //       const data = result.data.message;
  //       setUserImageData(data);
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  return (
    <>
      <BrowserRouter>
        <CommonModal />
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
                <Route path={CONST_ROUTE.HOME} element={<MainPage />} />
                <Route path={CONST_ROUTE.MY} element={<MyPage />} />

                <Route path={CONST_ROUTE.NEWS} element={<NewsPage />} />
                <Route path={CONST_ROUTE.SIGN_UP} element={<SiginUpPage />} />
                <Route path={CONST_ROUTE.CHAT} element={<ChatPage />} />
                <Route path={CONST_ROUTE.TRADE} element={<TradePage />} />
                <Route
                  path={`${CONST_ROUTE.TRADE}/:coinName`}
                  element={<TradePage />}
                />
                <Route path={CONST_ROUTE.NOTPAGE} element={<NotFoundPage />} />
              </Routes>
            </div>
          </div>
        </div>
      </BrowserRouter>
    </>
  );
};

export default RoutePage;
