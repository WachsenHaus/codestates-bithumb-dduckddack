import classNames from 'classnames';
import React, { useEffect, useRef, useState } from 'react';
import { useRecoilState, useRecoilValue, useRecoilValueLoadable } from 'recoil';
import ReactPaginate from 'react-paginate';
import { atomNewsConfig, selectorNews } from '../../atom/news.atom';
import { NewsCard, LoadingNewsCard } from './NewsCard';
import NewsFilter from './NewsFilter';

import useKeywordDeboune from './useKeywordDeboune';
import { Pagination } from '@mui/material';

const NewsMain = () => {
  const [keyword, onChange] = useKeywordDeboune();
  const [newsConfig, setNewsConfig] = useRecoilState(atomNewsConfig);
  const news = useRecoilValueLoadable(selectorNews);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  useEffect(() => {
    setNewsConfig({
      keyword: '',
      page: 1,
      size: 6,
    });
  }, []);

  useEffect(() => {
    if (news.state === 'hasValue') {
      if (news.contents?.message) {
        setTotalPages(news.contents?.message.totalPages);
        setTotalElements(news.contents?.message.totalElements);
      }
    }
  }, [news]);

  useEffect(() => {
    setNewsConfig((prevData) => {
      return {
        ...prevData,
        keyword: keyword,
      };
    });
  }, [keyword]);

  return (
    <div className={classNames(`h-full`)}>
      <NewsFilter onChange={onChange} />
      <div
        className={classNames(
          `grid grid-cols-2 gap-5`,
          `max-h-full`,
          news.state === 'loading' && ` h-5/6`
        )}
      >
        {news.state === 'loading' &&
          Array.from({ length: newsConfig.size }, (undefined, i) => i).map(
            (item) => <LoadingNewsCard />
          )}

        {news.state === 'hasValue' &&
          news.contents?.message?.data?.map((item) => <NewsCard {...item} />)}
      </div>

      <div>
        <Pagination
          sx={{
            ul: {
              display: 'felx',
              justifyContent: 'center',
            },
          }}
          count={Number(totalPages)}
          onChange={(e, page) => {
            setNewsConfig((prevData) => {
              return {
                ...prevData,
                page: page,
              };
            });
          }}
        />
      </div>
    </div>
  );
};

export default NewsMain;
