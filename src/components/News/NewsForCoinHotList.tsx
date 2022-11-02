import classNames from 'classnames';
import _ from 'lodash';
import React, { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { atomSelectCoinDefault } from '../../atom/selectCoinDefault.atom';
import {
  atomFilteredCoins,
  atomPriceInfoUseCoins,
} from '../../atom/total.atom';
import useSetDefaultCoin from '../../hooks/useSetDefaultCoin';
import MainWrapper from '../Common/MainWrapper';
import NewsForCoinHotListRow from './NewsForCoinHotListRow';

const NewsForCoinHotList = () => {
  useSetDefaultCoin();

  const coins = useRecoilValue(atomPriceInfoUseCoins);

  return (
    <div className={classNames(`h-full w-full`)}>
      <ul
        className={classNames(
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
