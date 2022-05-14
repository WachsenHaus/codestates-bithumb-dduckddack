import { ISeriesApi, IChartApi, createChart } from 'lightweight-charts';
import { useCallback, useEffect, useRef } from 'react';
import { convertStringPriceToKRW } from '../utils/utils';

const useGenerateChart = () => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const candleChart = useRef<ISeriesApi<'Candlestick'> | null>();
  const chartRef = useRef<IChartApi | null | undefined>();

  // const onResize = useCallback(
  //   (
  //       chart: React.MutableRefObject<IChartApi | null | undefined>,
  //       ref: React.MutableRefObject<HTMLDivElement | null>
  //     ) =>
  //     () => {
  //       console.log('차트 리사이징');
  //       console.log(ref?.current?.offsetWidth);
  //       console.log(ref?.current?.offsetHeight);
  //       chart.current &&
  //         ref.current &&
  //         chart.current.resize(
  //           ref?.current?.offsetWidth,
  //           ref?.current?.offsetHeight
  //         );
  //     },
  //   []
  // );

  const onResize =
    (
      chart: React.MutableRefObject<IChartApi | null | undefined>,
      ref: React.MutableRefObject<HTMLDivElement | null>
    ) =>
    () => {
      console.log('차트 리사이징');
      // console.log(ref?.current?.clientWidth);
      console.log(ref?.current);
      console.log(ref?.current?.getBoundingClientRect().width);
      console.log(ref?.current?.scrollWidth);
      console.log(ref?.current?.clientWidth);
      console.log(ref?.current?.offsetWidth);
      console.log(ref?.current?.getBoundingClientRect().height);
      console.log(ref?.current?.scrollHeight);
      // console.log(ref?.current?.clientHeight);
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
      console.log('생성');
      onResize(chartRef, wrapperRef)();
    }
  }, [chartRef.current]);
  useEffect(() => {
    if (wrapperRef.current) {
      chartRef.current = createChart(wrapperRef.current, {
        // height: wrapperRef.current.getBoundingClientRect().height,
        // width: wrapperRef.current.getBoundingClientRect().width,
        height: 350,
        // width: 600,
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
      // wrapperRef.current.addEventListener(
      //   'resize',
      //   onResize(chartRef, wrapperRef)
      // );
      // window.addEventListener('resize', onResize(chartRef, wrapperRef));
      // wrapperRef.current.addEventListener(
      //   'load',
      //   onResize(chartRef, wrapperRef)
      // );
      // wrapperRef.current.addEventListener(
      //   'load',
      //   onResize(chartRef, wrapperRef)
      // );

      candleChart.current = chartRef.current.addCandlestickSeries();
      candleChart.current.applyOptions({
        priceFormat: {
          type: 'custom',
          formatter: (f: any) => {
            return convertStringPriceToKRW(f);
          },
        },
        // priceLineVisible: false,
        upColor: `#eb2f06`,
        borderUpColor: `#eb2f06`,
        downColor: `#b8e994`,
        borderDownColor: `#b8e994`,
        wickColor: `#4b3232`,
        wickUpColor: `#ffffff`,
        wickDownColor: `#d400ff`,
        priceLineColor: '#f8c291',
        // borderColor: 'green',
        // baseLineColor: '#f8c291',
      });
      // setTimeout(() => {
      //   onResize(chartRef, wrapperRef);
      // }, 1000);
    }
    return () => {
      wrapperRef.current = null;
    };
  }, [wrapperRef]);

  return [wrapperRef, candleChart, chartRef] as const;
};

export default useGenerateChart;
