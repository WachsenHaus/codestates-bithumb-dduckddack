export interface ResponseVO<T> {
  status: number;
  code: string;
  message: string;
  data: T;
}

export interface dduckddackResponseVO<T> {
  status: 'ok' | 'error';
  message: T;
}
