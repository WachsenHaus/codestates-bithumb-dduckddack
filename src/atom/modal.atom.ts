import { atom } from 'recoil';

interface IModalState {
  modalType: 'sign' | 'image';
  modalState: boolean;
  modalPayload?: string;
}

export const atomModalState = atom<IModalState>({
  key: 'atomModalState',
  default: {
    modalType: 'sign',
    modalState: false,
  },
});
