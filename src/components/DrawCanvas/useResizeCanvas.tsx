import { useCallback, useEffect, useState } from 'react';

/**
 * 리사이징되면 도화지도 리사이징 해줌.
 */
//    useEffect(() => {
//     canvasWrapperRef.current?.addEventListener('resize', () => {
//       if (ctx && tradingViewRef.current) {
//         if (tradingViewRef.current) {
//           const tvCanvas = tradingViewRef.current.querySelector('canvas');
//           if (tvCanvas) {
//             ctx.canvas.width = tvCanvas?.clientWidth;
//             ctx.canvas.height = tvCanvas.clientHeight;
//           }
//         }
//       }
//     });
//   }, []);
const useResizeCanvas = (
  wrapper: React.MutableRefObject<HTMLDivElement | null>,
  // target: CanvasRenderingContext2D | null,
  baseTarget: React.MutableRefObject<HTMLDivElement | null>
) => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const onResize = useCallback(() => {
    if (baseTarget.current) {
      if (baseTarget.current) {
        const tvCanvas = baseTarget.current.querySelector('canvas');
        if (tvCanvas) {
          setWidth(tvCanvas.clientWidth);
          setHeight(tvCanvas.clientHeight);
          // target.canvas.width = tvCanvas.clientWidth;
          // target.canvas.height = tvCanvas.clientHeight;
        }
      }
    }
  }, [baseTarget]);

  useEffect(() => {
    if (wrapper.current) {
      // 정확한 트레이딩뷰의 캔버스를 캐치해올수없는 상황... 편법으로 구현함..
      setTimeout(() => {
        if (baseTarget.current) {
          const tvCanvas = baseTarget.current.querySelectorAll('canvas')[1];
          if (tvCanvas) {
            setWidth(tvCanvas.clientWidth);
            setHeight(tvCanvas.clientHeight);
            // target.canvas.width = tvCanvas.clientWidth;
            // target.canvas.height = tvCanvas.clientHeight;
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
