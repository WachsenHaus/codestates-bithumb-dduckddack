import { Box } from '@mui/material';
import React from 'react';
import CoinBar from '../components/CoinBar/CoinBar';
import MainContent from '../components/MainContent';
import Orderbook from '../components/Orderbook/Orderbook';
import Ticker from '../components/Ticker/Ticker';
import Transaction from '../components/Transaction/Transaction';
import useChangeWebTitle from '../hooks/useChangeWebTitle';
import useInitialize from '../hooks/useInitialize';
import useResetObserverDrawData from '../hooks/useResetDrawData';
import { useGenerateBitThumbSocket } from '../hooks/useWebSocket';

const TradePage = () => {
  useInitialize();
  // 3.웹소켓을 실행시킴 웹소켓은 트랜잭션,티커,차트봉에 대한 정보를 받아온다.
  useGenerateBitThumbSocket('SUBSCRIBE');
  // 4.선택된 코인에 대한 정보가 바뀌면 그리는 데이터들을 초기화하는 옵저버.
  useResetObserverDrawData();
  // 5.선택된 코인에 따라 가격정보가 해당 웹타이틀에 표시되는 훅스
  useChangeWebTitle();

  return (
    <>
      <Box gridColumn={`span 7`}>
        <CoinBar />
        <MainContent />
        <Ticker />
      </Box>

      <Box gridColumn={`span 5`}>
        <Orderbook />
        <Transaction />
      </Box>
    </>
  );
};

export default TradePage;
