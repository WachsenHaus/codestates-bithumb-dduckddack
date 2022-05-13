import { Box } from '@mui/material';
import classNames from 'classnames';
import React, { useEffect, useRef } from 'react';
import styles from '../../components/animation.module.css';
import { convertStringPriceToKRW } from '../../utils/utils';

const OrderbookRow = ({
  price,
  r,
  orderType,
  eventType,
  quantity,
  quantityRatio,
  index,
}: // ref,
{
  price: string;
  r?: string;
  orderType: 'ask' | 'bid';
  eventType: 'ask' | 'bid' | undefined;
  quantity: string;
  quantityRatio: string;
  index?: any;
}) => {
  // console.log(quantityRatio);
  // const scrollRef = useRef<HTMLDivElement>(null);
  // useEffect(() => {
  //   if (scrollRef && index === 0) {
  //     scrollRef?.current?.scrollIntoView({
  //       behavior: 'smooth',
  //       block: 'center',
  //       inline: 'nearest',
  //     });
  //   }
  // }, [index]);
  return (
    <div
      className={classNames(`flex justify-around items-center w-full`)}
      // ref={scrollRef}
    >
      <div
        className={classNames(
          `w-1/2`,
          `flex  justify-around`,
          `${orderType === 'ask' ? 'bg-blue-700' : 'bg-red-700'}`,
          `${orderType === 'ask' ? 'text-blue-400' : 'text-red-400'}`,
          `bg-opacity-5`
        )}
      >
        <span
          className={classNames(
            // `will-change-transform`,
            `text-left`,
            `${
              eventType === 'ask'
                ? `shadow-inner shadow-blue-900 ${styles.askEffect}`
                : ''
            }`,
            `${
              eventType === 'bid'
                ? `shadow-inner shadow-red-900 ${styles.bidEffect}`
                : ''
            }`
          )}
        >
          {convertStringPriceToKRW(price)}
        </span>
        <span>{r}%</span>
      </div>
      <div
        className={classNames(
          `w-1/2`,
          `flex justify-start relative text-bithumbYellow `
        )}
      >
        <p className={classNames(`z-50`)}> {Number(quantity).toFixed(4)}</p>

        <div
          className={classNames(
            `absolute left-0 z-0`,
            `h-full`,
            `${orderType === 'ask' ? 'bg-downBox' : 'bg-upBox'}`
            // `bg-cop`
          )}
          style={{
            width: `${quantityRatio}%`,
          }}
        />
      </div>
    </div>
  );
};

export default React.memo(OrderbookRow);
