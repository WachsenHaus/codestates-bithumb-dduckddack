import { useEffect, useState } from 'react';

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
