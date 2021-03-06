import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Autocomplete, createFilterOptions, TextField } from '@mui/material';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useCoinChart } from '../hooks/useInitialize';
import { atomUseCoins } from '../atom/total.atom';
import { TypeDrawTicker } from '../atom/drawData.atom';
import { atomSelectCoinDefault } from '../atom/selectCoinDefault.atom';
import TvDrawingChart from '../components/TvChart/TvDrawingChart';
import classNames from 'classnames';
import ChatRoom from '../components/Chat/ChatRoom';
import CoinBarForChat from '../components/CoinBar/CoinBarForChat';
import MainWrapper from '../components/Common/MainWrapper';
import NewsHeadLine from '../components/News/NewsHeadLine';
import { useGenerateSocket } from '../hooks/useWebSocket';
import useSetDefaultCoin from '../hooks/useSetDefaultCoin';
import { motion } from 'framer-motion';
import {
  atomUserChartDatas,
  atomUserInfo,
  IUserChatDatas,
} from '../atom/user.atom';
import { API_DRAW } from '../api/draw.api';
import { DDUCKDDACK_AXIOS } from '../App';
import { dduckddackResponseVO } from '../type/api';

const ChatPage = () => {
  // 기본코인을 비트코인으로 설정
  useSetDefaultCoin();
  // 차트를 사용하기 위한 설정들
  useCoinChart();

  // 선택된 코인이 변경되면 이미지들을 불러옴.
  const userInfo = useRecoilValue(atomUserInfo);
  const selectCoins = useRecoilValue(atomSelectCoinDefault);
  const setUserImageData = useSetRecoilState(atomUserChartDatas);
  const getDrawImage = async (id: number, coinName: string) => {
    try {
      const result = await DDUCKDDACK_AXIOS.post<
        dduckddackResponseVO<IUserChatDatas[]>
      >(`${API_DRAW.GET_IMAGE}`, {
        userId: id,
        coin: coinName,
      });
      if (result.data.status === 'ok') {
        const data = result.data.message;
        setUserImageData(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // 코인 변경에 따른 이미지를 불러오는 기능
  useEffect(() => {
    if (userInfo.userInfo && selectCoins.coinSymbol) {
      userInfo.userInfo?.id &&
        getDrawImage(userInfo.userInfo.id, selectCoins.coinSymbol);
    }
  }, [userInfo, selectCoins]);

  /**
   * 훅스로 리팩토링할 것
   */
  const coins = useRecoilValue(atomUseCoins);
  const setDefaultCoins = useSetRecoilState(atomSelectCoinDefault);
  const [displayCoins, setDisplayCoins] = useState<TypeDrawTicker[]>();
  const [value, setValue] = useState<TypeDrawTicker>();
  useLayoutEffect(() => {
    const ALLOW_ALL_COINS = false;
    if (ALLOW_ALL_COINS) {
      setDisplayCoins(coins);
      setValue(coins[0]);
    } else {
      const result = coins.filter((item) => {
        return (
          item.coinSymbol === 'ETH' ||
          item.coinSymbol === 'BTC' ||
          item.coinSymbol === 'XRP'
        );
      });
      setDisplayCoins(result);
      setValue(result[0]);
    }
  }, [coins]);

  const filterOption = createFilterOptions({
    matchFrom: 'any',
    stringify: (option: TypeDrawTicker) => option.consonant!,
    // trim: true,
  });

  return (
    <div
      className={classNames(`w-full h-full grid  col-span-12`)}
      style={{
        gridTemplateRows: 'auto auto',
      }}
    >
      {/* 코인검색, 헤드라인 */}
      <motion.div className={classNames(`grid grid-cols-12`)}>
        <div
          className={classNames(
            `xl:col-start-1 xl:col-end-13`,
            `2xl:col-start-1 2xl:col-span-full`,
            `w-full h-full grid grid-cols-12`
          )}
        >
          <div
            className={classNames(
              `col-start-1 col-end-3 p-5`,
              `flex justify-center items-center`
            )}
          >
            {value && (
              <Autocomplete
                id="coin-comboBox"
                defaultValue={value}
                options={displayCoins || []}
                sx={{ width: '100%' }}
                filterOptions={filterOption}
                getOptionLabel={(e) => {
                  return e.coinName!;
                }}
                onChange={(e, v) => {
                  if (v === undefined || v === null) {
                    displayCoins && setValue(displayCoins[0]);
                    return;
                  }
                  setDefaultCoins({
                    coinType: v?.coinType!,
                    coinSymbol: v?.coinSymbol!,
                    marketSymbol: 'KRW',
                    siseCrncCd: v?.siseCrncCd!,
                    coinName: v?.coinName!,
                  });
                }}
                isOptionEqualToValue={(e, v) => {
                  return e.coinName === v.coinName;
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    color="info"
                    variant="standard"
                    sx={{
                      'width': '100%',
                      'color': '#FF9900',
                      'input': {
                        border: 0,
                        color: '#FF9900',
                      },
                      'label': {
                        color: 'white',
                      },

                      'border': 0,
                      'borderColor': 'transparent',

                      '& .MuiAutocomplete-clearIndicator': {
                        visibility: 'hidden',
                        display: ' none',
                      },
                    }}
                  />
                )}
              />
            )}
          </div>

          <div className={classNames(`col-start-3 col-end-13 p-5`)}>
            <MainWrapper
              className={classNames(
                `w-full h-full`,
                `flex justify-center  items-center`
              )}
              style={{
                borderRadius: '4rem',
              }}
            >
              <NewsHeadLine />
              {/* 뉴스헤드라인 */}
            </MainWrapper>
          </div>
        </div>
      </motion.div>

      {/* 본문 */}
      <div className={classNames(`grid grid-cols-12 gap-5`)}>
        {/*  좌측 코인/차트 정보*/}
        <motion.div
          transition={{
            delay: 0.2,
            x: { type: 'spring', stiffness: 200 },
            default: { duration: 1 },
          }}
          initial={{
            scale: 0,
            opacity: 0,
            translateY: '-100%',
          }}
          animate={{
            scale: 1,
            opacity: 1,
            translateY: 0,
          }}
          className={classNames(
            // `p-5`,
            `xl:col-start-1 xl:col-end-8`,
            `2xl:col-start-1 2xl:col-end-9`
          )}
        >
          <div
            className={classNames(`w-full h-full grid  gap-y-5 `)}
            style={{
              gridTemplateRows: '15% auto',
            }}
          >
            <CoinBarForChat />
            <TvDrawingChart />
          </div>
        </motion.div>

        {/* 채팅방 */}
        <motion.div
          transition={{
            delay: 0.2,
            x: { type: 'spring', stiffness: 200 },
            default: { duration: 1 },
          }}
          initial={{
            scale: 0,
            opacity: 0,
            translateY: '-100%',
          }}
          animate={{
            scale: 1,
            opacity: 1,
            translateY: 0,
          }}
          className={classNames(
            `xl:col-start-8 xl:col-end-13`,
            `2xl:col-start-9 2xl:col-end-13`
          )}
        >
          <ChatRoom />
        </motion.div>
      </div>
    </div>
  );
};

export default ChatPage;
