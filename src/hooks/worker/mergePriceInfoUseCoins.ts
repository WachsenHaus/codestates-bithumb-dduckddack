/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */
import _ from 'lodash';

self.onmessage = function (e) {
  const { data } = e;
  const ticker = data.tickerObj;
  const coinList = data.coins;
  const detail = data.detail;
  const defaultCoin = data.default;

  const isExist = _.findIndex(
    coinList,
    (item: any) =>
      item.coinType === ticker.c || item.coinType === defaultCoin.coinType
  );
  if (isExist === -1) {
    return;
  } else if (ticker.m === 'C0101') {
    return;
  } else {
    let isUp;
    const currentPrice = Number(ticker.e) || Number(detail.e);
    const prevPrice = Number(coinList[isExist].e);
    if (currentPrice > prevPrice) {
      isUp = true;
    } else if (currentPrice === prevPrice) {
      isUp = undefined;
    } else {
      isUp = false;
    }

    if (coinList[isExist].coinType === defaultCoin.coinType) {
      coinList[isExist] = {
        ...coinList[isExist],
        e: detail.e,
        r: detail.r,
        isUp,
      };
    }
    if (coinList[isExist].coinType === ticker.c) {
      coinList[isExist] = { ...coinList[isExist], ...ticker, isUp };
    }
    const result = {
      // detail: resultDetail,
      coinList: coinList,
    };
    self.postMessage(result);
  }
};
export {};
