import { IChartApi } from 'lightweight-charts';
import { useCallback, useEffect, useState } from 'react';

const useResizeCanvas = (
  wrapper: React.MutableRefObject<HTMLDivElement | null>,
  baseTarget: React.MutableRefObject<HTMLDivElement | null>,
  chartRef: React.MutableRefObject<IChartApi | null | undefined>
) => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const onResize = useCallback(() => {
    if (baseTarget.current) {
      if (baseTarget.current) {
        const tvCanvas = baseTarget.current.querySelector('canvas');
        if (tvCanvas) {
          setWidth(tvCanvas.getBoundingClientRect().width);
          setHeight(tvCanvas.getBoundingClientRect().height);
        }
      }
    }
  }, [baseTarget]);

  useEffect(() => {
    if (wrapper.current) {
      setTimeout(() => {
        if (baseTarget.current) {
          const tvCanvas = baseTarget.current.querySelectorAll('canvas')[1];
          if (tvCanvas) {
            setWidth(tvCanvas.clientWidth);
            setHeight(tvCanvas.clientHeight);
          }
        }
      }, 200);
      window.addEventListener('resize', onResize);
    }
    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, [wrapper, baseTarget, onResize]);
  return [width, height] as const;
};

export default useResizeCanvas;
