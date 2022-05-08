import { useCallback, useEffect } from 'react';

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
  target: CanvasRenderingContext2D | null,
  baseTarget: React.MutableRefObject<HTMLDivElement | null>
) => {
  const onResize = useCallback(() => {
    if (target && baseTarget.current) {
      if (baseTarget.current) {
        const tvCanvas = baseTarget.current.querySelector('canvas');
        if (tvCanvas) {
          target.canvas.width = tvCanvas.clientWidth;
          target.canvas.height = tvCanvas.clientHeight;
        }
      }
    }
  }, [target, baseTarget]);

  useEffect(() => {
    if (wrapper.current && target) {
      // 정확한 트레이딩뷰의 캔버스를 캐치해올수없는 상황... 편법으로 구현함..
      setTimeout(() => {
        if (baseTarget.current && target) {
          const tvCanvas = baseTarget.current.querySelectorAll('canvas')[1];
          if (tvCanvas) {
            target.canvas.width = tvCanvas.clientWidth;
            target.canvas.height = tvCanvas.clientHeight;
          }
        }
      }, 200);
      window.addEventListener('resize', onResize);
    }
    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, [wrapper, baseTarget, target, onResize]);
};

export default useResizeCanvas;
