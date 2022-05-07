import { width } from '@mui/material/node_modules/@mui/system';
import classNames from 'classnames';
import { LogicalRange } from 'lightweight-charts';
import { useRef, useState, useEffect } from 'react';
import useGenerateChart from '../../hooks/useGenerateChart';
import { useGetChartDatas } from '../../hooks/useGetChartDatas';
import useParsingAndUpdateWebSocketChart from '../../hooks/useParsingAndUpdateWebSocketChart';

const TvDrawingChart = () => {
  useGetChartDatas();
  const [wrapperRef, candleRef, chartRef] = useGenerateChart();
  const [recordRange, setRecordRange] = useState<LogicalRange>();
  const [pause, setPause] = useParsingAndUpdateWebSocketChart(
    candleRef,
    recordRange,
    setRecordRange
  );

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const canvasWrapperRef = useRef<HTMLDivElement | null>(null);

  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [priceRange, setPriceRange] = useState();
  const [drawingMode, setDrawingMode] = useState(false);
  const [moveAxis, setMoveAxis] = useState<{
    x: any;
    y: any;
  }>({
    x: 0,
    y: 0,
  });

  const [copyDraw, setCopyDraw] = useState<
    Array<{
      x: any;
      y: any;
      originX: any;
      originY: any;
      rateX: any;
      rateY: any;
    }>
  >([]);
  const [drawArr, setDrawArr] = useState<
    Array<{
      x: any;
      y: any;
      originX: any;
      originY: any;
      rateX: any;
      rateY: any;
    }>
  >([]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    e.persist();
    console.log(e.nativeEvent);
    setIsDrawing(true);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (wrapperRef.current && canvas) {
      const tvCanvas = wrapperRef.current.querySelector('canvas');
      if (tvCanvas) {
        canvas.width = tvCanvas?.clientWidth;
        canvas.height = tvCanvas.clientHeight;
      }
    }

    if (canvas) {
      const context = canvas.getContext('2d');

      if (context) {
        context.strokeStyle = 'black';
        context.lineWidth = 1;

        contextRef.current = context;

        setCtx(context);
      }
    }
  }, [canvasRef]);

  const drawing = (e: any) => {
    const { offsetX, offsetY } = e.nativeEvent;
    if (ctx && canvasRef.current) {
      if (!isDrawing) {
        ctx.beginPath();
        ctx.moveTo(offsetX, offsetY);
        setMoveAxis({
          x: offsetX,
          y: offsetY,
        });
      } else {
        ctx.lineTo(offsetX, offsetY);
        const prevCopyDraw = JSON.parse(JSON.stringify(copyDraw));
        prevCopyDraw.push({
          x: offsetX,
          y: offsetY,
          originX: moveAxis.x,
          originY: moveAxis.y,
          rateX: offsetX / canvasRef.current?.clientWidth,
          rateY: offsetY / canvasRef.current?.clientHeight,
        });

        setCopyDraw(prevCopyDraw);
        ctx.stroke();
      }
    }
  };

  useEffect(() => {
    canvasWrapperRef.current?.addEventListener('resize', () => {
      if (ctx && wrapperRef.current) {
        if (wrapperRef.current) {
          const tvCanvas = wrapperRef.current.querySelector('canvas');
          if (tvCanvas) {
            ctx.canvas.width = tvCanvas?.clientWidth;
            ctx.canvas.height = tvCanvas.clientHeight;
          }
        }
      }
    });
  }, []);

  useEffect(() => {
    if (drawingMode) {
      // chartRef.current.
    }
  }, [drawingMode]);

  useEffect(() => {
    if (candleRef.current) {
      if (recordRange) {
        console.log('변경됨');
        chartRef.current?.timeScale().setVisibleLogicalRange(recordRange);
        //   setDrawingMode(true);
      }
    }
  }, [recordRange]);

  return (
    <div className={classNames(`w-full bg-red-500 relative z-50`)}>
      <div
        className={'border-2 hover:cursor-pointer'}
        onClick={(e) => {
          // 트레이딩뷰 좌표 기억
          if (candleRef.current) {
            const range = chartRef.current?.timeScale().getVisibleRange();
            const range2 = chartRef.current
              ?.timeScale()
              .getVisibleLogicalRange();

            console.log(chartRef.current?.options());
            console.log(range2);
            if (range2) {
              setRecordRange(range2);
            }
          }

          // 드로잉한 그림 기억
          if (canvasRef.current) {
            const ctx = canvasRef.current.getContext('2d');
            if (ctx) {
              ctx.clearRect(
                0,
                0,
                canvasRef.current.clientWidth,
                canvasRef.current.clientHeight
              );
            }

            console.log(copyDraw);
          }
        }}
      >
        드로잉 저장하기
      </div>
      <div
        onClick={(e) => {
          setDrawingMode(true);
          if (candleRef.current) {
            if (recordRange) {
              chartRef.current?.timeScale().setVisibleLogicalRange(recordRange);
            }
          }

          if (canvasRef.current) {
            const ctx = canvasRef.current.getContext('2d');
            if (ctx) {
              ctx.clearRect(
                0,
                0,
                canvasRef.current.clientWidth,
                canvasRef.current.clientHeight
              );
              ctx.lineWidth = 1;
              ctx.strokeStyle = 'red';

              if (copyDraw.length > 0) {
                console.log(copyDraw);
                console.log('copy');
                ctx.beginPath();
                let prevX = copyDraw[0].originX;
                let prevY = copyDraw[0].originY;

                ctx.moveTo(prevX, prevY);
                copyDraw.forEach((item) => {
                  if (prevX !== item.originX || prevY !== item.originY) {
                    prevX = item.originX;
                    prevY = item.originY;
                    ctx.moveTo(prevX, prevY);
                  }

                  ctx.lineTo(item.x, item.y);
                  ctx.stroke();
                });
                ctx.closePath();
                // ctx.save();
              }
            }
          }
        }}
      >
        드로잉 불러오기
      </div>
      <div
        onClick={(e) => {
          if (candleRef.current) {
            if (recordRange) {
              chartRef.current?.timeScale().setVisibleLogicalRange(recordRange);
              chartRef.current?.applyOptions({
                rightPriceScale: {
                  autoScale: true,
                },
              });
              setDrawingMode(true);
            }
          }
        }}
      >
        드로잉 돌아가기
      </div>
      <div
        onClick={() => {
          //   setPause(!pause);
          setDrawingMode(!drawingMode);
        }}
      >
        드로잉 모드
      </div>

      <div
        className={classNames(`w-full absolute z-20`)}
        ref={canvasWrapperRef}
      >
        <canvas
          ref={canvasRef}
          onMouseMove={drawing}
          onMouseDown={startDrawing}
          onMouseUp={(e) => {
            e.persist();
            setIsDrawing(false);
          }}
          onMouseLeave={(e) => {
            e.persist();
            setIsDrawing(false);
          }}
          // onScroll={(e) => {}}
          className={classNames(
            `bg-red-50 bg-opacity-20`,
            drawingMode === true ? 'visible' : 'hidden'
          )}
        />
      </div>
      <div className={classNames(`w-full px-10 h-full`)} ref={wrapperRef} />
    </div>
  );
};

export default TvDrawingChart;
