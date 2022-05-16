import axios from 'axios';
import _ from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { TypeDrawTicker } from '../../atom/drawData.atom';
import { atomPriceInfoUseCoins } from '../../atom/total.atom';

/**
 *
 * @returns 거래대금 or 현재가 상위 n개의 미니 차트데이터 를 가져옵니다.
 */
const useGetTopChart = (filterType: 'u24' | 'e', count = 5) => {
  const coins = useRecoilValue(atomPriceInfoUseCoins);
  const [chartData, setChartData] = useState<any[]>([]);
  const [drawData, setDrawData] = useState<TypeDrawTicker[]>([]);
  useEffect(() => {
    getData();
  }, [coins]);

  useEffect(() => {
    const result = _.sortBy(coins, (item) =>
      filterType === 'u24' ? Number(item.u24) : Number(item.e)
    )
      .reverse()
      .slice(0, 5);

    setDrawData(result);
  }, [coins]);

  const getData = useCallback(() => {
    const r = _.sortBy(coins, (item) =>
      filterType === 'u24' ? Number(item.u24) : Number(item.e)
    )
      .reverse()
      .slice(0, 5);
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
      setChartData(values);
    });
  }, [coins, filterType]);

  return [drawData, chartData] as const;
};

export default useGetTopChart;
