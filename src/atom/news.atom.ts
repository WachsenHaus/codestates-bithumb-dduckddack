import { API_NEWS } from './../api/news.api';
import { ResponseVO, dduckddackResponseVO } from './../type/api';
import axios from 'axios';
import { atom, selector } from 'recoil';

export type TypeNews = {
  id: string;
  createdAt: string;
  editor: string;
  imgUrl: string;
  summary: string;
  title: string;
  url: string;
};

export type TypeReturnNews = {
  totalElements: number;
  totalPages: number;
  data: TypeNews[];
};

const atomForceGetNews = atom<number | undefined>({
  key: 'atomForceGetNews',
  default: undefined,
});

interface iNewsConfig {
  keyword: string;
  size: number;
  page: number;
  totalElements?: number;
  totlaPages?: number;
}
export const atomNewsConfig = atom<iNewsConfig>({
  key: 'atomNewsConfig',
  default: {
    keyword: '',
    size: 6,
    page: 1,
  },
});
export const atomNewsData = atom<TypeNews[]>({
  key: 'atomNewsData',
  default: [],
});

export const selectorNews = selector({
  key: 'selectorNews',
  get: async ({ get }) => {
    try {
      get(atomForceGetNews);
      const config = get(atomNewsConfig);
      //   const result = await axios.get<dduckddackResponseVO<TypeReturnNews>>(/
      const result = await axios.get<TypeNews[]>(API_NEWS.NEWS, {
        params: {
          page: config.page,
          size: config.size,
          keyword: config.keyword,
        },
      });
      console.log(result.data);
      return result.data;
    } catch (err) {
    } finally {
    }
  },
});
