import { Box } from '@mui/material';
import classNames from 'classnames';
import { motion } from 'framer-motion';
import React from 'react';

import CoinBar from '../components/CoinBar/CoinBar';
import MainContent from '../components/MainContent';
import Orderbook from '../components/Orderbook/Orderbook';
import Ticker from '../components/Ticker/Ticker';
import Transaction from '../components/Transaction/Transaction';
import useChangeWebTitle from '../hooks/useChangeWebTitle';
import { useInitialize } from '../hooks/useInitialize';
import useResetObserverDrawData from '../hooks/useResetDrawData';
import { useGenerateSocket } from '../hooks/useWebSocket';

const TradePage = () => {
  useInitialize();
  // 3.웹소켓을 실행시킴 웹소켓은 트랜잭션,티커,차트봉에 대한 정보를 받아온다.
  // useGenerateSocket('SUBSCRIBE');
  // 4.선택된 코인에 대한 정보가 바뀌면 그리는 데이터들을 초기화하는 옵저버.
  useResetObserverDrawData();
  // 5.선택된 코인에 따라 가격정보가 해당 웹타이틀에 표시되는 훅스
  useChangeWebTitle();

  return (
    <div className={classNames(`w-full h-full grid grid-cols-12 gap-4`)}>
      <motion.div
        transition={{
          delay: 0.2,
          x: { type: 'spring', stiffness: 200 },
          default: { duration: 0.3 },
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
        className={classNames(`col-start-3 col-span-8`)}
      >
        <CoinBar />
      </motion.div>
      <motion.div
        transition={{
          delay: 0.5,
          x: { type: 'spring', stiffness: 100 },
          default: { duration: 0.3 },
        }}
        initial={{
          scale: 0,
          opacity: 0,
          translateX: '-100%',
        }}
        animate={{
          scale: 1,
          opacity: 1,
          translateX: 0,
        }}
        className={classNames(`col-start-3 col-span-4`)}
      >
        <MainContent />
      </motion.div>
      <motion.div
        transition={{
          delay: 0.5,
          x: { type: 'spring', stiffness: 100 },
          default: { duration: 0.3 },
        }}
        initial={{
          scale: 0,
          opacity: 0,
          translateX: '100%',
        }}
        animate={{
          scale: 1,
          opacity: 1,
          translateX: 0,
        }}
        className={classNames(`col-start-7 col-span-4`)}
      >
        <Ticker />
      </motion.div>
      <motion.div
        transition={{
          delay: 0.8,
          x: { type: 'spring', stiffness: 100 },
          default: { duration: 0.3 },
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
        className={classNames(`col-start-3 col-span-4`)}
      >
        <Orderbook />
      </motion.div>
      <motion.div
        transition={{
          delay: 0.8,
          x: { type: 'spring', stiffness: 100 },
          default: { duration: 0.3 },
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
        className={classNames(`col-start-7 col-span-4`)}
      >
        <Transaction />
      </motion.div>
    </div>
  );
};

export default TradePage;
