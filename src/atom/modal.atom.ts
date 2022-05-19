import { atom } from 'recoil';
import { ICoinChart, iStBar } from './tvChart.atom';

export type TypeChartImg = {
  src: string;
  data: iStBar[];
};
export interface IModalState {
  modalType: 'sign' | 'image' | 'chartImage';
  modalState: boolean;
  modalPayload?: string | TypeChartImg;
}

export const atomModalState = atom<IModalState>({
  key: 'atomModalState',
  default: {
    modalType: 'sign',
    modalState: false,
  },
});
