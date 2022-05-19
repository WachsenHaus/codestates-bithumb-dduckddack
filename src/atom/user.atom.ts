import { atom } from 'recoil';

export interface IUserChatDatas {
  image: string;
  userId: string;
  time: string;
  coin: string;
}
export const atomUserChartDatas = atom<IUserChatDatas[]>({
  key: 'atomUserChartImg',
  default: [],
});

export const atomUserName = atom<string>({
  key: 'atomUserName',
  default: '홍길동',
});

export type TypeUserInfoDetail = {
  email?: string;
  id?: number;
  nickName?: string;
  imagePath?: string;
};

export type TypeUserInfo = {
  userInfo?: TypeUserInfoDetail;
};

export type TypeUserToken = {
  accessToken?: string;
  refreshToken?: string;
};

export type TypeUser = TypeUserInfo & TypeUserToken;

export const atomUserInfo = atom<TypeUser>({
  key: 'atomUserInfo',
  default: {},
});

export type TypeLoginResponse = {
  status: 'ok' | 'error' | '0000';
  message: string;
  accessToken: string;
  refreshToken: string;
  userInfo?: TypeUserInfoDetail;
};
