import classNames from 'classnames';
import _ from 'lodash';
import React, { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { atomSelectCoinDefault } from '../../atom/selectCoinDefault.atom';
import {
  atomFilteredCoins,
  atomPriceInfoUseCoins,
} from '../../atom/total.atom';
import MainWrapper from '../Common/MainWrapper';
import NewsForCoinHotListRow from './NewsForCoinHotListRow';

const NewsForCoinHotList = () => {
  /**
   * 초기값이 없으면 priceinfousecoin등 값을가져오지 않기떄문에 news페이지로 들어오면 초기값을 강제로 설정함. mainpage도 동일한 로직임.
   */
  const setDefaultCoins = useSetRecoilState(atomSelectCoinDefault);
  useEffect(() => {
    setDefaultCoins({
      coinType: 'C0101',
      coinSymbol: 'BTC',
      marketSymbol: 'KRW',
      siseCrncCd: 'C0100',
      coinName: '비트코인',
    });
  }, []);
  const coins = useRecoilValue(atomPriceInfoUseCoins);

  return (
    <div className={classNames(`h-full w-full`)}>
      <ul
        className={classNames(
          //   `2xl:h-full xl:h-full`,
          `h-full`,
          `2xl:max-h-full xl:max-h-128`,
          `flex flex-col justify-between py-2`,
          `overflow-y-auto`
        )}
      >
        {_.sortBy(coins, (item) => Number(item.r))
          .reverse()
          .slice(0, 30)
          .map((item, index) => (
            <NewsForCoinHotListRow
              coinName={item.coinName}
              r={item.r}
              a={item.a}
              index={index}
            />
          ))}
      </ul>
    </div>
  );
};

export default NewsForCoinHotList;
