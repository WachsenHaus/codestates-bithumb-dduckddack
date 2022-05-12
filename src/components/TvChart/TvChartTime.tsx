import classNames from 'classnames';
import React, { useCallback } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import {
  atomSelectChartSetup,
  ISelectChartSetup,
} from '../../atom/selectChart.atom';
import TvListItem from './TvListItem';

const TvChartTime = () => {
  const [selectChartSetup, setSelectChartSetup] =
    useRecoilState(atomSelectChartSetup);

  const onClick = useCallback(
    (time: ISelectChartSetup) => () => {
      setSelectChartSetup({ chartTime: time.chartTime });
    },
    []
  );

  return (
    <ul
      className={classNames(
        `w-1/12 h-full mx-3`,
        `flex flex-col justify-center items-center`,
        `text-white`
      )}
    >
      <TvListItem
        className={selectChartSetup.chartTime === '1M' ? 'border-blue-400' : ''}
        onClick={onClick({ chartTime: '1M' })}
      >
        1M
      </TvListItem>
      <TvListItem
        className={
          selectChartSetup.chartTime === '10M' ? 'border-blue-400' : ''
        }
        onClick={onClick({ chartTime: '10M' })}
      >
        10M
      </TvListItem>
      <TvListItem
        className={
          selectChartSetup.chartTime === '30M' ? 'border-blue-400' : ''
        }
        onClick={onClick({ chartTime: '30M' })}
      >
        30M
      </TvListItem>
      <TvListItem
        className={selectChartSetup.chartTime === '1H' ? 'border-blue-400' : ''}
        onClick={onClick({ chartTime: '1H' })}
      >
        1H
      </TvListItem>
    </ul>
  );
};

export default React.memo(TvChartTime);
