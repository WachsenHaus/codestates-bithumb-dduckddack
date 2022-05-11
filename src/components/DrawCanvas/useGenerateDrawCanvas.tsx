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
  const [eraseMode, setEraseMode] = useState(false);

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

  const [width, height] = useResizeCanvas(
    canvasWrapperRef,
    tvChartRef,
    chartRef
  );

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
  };

  const onSaveAs = (uri: any, filename: any) => {
    console.log('onSaveas');
    const link = document.createElement('a');
    document.body.appendChild(link);
    link.href = uri;
    link.download = filename;
    link.click();
    document.body.removeChild(link);
  };

  const onErase = () => {
    if (canvasRef.current) {
      canvasRef.current?.eraseMode(!eraseMode);
    }
    setEraseMode(!eraseMode);
  };

  const onUndo = () => {
    if (canvasRef.current) {
      canvasRef.current.undo();
    }
  };

  const onRedo = () => {
    if (canvasRef.current) {
      canvasRef.current.redo();
    }
  };

  return [
    canvasRef,
    canvasWrapperRef,
    saveWrapperRef,
    drawingMode,
    onDrawToogleClick,
    onSave,
    onErase,
    onUndo,
    onRedo,
    drawArr,
    width,
    height,
  ] as const;
};

export default useGenerateDrawCanvas;
