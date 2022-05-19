import axios from 'axios';
import classNames from 'classnames';
import React from 'react';
import useGetCoinBar from '../../hooks/useGetCoinBar';
import {
  convertStringPriceToKRW,
  convertStringToVolume24,
  convertStringPriceWON,
} from '../../utils/utils';
import { BestCoinRowChart } from '../BestCoin/BestCoin';
import MainWrapper from '../Common/MainWrapper';
import CoinRate from './CoinRate';
import useGetMiniChart from './useGetMiniChart';

const CoinColumn = React.memo(({ children }: { children: React.ReactNode }) => (
  <div className={`flex flex-col justify-around items-center h-full `}>
    {children}
  </div>
));

const Header = React.memo(({ children }: { children: React.ReactNode }) => {
  return (
    <h1
      className={classNames(
        `font-bmjua text-bithumbGray`,
        `2xl:text-base`,
        `xl:text-xs`
      )}
    >
      {children}
    </h1>
  );
});

const Content = React.memo(({ children }: { children: React.ReactNode }) => {
  return (
    <span
      className={classNames(
        `text-bithumbYellow`,
        `2xl:text-base`,
        `xl:text-xss`
      )}
    >
      {children}
    </span>
  );
});

const CoinBarForChat = () => {
  const { e, v24, u24, h, l, f, r, coinSymbol, coinName } = useGetCoinBar();
  const data = useGetMiniChart();

  return (
    <MainWrapper
      className={classNames(
        `w-full h-full`,
        `flex justify-around items-center`
      )}
      style={{
        borderRadius: '4rem',
      }}
    >
      <div
        className={classNames(
          `font-bmjua text-highRight`,
          `2xl:text-base`,
          `xl:text-sm`
        )}
      >
        {coinName}
      </div>
      <div
        className={classNames(
          `text-bithumbYellow flex flex-col justify-center items-end`,
          `relative`
        )}
      >
        <div className={classNames(`2xl:text-xl`, `xl:text-sm`)}>
          {convertStringPriceToKRW(e)}
        </div>
        <CoinRate rate={r} />
      </div>

      <CoinColumn>
        <Header>거래량(24H)</Header>
        <Content>
          {convertStringToVolume24(v24)} {coinSymbol}
        </Content>
      </CoinColumn>
      <CoinColumn>
        <Header>거래금액(24H)</Header>
        <Content>{convertStringPriceWON(u24, '억')}</Content>
      </CoinColumn>
      <CoinColumn>
        <Header>고가(당일)</Header>
        <Content>{convertStringPriceToKRW(h)}</Content>
      </CoinColumn>
      <CoinColumn>
        <Header>저가(당일)</Header>
        <Content>{convertStringPriceToKRW(l)}</Content>
      </CoinColumn>
      <CoinColumn>
        <Header>전일종가</Header>
        <Content>{convertStringPriceToKRW(f)}</Content>
      </CoinColumn>
      <CoinColumn>
        <div
          className={classNames(
            `h-full flex items-center justify-center`,
            `2xl:w-32`,
            `xl:w-24`
          )}
        >
          <BestCoinRowChart
            data={data}
            className={classNames(`2xl:w-32`, `xl:w-24`)}
          />
        </div>
      </CoinColumn>
    </MainWrapper>
  );
};

export default CoinBarForChat;
