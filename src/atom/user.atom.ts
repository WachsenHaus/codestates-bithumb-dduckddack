import { atom } from 'recoil';

export const atomUserName = atom<string>({
  key: 'atomUserName',
  default: '홍길동',
});
