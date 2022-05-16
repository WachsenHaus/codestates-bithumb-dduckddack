import axios from 'axios';
import _ from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
// import { TypeDrawTicker } from '../../atom/drawData.atom';
import { atomSelectCoinDefault } from '../../atom/selectCoinDefault.atom';
import { atomPriceInfoUseCoins } from '../../atom/total.atom';

/**
 *
 * @returns 거래대금 or 현재가 상위 n개의 미니 차트데이터 를 가져옵니다.
 */
const useGetMiniChart = () => {
  const selectCoin = useRecoilValue(atomSelectCoinDefault);
  const coins = useRecoilValue(atomPriceInfoUseCoins);
  const [data, setData] = useState<any>();

  useEffect(() => {
    getData();
  }, [coins]);

  const getData = useCallback(() => {
    const r = _.find(
      coins,
      (item) => item.coinSymbol === selectCoin.coinSymbol
    );
    if (r) {
      const result = new Promise((resolve, reject) => {
        const res = axios.get(
          `https://pub2.bithumb.com/public/candlesticknew/${r.coinType}_C0100/1M`
        );
        res.then((_) => resolve(_.data.data.map((item: any) => item[2])));
        res.catch((err) => reject(err));
      });
      result.then((item) => setData(item));
    }
  }, [selectCoin, coins]);
  return data;
};

export default useGetMiniChart;
