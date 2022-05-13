import React, { useEffect, useState } from 'react';
import {
  Autocomplete,
  Box,
  createFilterOptions,
  TextField,
} from '@mui/material';
import {
  selector,
  useRecoilState,
  useRecoilValue,
  useRecoilValueLoadable,
  useSetRecoilState,
} from 'recoil';
import { useCoinChart } from '../hooks/useInitialize';
import { atomUseCoins } from '../atom/total.atom';
import { TypeDrawTicker } from '../atom/drawData.atom';
import { atomSelectCoinDefault } from '../atom/selectCoinDefault.atom';
import TvDrawingChart from '../components/TvChart/TvDrawingChart';
import classNames from 'classnames';
import ChatRoom from '../components/Chat/ChatRoom';
import CoinBarForChat from '../components/CoinBar/CoinBarForChat';
import MainWrapper from '../components/Common/MainWrapper';
import DrawTool from '../components/DrawTool/DrawTool';

const ChatPage = () => {
  const coins = useRecoilValue(atomUseCoins);
  const [defaultCoin, setDefaultCoins] = useRecoilState(atomSelectCoinDefault);
  const [displayCoins, setDisplayCoins] = useState<TypeDrawTicker[]>();

  useCoinChart();

  useEffect(() => {
    const result = coins.filter((item) => {
      return (
        item.coinSymbol === 'ETH' ||
        item.coinSymbol === 'BTC' ||
        item.coinSymbol === 'XRP'
      );
    });
    setDisplayCoins(result);
  }, [coins]);

  useEffect(() => {
    setDefaultCoins({
      coinType: 'C0101',
      coinSymbol: 'BTC',
      marketSymbol: 'KRW',
      siseCrncCd: 'C0100',
      coinName: '비트코인',
    });
    return () => {
      // setDefaultCoins([]);
    };
  }, []);
  const filterOption = createFilterOptions({
    matchFrom: 'start',
    stringify: (option: TypeDrawTicker) => option.consonant!,
  });

  return (
    <div
      className={classNames(`w-full h-full grid  col-span-12`)}
      style={{
        gridTemplateRows: 'auto auto',
      }}
    >
      <div className={classNames(`grid grid-cols-12`)}>
        {/* 코인검색, 헤드라인 */}
        <div className={classNames(`col-start-1 col-end-3 p-5`)}>
          <Autocomplete
            disablePortal
            id="coin-comboBOx"
            options={displayCoins || []}
            sx={{ width: '100%' }}
            filterOptions={filterOption}
            getOptionLabel={(e) => {
              return e.coinName!;
            }}
            onChange={(e, v) => {
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
                variant="standard"
                sx={{
                  width: '100%',
                  color: '#FF9900',
                  input: {
                    border: 0,
                    color: '#FF9900',
                  },
                  border: 0,
                  borderColor: 'transparent',
                }}
                label={defaultCoin.coinName}
              />
            )}
          />
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
            뉴스헤드라인
          </MainWrapper>
        </div>
      </div>

      {/* 본문 */}
      <div className={classNames(`grid grid-cols-12 gap-2`)}>
        {/*  좌측 코인/차트 정보*/}
        <div
          className={classNames(
            `p-5`,
            `xl:col-start-1 xl:col-end-13`,
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

            {/* <div className={classNames(`text-white`)}>
              여기가 그림판 도구가 들어간다..
            </div> */}
            <TvDrawingChart />
          </div>
        </div>

        {/* 채팅방 */}
        <div
          className={classNames(
            `p-5`,
            `xl:col-start-1 xl:col-end-13`,
            `2xl:col-start-9 2xl:col-end-13`
          )}
        >
          <ChatRoom />
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
