import React, { useEffect } from 'react';
import {
  Autocomplete,
  Box,
  createFilterOptions,
  TextField,
} from '@mui/material';
import {
  useRecoilValue,
  useRecoilValueLoadable,
  useSetRecoilState,
} from 'recoil';
import { useCoinChart } from '../hooks/useInitialize';
import CoinBar from '../components/CoinBar/CoinBar';
import { atomUseCoins } from '../atom/total.atom';
import { TypeDrawTicker } from '../atom/drawData.atom';
import TvChart from '../components/TvChart/TvChart';
import { atomSelectCoinDefault } from '../atom/selectCoinDefault.atom';
import TvDrawingChart from '../components/TvChart/TvDrawingChart';
import { useGenerateSocket } from '../hooks/useWebSocket';
import classNames from 'classnames';
import ChatRoom from '../components/Chat/ChatRoom';

const ChatPage = () => {
  const coins = useRecoilValue(atomUseCoins);
  const setDefaultCoins = useSetRecoilState(atomSelectCoinDefault);
  useGenerateSocket('CHAT');
  useCoinChart();
  useGenerateSocket('SUBSCRIBE');

  useEffect(() => {
    setDefaultCoins({
      coinType: 'C0101',
      coinSymbol: 'BTC',
      marketSymbol: 'KRW',
      siseCrncCd: 'C0100',
      coinName: '비트코인',
    });
  }, []);
  const filterOption = createFilterOptions({
    matchFrom: 'start',
    stringify: (option: TypeDrawTicker) => option.consonant!,
  });

  return (
    <div
      className={classNames(
        `grid grid-rows-[7%_auto] w-full h-full col-span-12`
      )}
    >
      <div className={classNames(`grid grid-cols-12`)}>
        <div className={classNames(`col-start-1 col-end-2`)}>검색</div>
        <div className={classNames(`col-start-2 col-end-12`)}>뉴스헤드라인</div>
      </div>
      <div className={classNames(`grid grid-cols-12`)}>
        <div className={classNames(`col-start-1 col-end-9`)}>
          <Autocomplete
            disablePortal
            id="coin-comboBOx"
            options={coins}
            sx={{ width: 300 }}
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
            renderInput={(params) => <TextField {...params} label="비트코인" />}
          />
          <CoinBar />
          <TvDrawingChart />
        </div>
        <div className={classNames(`col-start-9 col-end-12`)}>
          <ChatRoom />
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
