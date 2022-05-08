import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';
import DrawModeToggle from './DrawModeToggle';
import useGetContext from './useGetContext';
import useResizeCanvas from './useResizeCanvas';

const DrawCanvas = ({
  tradingViewRef,
  pause,
  setPause,
}: {
  tradingViewRef: React.MutableRefObject<HTMLDivElement | null>;
  pause: boolean;
  setPause: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  /**
   * 리사이징,,
   */

  //   useEffect(() => {
  //     if (canvasWrapperRef.current) {
  //       window.addEventListener('resize', () => {
  //         console.log(';;;;');
  //         // onResize();
  //       });
  //     }
  //   }, [canvasWrapperRef]);

  return <></>;
};

export default DrawCanvas;
