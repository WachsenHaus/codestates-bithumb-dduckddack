import { atom } from 'recoil';
import { TypeCoinKind } from './coinList.type';

export interface ISelectCoinDefault {
  coinType: string;
  coinSymbol: string;
  coinName?: string;
  marketSymbol: string;
  siseCrncCd: TypeCoinKind;
}

export const DEFAULT_SELECT_COIN_DEFAULT: ISelectCoinDefault = {
  coinType: '',
  coinSymbol: '',
  coinName: '',
  marketSymbol: '',
  siseCrncCd: 'C0100',
};

export const atomSelectCoinDefault = atom<ISelectCoinDefault>({
  key: 'atomSelectCoinDefault',
  default: DEFAULT_SELECT_COIN_DEFAULT,
});
