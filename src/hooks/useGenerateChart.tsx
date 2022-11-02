import { ISeriesApi, IChartApi, createChart } from 'lightweight-charts';
import { useCallback, useEffect, useRef } from 'react';
import { convertStringPriceToKRW } from '../utils/utils';

const useGenerateChart = () => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const candleChart = useRef<ISeriesApi<'Candlestick'> | null>();
  const chartRef = useRef<IChartApi | null | undefined>();
  const onResize =
    (
      chart: React.MutableRefObject<IChartApi | null | undefined>,
      ref: React.MutableRefObject<HTMLDivElement | null>
    ) =>
    () => {
      chart.current &&
        ref.current &&
        chart.current.resize(
          ref?.current?.clientWidth,
          ref?.current?.clientHeight,
          true
        );
    };

  useEffect(() => {
    if (chartRef.current) {
      onResize(chartRef, wrapperRef)();
    }
  }, [chartRef.current]);
  useEffect(() => {
    if (wrapperRef.current) {
      chartRef.current = createChart(wrapperRef.current, {
        height: 350,

        crosshair: {
          mode: 0,
        },

        layout: {
          background: {
            color: '#353232',
            bottomColor: '#FAD390',
          },
          textColor: '#FAD390',
        },
        grid: {
          horzLines: {
            color: 'rgba(197, 203, 206, 0.2)',
          },
          vertLines: {
            color: 'rgba(197, 203, 206, 0.2)',
          },
        },
        timeScale: {
          borderColor: 'rgba(197, 203, 206, 0.8)',
        },
      });
      chartRef.current.applyOptions({
        timeScale: {
          timeVisible: true,
        },
      });

      candleChart.current = chartRef.current.addCandlestickSeries();
      candleChart.current.applyOptions({
        priceFormat: {
          type: 'custom',
          formatter: (f: any) => {
            return convertStringPriceToKRW(f);
          },
        },

        upColor: `#eb2f06`,
        borderUpColor: `#eb2f06`,
        downColor: `#b8e994`,
        borderDownColor: `#b8e994`,
        wickColor: `#4b3232`,
        wickUpColor: `#ffffff`,
        wickDownColor: `#d400ff`,
        priceLineColor: '#f8c291',
      });
    }
    return () => {
      wrapperRef.current = null;
    };
  }, [wrapperRef]);

  return [wrapperRef, candleChart, chartRef] as const;
};

export default useGenerateChart;
