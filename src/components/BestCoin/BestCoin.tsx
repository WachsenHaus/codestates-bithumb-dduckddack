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
import { useRecoilValue } from 'recoil';
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
      className={classNames(
        `grid grid-cols-5`,
        `grid-cols-[20% auto 20% 10% 10%]`,
        `text-highRight`
      )}
    >
      {children}
    </div>
  );
};

export const BestCoinRowChart = ({ data }: { data?: any[] }) => {
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
          `text-bithumb`
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
  const coins = useRecoilValue(atomPriceInfoUseCoins);
  const [data, setData] = useState<any[]>([]);
  useEffect(() => {
    getData();
  }, [coins]);

  const getData = async () => {
    const r = _.sortBy(coins, (item) => Number(item.u24))
      .reverse()
      .slice(0, 5);
    let result: any = [];
    r.forEach((item) => {
      result.push(
        new Promise((resolve, reject) => {
          const res = axios.get(
            `https://pub2.bithumb.com/public/candlesticknew/${item.coinType}_C0100/1M`
          );
          res.then((_) => resolve(_.data.data.map((item: any) => item[2])));
          res.catch((err) => reject(err));
        })
      );
    });
    Promise.all(result).then((values) => {
      setData(values);
    });
  };

  return (
    <div className={classNames(`${className}`)}>
      <MainWrapper
        className={classNames(`w-full h-full `, `grid grid-rows-[10%_auto]`)}
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
            `grid grid-cols-1 grid-rows-[10%_auto_auto_auto_auto]`,
            `content-evenly`
          )}
        >
          <BestCoinRow>
            <BestCoinTitle />
          </BestCoinRow>
          {_.sortBy(coins, (item) => Number(item.u24))
            .reverse()
            .slice(0, 5)
            .map((item, index) => {
              return (
                <BestCoinRow>
                  <BestCoinRowChart data={data[index]} />
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
    </div>
  );
};

export default BestCoin;
