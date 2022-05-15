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
import { useRecoilState, useRecoilValue } from 'recoil';
import { atomModalState } from '../../atom/modal.atom';
import { IconButton } from '@mui/material';
import { ReactSketchCanvas } from 'react-sketch-canvas';
import { HexColorPicker } from 'react-colorful';
import { atomDrawConfig } from '../../atom/drawConfig.atom';
import DrawTool from '../DrawTool/DrawTool';
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
  const drawConfig = useRecoilValue(atomDrawConfig);

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
    // ctx,
    drawingMode,
    onDrawToogleClick,
    onSave,
    onErase,
    onUndo,
    onRedo,
    // onNewCanvas,
    drawArr,
    width,
    height,
  ] = useGenerateDrawCanvas(
    wrapperRef,
    pause,
    setPause,
    chartRef,
    setRecordRange
  );

  useEffect(() => {
    if (candleRef.current) {
      if (recordRange) {
        chartRef.current?.timeScale().setVisibleLogicalRange(recordRange);
      }
    }
  }, [recordRange]);

  return (
    <div
      className={classNames(`w-full h-full grid gap-y-5 `)}
      style={{
        gridTemplateRows: '25% auto',
      }}
    >
      <DrawTool
        onNewButton={() => {
          canvasRef.current?.clearCanvas();
        }}
        onDrawButton={onDrawToogleClick}
        onErase={onErase}
        onUndo={onUndo}
        onRedo={onRedo}
        onSave={onSave}
      />
      <div
        className={classNames(
          `w-full h-full relative z-20 rounded-3xl bg-nightBlack  drop-shadow-3xl`,
          `box-border`,
          `p-5`
        )}
        ref={saveWrapperRef}
      >
        <div
          className={classNames(`w-full  absolute z-10`)}
          ref={canvasWrapperRef}
        >
          <ReactSketchCanvas
            ref={canvasRef}
            strokeWidth={drawConfig.penStroke}
            eraserWidth={drawConfig.eraseStroke}
            strokeColor={drawConfig.penColor}
            canvasColor="rgba(0,0,0,0)"
            width={`${width.toString()}px`}
            height={`${height.toString()}px`}
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
