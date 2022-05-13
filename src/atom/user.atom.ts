import { atom } from 'recoil';

export interface IUserChatDatas {
  date?: string;
  chartData: any;
  chartImg: string;
}
export const atomUserChartDatas = atom<IUserChatDatas[]>({
  key: 'atomUserChartImg',
  default: [],
});

export const atomUserName = atom<string>({
  key: 'atomUserName',
  default: '홍길동',
});
