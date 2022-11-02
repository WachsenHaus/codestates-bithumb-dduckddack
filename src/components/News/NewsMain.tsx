import classNames from 'classnames';
import React, { useEffect, useRef, useState } from 'react';
import { useRecoilState, useRecoilValue, useRecoilValueLoadable } from 'recoil';
import ReactPaginate from 'react-paginate';
import { atomNewsConfig, selectorNews, TypeNews } from '../../atom/news.atom';
import { NewsCard, LoadingNewsCard } from './NewsCard';
import NewsFilter from './NewsFilter';

import useKeywordDeboune from './useKeywordDeboune';
import { Pagination } from '@mui/material';
import LottieDiv from '../Common/LottieDiv';
import NoDataJSON from '../../asset/img/nodata.json';
import ErrorJSON from '../../asset/img/error.json';

const NewsMain = () => {
  const [keyword, onChange] = useKeywordDeboune();
  const [newsConfig, setNewsConfig] = useRecoilState(atomNewsConfig);
  const news = useRecoilValueLoadable(selectorNews);
  const [totalPages, setTotalPages] = useState(0);
  // const [totalElements, setTotalElements] = useState(0);

  useEffect(() => {
    if (news.state === 'hasValue') {
      if (news.contents?.message) {
        setTotalPages(news.contents?.message.totalPages);
      }
    }
  }, [news]);

  useEffect(() => {
    if (newsConfig.keyword === keyword) {
      return;
    }
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

      {/* 로딩중 */}
      {news.state === 'loading' && (
        <div
          className={classNames(
            `grid grid-cols-2 gap-5`,
            `max-h-full`,
            ` h-5/6`
          )}
        >
          {Array.from({ length: newsConfig.size }, (undefined, i) => i).map(
            (item) => (
              <LoadingNewsCard />
            )
          )}
        </div>
      )}

      {/* 자료를 성공적으로 가져왔을 때 */}
      {news.state === 'hasValue' &&
        news.contents &&
        news.contents.message.data.length > 0 && (
          <>
            <div className={classNames(`grid grid-cols-2 gap-5`, `max-h-full`)}>
              {news.contents.message.data.map((item) => (
                <NewsCard {...item} />
              ))}
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
                page={newsConfig.page + 1}
                onChange={(e, page) => {
                  setNewsConfig((prevData) => {
                    return {
                      ...prevData,
                      page: page - 1,
                    };
                  });
                }}
              />
            </div>
          </>
        )}
      {/* 자료를 가져왔지만 데이터를 찾지못한경우 */}
      {news.state === 'hasValue' &&
        news.contents &&
        news.contents.message.data.length === 0 && (
          <div className={classNames(`w-full h-full`)}>
            <LottieDiv jsonData={NoDataJSON} loop />
          </div>
        )}

      {/* 알 수 없는 에러 */}
      {news.state === 'hasError' && (
        <div className={classNames(`w-full h-full`)}>
          <LottieDiv jsonData={ErrorJSON} loop />
        </div>
      )}
    </div>
  );
};

export default NewsMain;
