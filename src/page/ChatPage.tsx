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
import { useGenerateBitThumbSocket } from '../hooks/useWebSocket';

const ChatPage = () => {
  const coins = useRecoilValue(atomUseCoins);
  const setDefaultCoins = useSetRecoilState(atomSelectCoinDefault);
  useCoinChart();
  useGenerateBitThumbSocket('SUBSCRIBE');

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
    <>
      <Box gridColumn={`span 6`}>
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
      </Box>
      <Box gridColumn={`span 6`}></Box>
    </>
  );
};

export default ChatPage;
