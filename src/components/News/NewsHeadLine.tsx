import classNames from 'classnames';
import React, { useEffect } from 'react';
import Marquee from 'react-fast-marquee';
import { useRecoilValueLoadable, useSetRecoilState } from 'recoil';
import { atomNewsConfig, selectorNews } from '../../atom/news.atom';
import NewsHeaderLineRow from './NewsHeaderLineRow';

const NewsHeadLine = () => {
  const setNewsConfig = useSetRecoilState(atomNewsConfig);
  const news = useRecoilValueLoadable(selectorNews);
  useEffect(() => {
    setNewsConfig({
      keyword: '',
      page: 1,
      size: 5,
    });
  }, []);

  return (
    <>
      <div className="w-full">
        <Marquee gradient={false}>
          {news.state === 'loading' && <div>로딩중</div>}
          {news.state === 'hasValue' &&
            news.contents?.map((item) => <NewsHeaderLineRow {...item} />)}
        </Marquee>
      </div>
    </>
  );
};

export default NewsHeadLine;
