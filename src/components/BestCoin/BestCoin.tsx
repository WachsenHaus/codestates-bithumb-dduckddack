import classNames from 'classnames';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import _ from 'lodash';
import { ReactNode, useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { atomPriceInfoUseCoins } from '../../atom/total.atom';
import {
  convertStringPriceToKRW,
  convertStringPriceWON,
} from '../../utils/utils';
import MainWrapper from '../Common/MainWrapper';
import axios from 'axios';
import BestCoinTitle from './BestCoinTitle';
import { SvgIcon } from '@mui/material';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import { atomSelectCoinDefault } from '../../atom/selectCoinDefault.atom';
import useSetDefaultCoin from '../../hooks/useSetDefaultCoin';
import useGetTopChart from './useGetTopChart';
import { motion } from 'framer-motion';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const BestCoinRow = ({ children }: { children?: ReactNode }) => {
  return (
    <div
      className={classNames(`grid grid-cols-5`, `text-highRight`)}
      style={{
        gridTemplateColumns: '20% auto 20% 10% 30%',
      }}
    >
      {children}
    </div>
  );
};

export const BestCoinRowChart = ({
  data,
  className,
}: {
  data?: any[];
  className?: string;
}) => {
  const generateLabel = Array.from({ length: 1500 }, (undefined, i) => i);
  const chartData = {
    // width: '50px',
    responsive: true,
    labels: generateLabel,
    datasets: [
      {
        label: 'coin',
        data: data,
        fill: true,
        borderColor: '#e58e26',
        backgroundColor: 'rgba(249, 249, 22, 1)',
        borderWidth: 1,
        lineTension: 1,
      },
    ],
  };

  return (
    <>
      <div
        className={classNames(
          `flex justify-center items-center`,
          `text-bithumb`,
          className
        )}
      >
        <Line
          data={chartData}
          options={{
            scales: {
              x: {
                grid: {
                  display: false,
                  drawOnChartArea: false,
                },

                ticks: {
                  display: false,
                },
              },
              y: {
                grid: {
                  display: false,
                  drawOnChartArea: false,
                },
                ticks: {
                  display: false,
                },
              },
            },
            plugins: {
              legend: {
                display: false,
              },
              tooltip: {
                enabled: false,
              },
            },
            elements: {
              point: {
                radius: 0,
              },
            },

            responsive: true,
          }}
        />
      </div>
    </>
  );
};

const BestCoinRowName = ({
  coinSymbol,
  coinName,
}: {
  coinSymbol?: string;
  coinName?: string;
}) => {
  return (
    <div
      className={classNames(
        `flex justify-center items-start`,
        `flex-col`,
        `ml-5`
      )}
    >
      <div className={classNames(`text-white font-bmjua text-lg`)}>
        {coinSymbol}
      </div>
      <div className={classNames(`text-white font-bmjua text-xs`)}>
        {coinName}
      </div>
    </div>
  );
};

const BestCoinRowPrice = ({ children }: { children?: ReactNode }) => {
  return (
    <div
      className={classNames(
        `flex justify-center items-center`,
        `text-xs`,
        `text-bithumb`
      )}
    >
      {children}
    </div>
  );
};

const BestCoinRowchgR = ({ value }: { value?: string }) => {
  const [isUp, setIsUp] = useState<boolean | undefined>(undefined);
  useEffect(() => {
    if (value?.includes('-')) {
      setIsUp(false);
    } else {
      setIsUp(true);
    }
  }, [value]);
  let price = Number(value).toLocaleString('ko-kr');
  if (isUp) {
    price = `+${price}`;
  }

  return (
    <div
      className={classNames(
        `flex justify-center items-center`,
        `text-xs`,
        `${isUp ? `text-upRed` : ``}`,
        `${isUp === false ? `text-downBlue` : ``}`
      )}
    >
      {value}%
    </div>
  );
};

const BestCoinRowVolume = ({ children }: { children?: ReactNode }) => {
  return (
    <div
      className={classNames(
        `flex justify-center items-center`,
        `text-xs`,
        `text-bithumb`
        // `text-sm`
      )}
    >
      {children}
    </div>
  );
};

const BestCoin = ({ className }: { className?: string }) => {
  // const coins = useRecoilValue(atomPriceInfoUseCoins);

  useSetDefaultCoin();
  const [drawData, chartData] = useGetTopChart('u24');

  return (
    <motion.div
      transition={{
        delay: 0.2,
        x: { type: 'spring', stiffness: 100 },
        default: { duration: 1 },
      }}
      initial={{
        scale: 0,
        opacity: 0,
        translateX: '-100%',
      }}
      animate={{
        scale: 1,
        opacity: 1,
        translateX: 0,
      }}
      className={classNames(`${className}`)}
    >
      <MainWrapper
        className={classNames(`w-full h-full grid `)}
        style={{
          gridTemplateRows: '10% auto',
        }}
      >
        <div
          className={classNames(
            `w-full h-full text-center font-bold font-bmjua text-white`,

            `flex justify-center items-center`
          )}
        >
          <WhatshotIcon
            sx={{
              color: '#FF9900',
            }}
          />
          거래대금 Top 5
        </div>
        <div
          className={classNames(
            `h-full`,
            `max-h-full`,
            `w-full`,
            `grid grid-cols-1 `,
            `content-evenly`
          )}
          style={{
            gridTemplateRows: '10% auto auto auto auto',
          }}
        >
          <BestCoinRow>
            <BestCoinTitle />
          </BestCoinRow>
          {drawData &&
            drawData.map((item, index) => {
              return (
                <BestCoinRow>
                  <BestCoinRowChart data={chartData[index]} />
                  <BestCoinRowName
                    coinName={item.coinName}
                    coinSymbol={item.coinSymbol}
                  />
                  <BestCoinRowPrice>
                    {convertStringPriceToKRW(item.e)}
                  </BestCoinRowPrice>
                  <BestCoinRowchgR value={item.r} />
                  <BestCoinRowVolume>
                    {convertStringPriceWON(item.u24)}
                  </BestCoinRowVolume>
                </BestCoinRow>
              );
            })}
        </div>
      </MainWrapper>
    </motion.div>
  );
};

export default BestCoin;
