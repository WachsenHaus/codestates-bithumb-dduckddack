import { useEffect, useState } from 'react';

// useEffect(() => {
//     const canvas = canvasRef.current;
//     if (tradingViewRef.current && canvas) {
//       const tvCanvas = tradingViewRef.current.querySelector('canvas');
//       if (tvCanvas) {
//         canvas.width = tvCanvas?.clientWidth;
//         canvas.height = tvCanvas.clientHeight;
//       }
//     }

//     if (canvas) {
//       const context = canvas.getContext('2d');

//       if (context) {
//         context.strokeStyle = 'black';
//         context.lineWidth = 1;

//         // contextRef.current = context;

//         setCtx(context);
//       }
//     }
//   }, [canvasRef]);
const useGetContext = (
  target: React.MutableRefObject<HTMLCanvasElement | null>
) => {
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    if (target) {
      const canvas = target.current;
      if (canvas) {
        const context = canvas.getContext('2d');
        if (context) {
          context.strokeStyle = 'black';
          context.lineWidth = 1;
          setCtx(context);
        }
      }
    }
  }, [target]);

  return ctx;
};

export default useGetContext;
