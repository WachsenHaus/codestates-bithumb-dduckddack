import axios from 'axios';
import html2canvas from 'html2canvas';
import { IChartApi, LogicalRange } from 'lightweight-charts';
import _ from 'lodash';
import moment from 'moment';
import { userInfo } from 'os';
import { useEffect, useRef, useState } from 'react';
import { ReactSketchCanvasRef } from 'react-sketch-canvas';
import { useRecoilState, useRecoilValue, useRecoilValueLoadable } from 'recoil';
import { API_DRAW } from '../../api/draw.api';
import { DDUCKDDACK_AXIOS } from '../../App';
import { atomSelectCoinDefault } from '../../atom/selectCoinDefault.atom';
import { atomSelectCoinDetail } from '../../atom/selectCoinDetail.atom';
import {
  atomChartData,
  atomDrawStBars,
  selectorDrawStBars,
} from '../../atom/tvChart.atom';
import {
  atomUserChartDatas,
  atomUserInfo,
  IUserChatDatas,
} from '../../atom/user.atom';
import { dduckddackResponseVO } from '../../type/api';
import useGetContext from './useGetContext';
import useResizeCanvas from './useResizeCanvas';
import CI from '../../asset/img/sp_main_new.png';

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

  const statusDrawRef = useRef(false);

  const [uesrData, setUserData] = useRecoilState(atomUserChartDatas);
  const [chartData, setChartData] = useRecoilState(atomDrawStBars);
  const selectorDrawStbars = useRecoilValueLoadable(selectorDrawStBars);
  const userInfo = useRecoilValue(atomUserInfo);
  const selectedCoin = useRecoilValue(atomSelectCoinDefault);

  useEffect(() => {
    const { state, contents } = selectorDrawStbars;
    if (state === 'hasValue') {
      contents && setChartData(contents);
    } else if (state === 'hasError') {
      console.error(state);
    }
  }, [selectorDrawStbars]);

  const [drawingMode, setDrawingMode] = useState(false);
  const [eraseMode, setEraseMode] = useState(false);

  const [width, height] = useResizeCanvas(
    canvasWrapperRef,
    tvChartRef,
    chartRef
  );

  const onDrawToogleClick = () => {
    setDrawingMode(!drawingMode);
    setPause(!pause);
  };

  const generateHeader = () => {
    const mTime = moment().format('YYYY-MM-DD HH:mm:ss');

    const wrapper = document.createElement('div');
    wrapper.className = `flex justify-center itesm-center h-32 w-full px-5`;

    const titleWrapper = document.createElement('div');
    titleWrapper.className = `flex justify-between items-center h-32 w-full px-16`;

    // 작성자
    const authorTitle = document.createElement('h1');
    authorTitle.className = 'font-bmjua';
    authorTitle.innerText = `작성자 : ${userInfo.userInfo?.nickName} (${selectedCoin.coinName}) `;
    titleWrapper.appendChild(authorTitle);
    // 작성일
    const timeTitle = document.createElement('h1');
    timeTitle.className = 'font-bmjua';
    timeTitle.innerText = `작성일 : ${mTime}`;
    titleWrapper.appendChild(timeTitle);

    // 빗썸 로고
    const LogoWrapper = document.createElement('div');
    LogoWrapper.className = `flex justify-center items-center h-32`;

    // 빗썸 이미지
    const bitThumbImg = document.createElement('div');
    bitThumbImg.style.width = '179px';
    bitThumbImg.style.height = '52px';
    bitThumbImg.style.backgroundImage = `url(${CI})`;
    bitThumbImg.style.backgroundRepeat = `no-repeat`;
    bitThumbImg.style.backgroundPosition = `29px 14px`;
    LogoWrapper.appendChild(bitThumbImg);

    //wrapper에 로고와 타이틀을 넣음.
    wrapper.appendChild(LogoWrapper);
    wrapper.appendChild(titleWrapper);

    return wrapper;
  };

  const onSave = async () => {
    const header = generateHeader();
    if (saveWrapperRef.current) {
      saveWrapperRef.current.prepend(header);

      // 작업플래그 설정,

      saveWrapperRef.current.style.transform = 'translateX(-100%)';
      // saveWrapperRef.current.style.opacity = '0';
      await html2canvas(saveWrapperRef.current)
        .then((canvas) => {
          if (saveWrapperRef.current) {
            if (
              userInfo.accessToken === undefined &&
              userInfo.userInfo === undefined
            ) {
              return;
            }

            canvas.toBlob(async (e) => {
              let imageUrl: Blob | null = e;
              if (userInfo.userInfo && imageUrl !== null) {
                const id = userInfo.userInfo?.id?.toString() as string;
                const today = moment().utc().valueOf().toString();
                const formData = new FormData();
                formData.append(
                  'image',
                  imageUrl,
                  `${userInfo.userInfo.email}_${today}`
                );
                formData.append('userId', id);
                formData.append('time', today);
                formData.append('coin', selectedCoin.coinSymbol);
                if (formData) {
                  try {
                    const result = await DDUCKDDACK_AXIOS.post<
                      dduckddackResponseVO<IUserChatDatas>
                    >(API_DRAW.UPLOAD_IMAGE, formData, {
                      headers: {
                        'Content-Type': 'application/json',
                      },
                    });

                    if (result.data.status === 'ok') {
                      const resultData = result.data.message;
                      const prevData = JSON.parse(JSON.stringify(uesrData));
                      prevData.unshift(resultData);
                      setUserData(prevData);
                    }
                  } catch (err) {
                    console.log(err);
                  }
                }
              }
            });
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          if (saveWrapperRef.current) {
            //  저장될때 어떻게할까,
            saveWrapperRef.current.removeChild(header);
            saveWrapperRef.current.style.transform = 'translateX(0%)';
            saveWrapperRef.current.style.opacity = '1';
          }
          return true;
        });
    }
    return true;
    // const prev = JSON.parse(JSON.stringify(drawAxisDatas));
    // 드로우 배열에 넣는다.

    // setDrawAxisDatas([]);
    // // 트레이딩뷰 좌표 기억
    // if (chartRef.current) {
    //   const range = chartRef.current?.timeScale().getVisibleLogicalRange();
    //   if (range) {
    //     setRecordRange(range);
    //   }
    // }
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
    statusDrawRef,
    drawingMode,
    onDrawToogleClick,
    onSave,
    onErase,
    onUndo,
    onRedo,

    width,
    height,
  ] as const;
};

export default useGenerateDrawCanvas;
