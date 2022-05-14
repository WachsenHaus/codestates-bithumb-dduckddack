import classNames from 'classnames';
import React, { useEffect, useState } from 'react';

const NewsForCoinHotListRow = ({
  coinName,
  r,
  a,
  index,
}: {
  coinName?: string;
  r?: string;
  a?: string;
  index: number;
}) => {
  const [isUp, setIsUp] = useState<boolean>(false);
  useEffect(() => {
    if (a?.includes('-')) {
      setIsUp(false);
    } else {
      setIsUp(true);
    }
  }, [a]);

  return (
    <li className={classNames(`flex items-center justify-between px-5`)}>
      <div
        className={classNames(`text-upBox`, `flex justify-center items-center`)}
      >
        {index + 1}
        <div className={classNames(`text-bithumb ml-5`)}>{coinName}</div>
      </div>
      <div
        className={classNames(
          `${isUp ? 'text-upRed' : ''}`,
          `${isUp === false ? `text-downBlue` : ``}`
        )}
      >
        {Number(r).toFixed(2)}%
      </div>
      {/* 인덱스 */}
      {/* 이름 */}
      {/* 변동률 */}
    </li>
  );
};

export default NewsForCoinHotListRow;
