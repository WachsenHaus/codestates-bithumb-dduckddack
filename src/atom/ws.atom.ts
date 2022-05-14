import { atom, selector } from 'recoil';
import { atomSelectCoinDefault } from './selectCoinDefault.atom';

export const atomSubscribeWebSocket = atom<WebSocket | undefined>({
  key: 'atomSubscribeWebSocket',
  default: undefined,
});

export const atomSubscribeWebSocektMessage = selector({
  key: 'atomSubscribeWebSocektMessage',
  get: ({ get }) => {
    const selectCoin = get(atomSelectCoinDefault);
    const ws = get(atomSubscribeWebSocket);
    if (ws && selectCoin.siseCrncCd && selectCoin.coinType) {
      const filter = [selectCoin.siseCrncCd, selectCoin.coinType];
      const result = {
        events: [
          {
            type: 'tr',
            filters: filter,
          },
          {
            type: 'tk',
            filters: ['MID'],
          },
          {
            type: 'st',
            filters: filter,
          },
        ],
        type: 'SUBSCRIBE',
      };
      return result;
    } else {
      return undefined;
    }
  },
  cachePolicy_UNSTABLE: {
    eviction: 'most-recent',
  },
});
