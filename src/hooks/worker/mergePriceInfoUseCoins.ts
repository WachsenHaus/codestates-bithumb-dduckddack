/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */
import _ from 'lodash';

self.onmessage = function (e) {
  const { data } = e;
  const ticker = data.tickerObj;
  const coinList = data.coins;
  const detail = data.detail;
  const defaultCoin = data.default;

  // console.log(item.coinType === ticker.c ,item.coinType === defaultCoin.coinType )
  const isExist = _.findIndex(
    coinList,
    (item: any) =>
      item.coinType === ticker.c || item.coinType === defaultCoin.coinType
  );
  // const isExist = coinList.findIndex();
  if (isExist === -1) {
    return;
  } else if (ticker.m === 'C0101') {
    return;
  } else {
    // coinList;
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
    // if (coinList[isExist].coinType === defaultCoin.coinType) {
    //   coinList[isExist] = {
    //     ...coinList[isExist],
    //     e: detail.e,
    //     r: detail.r,
    //     isUp,
    //   };
    //   console.log(coinList[isExist]);
    // } else if (coinList[isExist].coinType === ticker.c) {
    //   coinList[isExist] = { ...coinList[isExist], ...ticker, isUp };
    //   console.log(coinList[isExist]);
    // }

    // let resultDetail;
    if (coinList[isExist].coinType === defaultCoin.coinType) {
      coinList[isExist] = {
        ...coinList[isExist],
        e: detail.e,
        r: detail.r,
        isUp,
      };
      // resultDetail = coinList[isExist];
    }
    if (coinList[isExist].coinType === ticker.c) {
      coinList[isExist] = { ...coinList[isExist], ...ticker, isUp };
      // console.log(coinList[isExist]);
    }
    self.postMessage({
      // detail: resultDetail,
      coinList: coinList,
    });
  }
};
export {};
