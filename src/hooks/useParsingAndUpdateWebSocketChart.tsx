import {
  ISeriesApi,
  Logical,
  LogicalRange,
  UTCTimestamp,
} from 'lightweight-charts';
import _ from 'lodash';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useRecoilValue, useRecoilState, useRecoilValueLoadable } from 'recoil';
import { atomSelectChartSetup } from '../atom/selectChart.atom';
import {
  atomWsStBar,
  iStBar,
  atomDrawStBars,
  selectorDrawStBars,
} from '../atom/tvChart.atom';

const CONST_KR_UTC = 9 * 60 * 60 * 1000;

const useParsingAndUpdateWebSocketChart = (
  candleRef: React.MutableRefObject<
    ISeriesApi<'Candlestick'> | null | undefined
  >,
  recordRange?: LogicalRange | undefined,
  setRecordRange?: React.Dispatch<
    React.SetStateAction<LogicalRange | undefined>
  >
) => {
  // websocket stbar
  const [pause, setPause] = useState(false);
  const wsStBar = useRecoilValue(atomWsStBar);
  const [currentBar, setCurrentBar] = useState<iStBar | undefined>(undefined);
  const { chartTime } = useRecoilValue(atomSelectChartSetup);
  const [divideTime, setDivideTime] = useState(60);

  useEffect(() => {
    switch (chartTime) {
      case '1M':
        setDivideTime(60);
        break;
      case '10M':
        setDivideTime(600);
        break;
      case '30M':
        setDivideTime(1800);
        break;
      case '1H':
        setDivideTime(3600);
        break;

      default:
        break;
    }
  }, [chartTime]);

  // atom
  const [drawStBars, setDrawStBars] = useRecoilState(atomDrawStBars);
  const selectorDrawStbars = useRecoilValueLoadable(selectorDrawStBars);

  useEffect(() => {
    const { state, contents } = selectorDrawStbars;
    if (state === 'hasValue') {
      candleRef.current?.setData([]);
      contents && setDrawStBars(contents);
      setCurrentBar(undefined);
    } else if (state === 'hasError') {
      console.error(state);
    }
  }, [selectorDrawStbars, setDrawStBars]);

  /**
   * 웹소켓으로 들어오는 데이터는 updae
   */
  useEffect(() => {
    pause === false && currentBar && candleRef.current?.update(currentBar);
    // currentBar && candleRef.current?.update(currentBar);
  }, [currentBar]);

  /**
   * 주기적으로 변경하는 차트데이터는 set
   */
  useEffect(() => {
    // pause && drawStBars && candleRef.current?.setData(drawStBars);
    drawStBars && candleRef.current?.setData(drawStBars);

    /**
     * 한틱 쌓일때마다 차트를 뒤로 밀어서 동기화되게 하는 기능이긴함,,
     */
    if (recordRange) {
      // const prev  = JSON.parse(JSON.stringify(recordRange));
      const prev = recordRange;
      const from = Number(prev.from) - 1;
      const to = Number(prev.to) - 1;

      const nextFrom: Logical = from as Logical;
      const nextTo: Logical = to as Logical;
      const result = {
        from: nextFrom,
        to: nextTo,
      };
      if (setRecordRange) {
        console.log(result);
        setRecordRange(result);
      }
    }
  }, [drawStBars]);

  /**
   * websocket에서 들어온 데이터를 curretBar로 파싱해서 가져옴.
   */
  useEffect(() => {
    if (wsStBar) {
      const { o, t, e } = wsStBar;
      const currentTime = moment(t, 'YYYYMMDDHHmmss')
        .utc()
        .valueOf() as UTCTimestamp;
      const int = ((((currentTime + CONST_KR_UTC) / 1000 / divideTime) | 0) *
        divideTime) as UTCTimestamp;
      const nextTime = int;
      if (currentBar === undefined) {
        setCurrentBar({
          close: e,
          high: e,
          low: e,
          open: e,
          time: nextTime,
        });
      } else if (currentBar?.open !== null) {
        const cloneStBar = _.clone(currentBar);
        if (currentBar) {
          cloneStBar.close = e;
          cloneStBar.high = Math.max(
            Number(cloneStBar?.high),
            Number(e)
          ).toString();
          cloneStBar.low = Math.min(
            Number(cloneStBar?.low),
            Number(e)
          ).toString();
          cloneStBar.open = o;
        }
        setCurrentBar(cloneStBar);
      }
    }
  }, [wsStBar]);

  return [pause, setPause] as const;
};

export default useParsingAndUpdateWebSocketChart;
