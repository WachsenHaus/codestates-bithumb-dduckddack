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

export type TypeUserInfo = {
  userInfo?: {
    email?: string;
    id?: number;
    nickName?: string;
  };
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
