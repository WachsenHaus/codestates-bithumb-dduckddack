import axios, { CancelTokenSource } from 'axios';
import { atom, selector, selectorFamily } from 'recoil';
import { API_BITHUMB } from '../api/bt.api';
import { ResponseVO } from '../type/api';
import { atomSelectCoinDefault } from './selectCoinDefault.atom';

export type TypeOrderObj = {
  p: string; // 금액
  q: string; // 수량
};
export interface IOrderBookData {
  ask: Array<TypeOrderObj>;
  bid: Array<TypeOrderObj>;
  timestamp: string;
}

export const atomOrderBook = atom<IOrderBookData>({
  key: 'AtomOrderBook',
  default: {
    ask: [],
    bid: [],
    timestamp: '',
  },
});

export const atomForceGetOrderBook = atom<undefined | number>({
  key: 'atomForceGetOrderBook',
  default: undefined,
});

export const selectorGetOrderBook = selector({
  key: 'selectorGetOrderBook',
  get: async ({ get }) => {
    try {
      get(atomForceGetOrderBook);
      const { coinSymbol, marketSymbol } = get(atomSelectCoinDefault);
      if (coinSymbol === '' || marketSymbol === '') {
        return;
      }

      const time = 1;
      const url = `${coinSymbol}_${marketSymbol}/${time}`;
      const result = await axios.get<ResponseVO<IOrderBookData>>(`${API_BITHUMB.GET_ORDERBOOK}/${url}`);
      return result.data.data;
    } catch (err) {}
  },
  set: ({ set }) => set(atomForceGetOrderBook, Math.random()),
  cachePolicy_UNSTABLE: {
    eviction: 'most-recent',
  },
});
