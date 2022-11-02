/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */
//

import _ from 'lodash';
import { TypeDrawTicker } from '../../atom/drawData.atom';

const workercode = () => {};

const order = (
  orderMode: 'e' | 'r' | 'u24',
  datas: TypeDrawTicker[],
  sortDirection: 'desc' | 'asc'
) => {
  if (orderMode === 'e') {
    return _.orderBy(datas, [(e) => Number(e.e)], [sortDirection]);
  } else if (orderMode === 'r') {
    return _.orderBy(datas, [(e) => Number(e.r)], [sortDirection]);
  } else {
    return _.orderBy(datas, [(e) => Number(e.u24)], [sortDirection]);
  }
};

self.onmessage = function (e) {
  const { data }: { data: any } = e;
  let resultUseCoins;

  if (data.filterMode === 'normal') {
    if (data.filterKeyword === '') {
      resultUseCoins = data.priceInfoUseCoins;
    } else {
      resultUseCoins = data.priceInfoUseCoins.filter(
        (i: any) =>
          i.consonant?.toLowerCase().indexOf(data.filterKeyword) !== -1
      );
    }
  } else {
    if (data.filterKeyword === '') {
      resultUseCoins = data.priceInfoUseCoins.filter(
        (i: any) => i.isFavorite === true
      );
    } else {
      resultUseCoins = data.priceInfoUseCoins.filter(
        (i: any) =>
          i.isFavorite === true &&
          i.consonant?.toLowerCase().indexOf(data.filterKeyword) !== -1
      );
    }
  }
  let result = order(data.filterOrder, resultUseCoins, data.filterDirection);

  self.postMessage(result);
};

export default workercode;
