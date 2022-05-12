import classNames from 'classnames';
import React, { useEffect, useRef, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { atomSelectChartSetup } from '../atom/selectChart.atom';
import MainWrapper from './Common/MainWrapper';
import TvChart from './TvChart/TvChart';
import TvChartTime from './TvChart/TvChartTime';

const MainContent = () => {
  return (
    <MainWrapper className={classNames(`p-6 flex items-center pr-0`)}>
      <TvChart />
      <TvChartTime />
    </MainWrapper>
  );
};
export default MainContent;
