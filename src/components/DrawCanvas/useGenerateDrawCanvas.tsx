import html2canvas from 'html2canvas';
import { IChartApi, LogicalRange } from 'lightweight-charts';
import _ from 'lodash';
import moment from 'moment';
import { useRef, useState } from 'react';
import { ReactSketchCanvasRef } from 'react-sketch-canvas';
import useGetContext from './useGetContext';
import useResizeCanvas from './useResizeCanvas';

const useGenerateDrawCanvas = (
  tvChartRef: React.MutableRefObject<HTMLDivElement | null>,
  pause: boolean,
  setPause: React.Dispatch<React.SetStateAction<boolean>>,
  chartRef: React.MutableRefObject<IChartApi | null | undefined>,
  setRecordRange: React.Dispatch<React.SetStateAction<LogicalRange | undefined>>
) => {
  const canvasRef = useRef<ReactSketchCanvasRef | null>(null);
  const canvasWrapperRef = useRef<HTMLDivElement | null>(null);
  const saveWrapperRef = useRef<HTMLDivElement | null>(null);

  // const ctx = useGetContext(canvasRef);

  // canvasRef.current.
  const [drawingMode, setDrawingMode] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);

  const [drawAxisDatas, setDrawAxisDatas] = useState<
    Array<{
      x: any;
      y: any;
      originX: any;
      originY: any;
    }>
  >([]);

  const [drawArr, setDrawArr] = useState<
    Array<{
      time: string;
      drawData: {
        x: any;
        y: any;
        originX: any;
        originY: any;
      };
      drawImageUrl: string;
    }>
  >([]);

  const [moveAxis, setMoveAxis] = useState<{
    x: any;
    y: any;
  }>({
    x: 0,
    y: 0,
  });

  const [width, height] = useResizeCanvas(canvasWrapperRef, tvChartRef);

  const onDrawToogleClick = () => {
    setDrawingMode(!drawingMode);
    setPause(!pause);
  };

  const onSave = async () => {
    // 이미지로 저장
    let imageUrl = '';

    const mTime = moment().format('YYYY-MM-DD HH:mm:ss');
    const timeTitle = document.createElement('h1');
    timeTitle.className =
      'font-bmjua flex justify-center items-center h-32 w-full';
    timeTitle.innerText = mTime;

    if (saveWrapperRef.current) {
      saveWrapperRef.current.prepend(timeTitle);
      saveWrapperRef.current.style.transform = 'translateX(-100%)';
      await html2canvas(saveWrapperRef.current)
        .then((canvas) => {
          if (saveWrapperRef.current) {
            console.log(canvas);
            imageUrl = canvas.toDataURL();

            console.log(imageUrl);
            saveWrapperRef.current.removeChild(timeTitle);
            saveWrapperRef.current.style.transform = 'translateX(0%)';
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }

    const prev = JSON.parse(JSON.stringify(drawAxisDatas));
    // 드로우 배열에 넣는다.
    const result = {
      time: mTime,
      drawData: prev,
      drawImageUrl: imageUrl,
    };
    const next = _.clone(drawArr);
    next.push(result);
    setDrawArr(next);
    setDrawAxisDatas([]);
    // 트레이딩뷰 좌표 기억
    if (chartRef.current) {
      const range = chartRef.current?.timeScale().getVisibleLogicalRange();
      if (range) {
        setRecordRange(range);
      }
    }

    // 드로잉한 그림 기억
    // if (canvasRef.current) {
    //   const ctx = canvasRef.current.getContext('2d');
    //   if (ctx) {
    //     ctx.clearRect(
    //       0,
    //       0,
    //       canvasRef.current.clientWidth,
    //       canvasRef.current.clientHeight
    //     );
    //   }
    //   setPause(false);
    //   setDrawingMode(false);
    // }
  };

  // const onNewCanvas = () => {
  //   if (ctx && canvasRef.current) {
  //     ctx.clearRect(0, 0, 99999, 99999);
  //   }
  // };

  const onSaveAs = (uri: any, filename: any) => {
    console.log('onSaveas');
    const link = document.createElement('a');
    document.body.appendChild(link);
    link.href = uri;
    link.download = filename;
    link.click();
    document.body.removeChild(link);
  };

  const onDrawing = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    // const { offsetX, offsetY } = e.nativeEvent;
    // if (ctx && canvasRef.current) {
    //   if (!isDrawing) {
    //     ctx.beginPath();
    //     ctx.moveTo(offsetX, offsetY);
    //     setMoveAxis({
    //       x: offsetX,
    //       y: offsetY,
    //     });
    //   } else {
    //     ctx.lineTo(offsetX, offsetY);
    //     const prevCopyDraw = JSON.parse(JSON.stringify(drawAxisDatas));
    //     prevCopyDraw.push({
    //       x: offsetX,
    //       y: offsetY,
    //       originX: moveAxis.x,
    //       originY: moveAxis.y,
    //     });
    //     setDrawAxisDatas(prevCopyDraw);
    //     ctx.stroke();
    //   }
    // }
  };

  const onMouseUp = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    setIsDrawing(false);
  };

  const onMouseDown = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    setIsDrawing(true);
  };

  const onMouseLeave = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    setIsDrawing(false);
  };

  return [
    canvasRef,
    canvasWrapperRef,
    saveWrapperRef,
    // ctx,
    drawingMode,
    isDrawing,
    onDrawToogleClick,
    onDrawing,
    onMouseUp,
    onMouseDown,
    onMouseLeave,
    onSave,
    // onNewCanvas,
    drawArr,
    width,
    height,
  ] as const;
};

export default useGenerateDrawCanvas;
