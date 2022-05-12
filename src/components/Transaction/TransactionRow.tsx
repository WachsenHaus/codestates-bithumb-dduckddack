import classNames from 'classnames';
import moment from 'moment';
import React from 'react';
import { convertStringPriceToKRW } from '../../utils/utils';

const TransactionRow = ({
  time,
  price,
  contQty,
  buySellGb,
  coinSymbol,
}: {
  time: string;
  price: string;
  contQty: string;
  buySellGb: string;
  coinSymbol: string;
}) => {
  return (
    <div
      style={{
        display: 'grid',
        height: '30px',
        gridTemplateColumns: '30% 40% 30%',
      }}
    >
      <div className="flex justify-center items-center text-bithumbYellow">
        {moment(time).format('HH:mm:ss')}
      </div>
      <div className="flex justify-center items-center text-bithumbYellow">
        {convertStringPriceToKRW(price)}
      </div>
      <div
        className={classNames(
          `${buySellGb === '2' ? 'text-upRed' : 'text-downBlue'}`
        )}
      >
        <div className="relative">
          <span className="absolute right-5">
            {Number(contQty).toFixed(4)} {coinSymbol}
          </span>
        </div>
      </div>
    </div>
  );
};

export default React.memo(TransactionRow);
