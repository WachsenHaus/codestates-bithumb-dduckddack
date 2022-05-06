import { atom } from 'recoil';

interface IModalState {
  modalType: 'sign';
  modalState: boolean;
}

export const atomModalState = atom<IModalState>({
  key: 'atomModalState',
  default: {
    modalType: 'sign',
    modalState: false,
  },
});
