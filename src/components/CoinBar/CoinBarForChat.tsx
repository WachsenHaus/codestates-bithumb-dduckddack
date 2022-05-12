import classNames from 'classnames';
import { motion } from 'framer-motion';
import React from 'react';
import useGetCoinBar from '../../hooks/useGetCoinBar';
import {
  convertStringPriceToKRW,
  convertStringToVolume24,
  convertStringPriceWON,
} from '../../utils/utils';
import MainWrapper from '../Common/MainWrapper';
import CoinRate from './CoinRate';

const CoinColumn = React.memo(({ children }: { children: React.ReactNode }) => (
  <div className={`flex flex-col justify-around items-center h-full `}>
    {children}
  </div>
));

const CoinBarForChat = () => {
  const { e, v24, u24, h, l, f, r, coinSymbol, coinName } = useGetCoinBar();
  return (
    <MainWrapper
      className={classNames(
        `w-full h-full`,
        `flex justify-around items-center`,
        `rounded-[4rem]`
      )}
    >
      <div className="font-bmjua text-highRight">{coinName}</div>
      <div
        className={classNames(
          `text-bithumbYellow flex flex-col justify-center items-end`,
          `relative`
        )}
      >
        <div className={classNames(`text-xl`)}>
          {convertStringPriceToKRW(e)}
        </div>
        <CoinRate rate={r} />
      </div>

      <CoinColumn>
        <h1 className="font-bmjua text-bithumbGray">거래량(24H)</h1>
        <span className={classNames(`text-bithumbYellow`)}>
          {convertStringToVolume24(v24)} {coinSymbol}
        </span>
      </CoinColumn>
      <CoinColumn>
        <h1 className="font-bmjua text-bithumbGray">거래금액(24H)</h1>
        <span className={classNames(`text-bithumbYellow`)}>
          {convertStringPriceWON(u24, '억')}
        </span>
      </CoinColumn>
      <CoinColumn>
        <h1 className="font-bmjua text-bithumbGray">고가(당일)</h1>
        <span className={classNames(`text-bithumbYellow`)}>
          {convertStringPriceToKRW(h)}
        </span>
      </CoinColumn>
      <CoinColumn>
        <h1 className="font-bmjua text-bithumbGray">저가(당일)</h1>
        <span className={classNames(`text-bithumbYellow`)}>
          {convertStringPriceToKRW(l)}
        </span>
      </CoinColumn>
      <CoinColumn>
        <h1 className="font-bmjua text-bithumbGray">전일종가</h1>
        <span className={classNames(`text-bithumbYellow`)}>
          {convertStringPriceToKRW(f)}
        </span>
      </CoinColumn>
    </MainWrapper>
  );
};

export default CoinBarForChat;
