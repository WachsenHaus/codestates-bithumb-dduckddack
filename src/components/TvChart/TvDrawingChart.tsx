import classNames from 'classnames';
import { LogicalRange } from 'lightweight-charts';
import { useState, useEffect } from 'react';
import useGenerateChart from '../../hooks/useGenerateChart';
import { useGetChartDatas } from '../../hooks/useGetChartDatas';
import useParsingAndUpdateWebSocketChart from '../../hooks/useParsingAndUpdateWebSocketChart';
import useGenerateDrawCanvas from '../DrawCanvas/useGenerateDrawCanvas';

import { useRecoilState, useRecoilValue } from 'recoil';
import { atomModalState } from '../../atom/modal.atom';
import { ReactSketchCanvas } from 'react-sketch-canvas';
import { atomDrawConfig } from '../../atom/drawConfig.atom';
import DrawTool from '../DrawTool/DrawTool';

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
    drawingMode,
    onDrawToogleClick,
    onSave,
    onErase,
    onUndo,
    onRedo,

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
