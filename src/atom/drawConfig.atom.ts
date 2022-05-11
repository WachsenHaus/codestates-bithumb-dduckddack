import { atom } from 'recoil';

interface IDrawSetConfig {
  penStroke: number;
  eraseStroke: number;
  penColor: string;
}

export const atomDrawConfig = atom<IDrawSetConfig>({
  key: 'atomDrawConfig',
  default: {
    penStroke: 18,
    eraseStroke: 18,
    penColor: '#F6B93B',
  },
});
