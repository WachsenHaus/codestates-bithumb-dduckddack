import classNames from 'classnames';
import React, { useCallback } from 'react';
import { TypeNews } from '../../atom/news.atom';

const NewsHeaderLineRow = (props: TypeNews) => {
  const onClick = useCallback(
    (url: string) => () => {
      window.open(url);
    },
    []
  );
  return (
    <div className={classNames(`mx-10`)}>
      <p
        className={classNames(
          `hover:cursor-pointer`,
          `flex justify-center items-center`,
          `xl:text-xs`
        )}
        onClick={onClick(props.url)}
      >
        * {props.title}
      </p>
    </div>
  );
};

export default NewsHeaderLineRow;
