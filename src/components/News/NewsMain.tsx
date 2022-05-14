import classNames from 'classnames';
import React, { useEffect, useRef } from 'react';
import { useRecoilState, useRecoilValue, useRecoilValueLoadable } from 'recoil';
import { atomNewsConfig, selectorNews } from '../../atom/news.atom';
import NewsCard from './NewsCard';
import NewsFilter from './NewsFilter';

import useKeywordDeboune from './useKeywordDeboune';

const NewsMain = () => {
  const [keyword, onChange] = useKeywordDeboune();
  const [newsConfig, setNewsConfig] = useRecoilState(atomNewsConfig);
  const news = useRecoilValueLoadable(selectorNews);

  useEffect(() => {
    setNewsConfig((prevData) => {
      return {
        ...prevData,
        keyword: keyword,
      };
    });
  }, [keyword]);

  return (
    <div>
      <NewsFilter onChange={onChange} />

      <div className={classNames(`grid grid-cols-2 gap-5`)}>
        {news.state === 'loading' && <div>로딩중</div>}
        {news.state === 'hasValue' &&
          //   news.contents?.data?.map((item) => <NewsCard {...item} />)}
          news.contents?.map((item) => <NewsCard {...item} />)}
        {/* {news?.map((item) => {
          return 
        })} */}
      </div>
    </div>
  );
};

export default NewsMain;
