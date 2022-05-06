import classNames from 'classnames';
import React, { useEffect, useRef, useState } from 'react';
import { useGetChartDatas } from '../../hooks/useGetChartDatas';
import useGenerateChart from '../../hooks/useGenerateChart';
import useParsingAndUpdateWebSocketChart from '../../hooks/useParsingAndUpdateWebSocketChart';
import { TimeRange, LogicalRange } from 'lightweight-charts';

const TvChart = () => {
  useGetChartDatas();
  const [wrapperRef, candleRef, chartRef] = useGenerateChart();
  const [pause, setPause] = useParsingAndUpdateWebSocketChart(candleRef);

  return (
    <>
      <div className={classNames(`w-full h-full`)} ref={wrapperRef} />
    </>
  );
};

export default React.memo(TvChart);
