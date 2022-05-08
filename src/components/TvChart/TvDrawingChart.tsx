import { width } from '@mui/material/node_modules/@mui/system';
import classNames from 'classnames';
import { LogicalRange } from 'lightweight-charts';
import { useRef, useState, useEffect } from 'react';
import useGenerateChart from '../../hooks/useGenerateChart';
import { useGetChartDatas } from '../../hooks/useGetChartDatas';
import useParsingAndUpdateWebSocketChart from '../../hooks/useParsingAndUpdateWebSocketChart';
import DrawCanvas from '../DrawCanvas/DrawCanvas';
import DrawModeToggle from '../DrawCanvas/DrawModeToggle';
import useGenerateDrawCanvas from '../DrawCanvas/useGenerateDrawCanvas';
import useGetContext from '../DrawCanvas/useGetContext';
import useResizeCanvas from '../DrawCanvas/useResizeCanvas';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import DrawSave from '../DrawCanvas/DrawSave';
import DrawCanvasBar from '../DrawCanvas/DrawCanvasBar';
import { useRecoilState } from 'recoil';
import { atomModalState } from '../../atom/modal.atom';
import { IconButton } from '@mui/material';

// 1. 새로운 도화지 생성하기를 누르면 해당 도화지를 생성함
// 각도화지는
// 2. 드로잉모드를 하게된다면 생성된 마지막 도화지를 기반으로 드로잉이 되며 드로잉값이 차트에 저장되지않음.
// 3. 드로잉모드를 종료하면 자동으로 서버에 저장을함. ()
// 4. 다시 드로잉모드를 한다면 아직 생성을 안했으니 해당 도화지에 그림을 그림

/*
[
  {
    draw:{

    },
    scale:{

    }
  }
]
*/

const TvDrawingChart = () => {
  const [modal, setModal] = useRecoilState(atomModalState);
  useGetChartDatas();
  const [wrapperRef, candleRef, chartRef] = useGenerateChart();
  const [recordRange, setRecordRange] = useState<LogicalRange>();
  const [pause, setPause] = useParsingAndUpdateWebSocketChart(
    candleRef,
    recordRange,
    setRecordRange
  );

  const [
    canvasRef,
    canvasWrapperRef,
    saveWrapperRef,
    ctx,
    drawingMode,
    isDrawing,
    onDrawToogleClick,
    onDrawing,
    onMouseUp,
    onMouseDown,
    onMouseLeave,
    onSave,
    onNewCanvas,
    drawArr,
  ] = useGenerateDrawCanvas(
    wrapperRef,
    pause,
    setPause,
    chartRef,
    setRecordRange
  );

  const [priceRange, setPriceRange] = useState();

  // const [isDrawing, setIsDrawing] = useState(false);

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
    <div className={classNames(`w-full `)}>
      {/* <div
        onClick={(e) => {
          setPause(true);
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

              if (drawArr.length > 0) {
                ctx.beginPath();
                let prevX = drawArr[0].originX;
                let prevY = drawArr[0].originY;

                ctx.moveTo(prevX, prevY);
                drawArr.forEach((item) => {
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
      </div> */}
      {/* <div
        onClick={(e) => {
          if (candleRef.current) {
            if (recordRange) {
              chartRef.current?.timeScale().setVisibleLogicalRange(recordRange);
              chartRef.current?.applyOptions({
                rightPriceScale: {
                  autoScale: true,
                },
              });
              setPause(false);
              setDrawingMode(true);
            }
          }
        }}
      >
        드로잉 데이터 보기(실시간 적용)
      </div> */}
      {/* <div
        onClick={() => {
          if (canvasRef.current) {
            const ctx = canvasRef.current.getContext('2d');
            if (ctx) {
              console.log('왜안돼');
              ctx.clearRect(
                0,
                0,
                canvasRef.current.clientWidth,
                canvasRef.current.clientHeight
              );
              ctx.strokeStyle = 'black';
              ctx.lineWidth = 1;
            }
          }
          setDrawingMode(false);
          setPause(false);
        }}
      >
        드로잉 데이터 보기 모드 끄기
      </div> */}
      <div className={classNames(`flex justify-center items-center`)}>
        <DrawCanvasBar onDraw={onDrawToogleClick} onSave={onSave} />
        <IconButton onClick={onNewCanvas}>
          <AddIcon />
        </IconButton>
      </div>
      <div className={classNames(`flex justify-center items-center`)}>
        {drawArr?.map((item) => (
          <div
            className={classNames(` mx-10`)}
            onClick={() => {
              console.log(item.drawData);
            }}
          >
            {item.time}
            <img
              className={classNames(`hover:cursor-pointer`)}
              onClick={() => {
                setModal({
                  modalState: true,
                  modalType: 'image',
                  modalPayload: item.drawImageUrl,
                });
              }}
              src={item.drawImageUrl}
              alt={item.time}
              width="100"
              height="100"
            />
          </div>
        ))}
      </div>

      <div
        className={classNames(`w-full ml-28 relative z-20 `)}
        ref={saveWrapperRef}
      >
        <div
          className={classNames(`w-full  absolute z-10 -tran`)}
          ref={canvasWrapperRef}
        >
          <canvas
            ref={canvasRef}
            onMouseMove={onDrawing}
            onMouseUp={onMouseUp}
            onMouseDown={onMouseDown}
            onMouseLeave={onMouseLeave}
            className={classNames(
              `bg-blue-300 bg-opacity-20`,
              drawingMode === true ? 'visible' : 'hidden'
            )}
          />
        </div>

        <div className={classNames(`w-full h-full`)} ref={wrapperRef} />
      </div>
    </div>
  );
};

export default TvDrawingChart;
