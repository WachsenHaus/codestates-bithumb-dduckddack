import classNames from 'classnames';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import {
  convertStringPriceToKRW,
  convertStringPriceWON,
  convertStringToVolume24,
} from '../../utils/utils';
import CoinRate from './CoinRate';
import useGetCoinBar from '../../hooks/useGetCoinBar';
import MainWrapper from '../Common/MainWrapper';
import _ from 'lodash';
import axios from 'axios';
import { useRecoilValue } from 'recoil';
import { atomPriceInfoUseCoins } from '../../atom/total.atom';
import { BestCoinRowChart } from '../BestCoin/BestCoin';
import { atomSelectCoinDefault } from '../../atom/selectCoinDefault.atom';

const CoinColumn = React.memo(({ children }: { children: React.ReactNode }) => (
  <div className={`flex flex-col justify-center items-center`}>{children}</div>
));

const CoinBar = () => {
  const { e, v24, u24, h, l, f, r, coinSymbol } = useGetCoinBar();
  const selectCoin = useRecoilValue(atomSelectCoinDefault);

  const coins = useRecoilValue(atomPriceInfoUseCoins);
  const [data, setData] = useState<any[]>([]);
  const [flag, setFlag] = useState(false);
  useEffect(() => {
    if (coins.length > 0 && flag === false) {
      setFlag(true);
    }
  }, [coins]);
  useEffect(() => {
    if (flag) {
      getData();
    }
  }, [selectCoin.coinSymbol, flag]);

  const getData = async () => {
    const r = _.filter(
      coins,
      (item) => item.coinSymbol === selectCoin.coinSymbol
    );
    let result: any = [];
    r.forEach((item) => {
      result.push(
        new Promise((resolve, reject) => {
          const res = axios.get(
            `https://pub2.bithumb.com/public/candlesticknew/${item.coinType}_C0100/1M`
          );
          res.then((_) => resolve(_.data.data.map((item: any) => item[2])));
          res.catch((err) => reject(err));
        })
      );
    });
    Promise.all(result).then((values) => {
      setData(values);
    });
  };

  return (
    <MainWrapper
      className={classNames(
        `w-full h-24`,
        `mt-4`,
        `flex justify-around items-center text-white`
      )}
      style={{
        borderRadius: '4rem',
      }}
    >
      <div className="font-bmjua">{coinSymbol}</div>
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
      <CoinColumn>
        <div className={classNames(`w-32 h-full`)}>
          <BestCoinRowChart data={data[0]} />
        </div>
        {/* <h1 className="font-bmjua">차트</h1> */}
        {/* <span>{convertStringPriceToKRW(f)}</span> */}
      </CoinColumn>
    </MainWrapper>

    // </AnimatePresence>
  );
};

export default React.memo(CoinBar);
