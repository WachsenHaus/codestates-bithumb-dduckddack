import classNames from 'classnames';
import React, { useEffect } from 'react';
import Marquee from 'react-fast-marquee';
import { useRecoilValueLoadable, useSetRecoilState } from 'recoil';
import { atomNewsConfig, selectorNews } from '../../atom/news.atom';
import NewsHeaderLineRow from './NewsHeaderLineRow';

const NewsHeadLine = () => {
  const news = useRecoilValueLoadable(selectorNews);

  return (
    <>
      <div className="w-full">
        <Marquee gradient={false}>
          {news.state === 'loading' && <div>로딩중</div>}
          {news.state === 'hasValue' &&
            news.contents?.message?.data.map((item) => (
              <NewsHeaderLineRow {...item} />
            ))}
        </Marquee>
      </div>
    </>
  );
};

export default React.memo(NewsHeadLine);
