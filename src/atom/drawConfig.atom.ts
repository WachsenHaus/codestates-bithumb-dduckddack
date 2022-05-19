import { atom } from 'recoil';

interface IDrawSetConfig {
  penStroke: number;
  eraseStroke: number;
  penColor: string;
}

export const atomDrawConfig = atom<IDrawSetConfig>({
  key: 'atomDrawConfig',
  default: {
    penStroke: 10,
    eraseStroke: 20,
    penColor: '#F6B93B',
  },
});

export const atomDrawStatus = atom({
  key: 'atomDrawStatus',
  default: false,
});
