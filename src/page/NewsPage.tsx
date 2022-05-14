import { Box } from '@mui/material';
import classNames from 'classnames';
import React, { useEffect, useRef } from 'react';
import MainWrapper from '../components/Common/MainWrapper';
import NewsForCoinHotList from '../components/News/NewsForCoinHotList';
import NewsMain from '../components/News/NewsMain';
import { useCoinList } from '../hooks/useInitialize';

const NewsPage = () => {
  useCoinList();
  return (
    <>
      <div
        className={classNames(
          `xl:py-20 2xl:py-10`,
          `h-full w-full`,
          `col-start-2 col-span-9`,
          `grid grid-cols-12 gap-x-5`
        )}
      >
        <MainWrapper className={classNames(`col-start-3 col-end-8`)}>
          <NewsMain />
        </MainWrapper>
        <MainWrapper className={classNames(`col-start-8 col-end-11`)}>
          <NewsForCoinHotList />
        </MainWrapper>
      </div>
    </>
  );
};

export default NewsPage;
