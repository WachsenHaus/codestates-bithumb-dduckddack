import { Box, Typography } from '@mui/material';
import classNames from 'classnames';
import React, { useEffect } from 'react';
import { useRecoilValue, useRecoilValueLoadable } from 'recoil';
import { atomSelectCoinDefault } from '../../atom/selectCoinDefault.atom';
import { atomDrawTransaction } from '../../atom/total.atom';
import MainWrapper from '../Common/MainWrapper';

import TransactionRow from './TransactionRow';

/**
 *
 * @returns 실시간 체결내역 컴포넌트
 */
const Transaction = () => {
  const drawTransaction = useRecoilValueLoadable(atomDrawTransaction);
  const { coinSymbol, marketSymbol } = useRecoilValue(atomSelectCoinDefault);

  useEffect(() => {
    console.log(drawTransaction);
  }, [coinSymbol]);

  return (
    <MainWrapper
      className={classNames(`w-full h-full`, `grid grid-rows-[13%_auto] `)}
    >
      <div
        className={classNames(
          `py-4`,
          `drop-shadow-3xl`,
          `font-bmjua border-b-bithumbGray border-b-2`
        )}
      >
        <p className={classNames(`text-center`, `text-bithumb`)}>체결내역</p>
        <div
          className={classNames(
            `flex justify-around items-center`,
            `text-sm text-bithumbYellow`,
            `h-full`
          )}
        >
          <p>시간</p>
          <p>가격({marketSymbol})</p>
          <p>수량({coinSymbol})</p>
        </div>
      </div>
      <div className={classNames(`py-4`)}>
        <div
          className={classNames(
            `max-h-full h-[30rem]`,
            `w-full`,
            `scrollbar-hide overflow-y-auto`
          )}
        >
          {drawTransaction.state === 'hasValue'
            ? drawTransaction.contents
                .slice(0)
                .reverse()
                .map((item, index) => {
                  return (
                    <TransactionRow
                      coinSymbol={coinSymbol}
                      key={item.contDtm + index}
                      time={item.contDtm}
                      price={item.contPrice}
                      contQty={item.contQty}
                      buySellGb={item.buySellGb}
                    />
                  );
                })
            : ''}
        </div>
      </div>
    </MainWrapper>
  );
};

export default Transaction;
