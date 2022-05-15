/* eslint-disable react/require-default-props */
import React, { useEffect, useRef, CSSProperties } from 'react';
import Lottie, { AnimationDirection } from 'lottie-web';

const LottieDiv = ({
  jsonData,
  onClick,
  reverse,
  delayPlay = false,
  loop = false,
  autoplay = true,
  style,
  position = 'static',
  className,
}: {
  jsonData: any;
  loop?: boolean;
  autoplay?: boolean;
  reverse?: boolean;
  delayPlay?: boolean;
  onClick?: () => void;
  style?: CSSProperties;
  position?: 'relative' | 'fixed' | 'static' | 'absolute';
  className?: string;
}) => {
  const mRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const lottie = Lottie.loadAnimation({
      container: mRef.current as HTMLDivElement,
      animationData: jsonData,
      renderer: 'svg',
      loop,
      autoplay,
    });

    // 리버스 기능
    if (reverse === true) {
      const reverseFunction = () => {
        let mDirection = -1 as AnimationDirection;
        return () => {
          mDirection = mDirection === -1 ? 1 : -1;
          lottie.setDirection(mDirection);
          lottie.play();
        };
      };
      lottie.addEventListener('complete', reverseFunction());
      if (onClick) {
        mRef.current?.addEventListener('click', onClick);
      }
    }

    if (delayPlay) {
      mRef.current?.addEventListener('click', () => {
        lottie.setSpeed(4);
        lottie.play();
      });

      if (onClick) {
        lottie.addEventListener('complete', onClick);
      }
    }
    return () => {
      lottie.stop();
      lottie.destroy();
    };
  }, [jsonData]);

  return <div style={{ position }} className={className} ref={mRef} />;
};

const MemoziedLottie = React.memo(LottieDiv);
export default MemoziedLottie;
