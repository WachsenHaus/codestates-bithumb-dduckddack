import { IconButton, Slider, Switch, Tooltip } from '@mui/material';
import classNames from 'classnames';
import { ReactNode, useEffect, useState } from 'react';
import MainWrapper from '../Common/MainWrapper';
import SwiperCore, { Autoplay, Navigation } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
// import 'swiper/css';
// import 'swiper/css/pagination';
// import 'swiper/css/navigation';
import 'swiper/css';

// modules styles
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { atomModalState } from '../../atom/modal.atom';
import { HexColorPicker } from 'react-colorful';
import { atomDrawConfig } from '../../atom/drawConfig.atom';
import { atomUserChartDatas, atomUserInfo } from '../../atom/user.atom';
// import 'swiper/modules/navigation/navigation.scss'; // Navigation module
// import 'swiper/modules/pagination/pagination.scss'; // Pagination module
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import SaveIcon from '@mui/icons-material/Save';
import ShareIcon from '@mui/icons-material/Share';
import PaletteIcon from '@mui/icons-material/Palette';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import ModeIcon from '@mui/icons-material/Mode';
import BrushIcon from '@mui/icons-material/Brush';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEraser } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { API_DATA_LAKE } from '../../api/dataLake.api';
import axios from 'axios';
import { dduckddackResponseVO } from '../../type/api';
import {
  atomChartData,
  ICoinChart,
  selectorDrawStBars,
} from '../../atom/tvChart.atom';
import stringify from 'fast-json-stable-stringify';
import {
  atomChatRecvChatMessage,
  atomChatWebSocket,
} from '../../atom/chat.atom';
import { atomSelectCoinDefault } from '../../atom/selectCoinDefault.atom';
import { TypeWebSocketChatSend } from '../../atom/ws.type';

SwiperCore.use([Autoplay, Navigation]);

const SubWrapper = React.forwardRef(
  (
    props: {
      children: ReactNode;
      onClick?: () => void;
      active?: boolean;
      isDraw?: boolean;
      ref?: any;
    },
    ref: any
  ) => {
    return (
      <div
        {...props}
        ref={ref}
        className={classNames(
          `bg-bithumbSubGray bg-opacity-20 text-bithumbYellow`,
          `h-1/2 w-3/4 m-2`,
          'flex justify-center items-center',
          `rounded-3xl`,
          `filter drop-shadow-3xl`,
          `hover:cursor-pointer`,
          `active:border-blue-700 active:border-2`,
          `focus:border-blue-700 focus:border-2`,
          props?.active === true ? `border-blue-700 border-2` : '',
          props?.isDraw === true
            ? `pointer-events-auto opacity-100`
            : `pointer-events-none opacity-10`
        )}
        onClick={props.onClick}
      >
        {props.children}
      </div>
    );
  }
);

const DrawToolNewCanvas = ({
  onClick,
  isDraw,
}: {
  onClick: () => void;
  isDraw: boolean;
}) => {
  return (
    <Tooltip title="새로 그리기">
      <SubWrapper onClick={onClick} isDraw={isDraw}>
        <IconButton
          sx={{
            color: '#FAD390',
          }}
        >
          <RestartAltIcon />
        </IconButton>
      </SubWrapper>
    </Tooltip>
  );
};
const DrawToolDrawButton = ({ onClick }: { onClick: () => void }) => {
  const [state, setState] = useState(false);
  return (
    <Tooltip title="그림그리기 모드">
      <SubWrapper
        onClick={() => {
          setState(!state);
          onClick();
        }}
        active={state}
        isDraw={true}
        // ref={ref}
      >
        <IconButton
          sx={{
            color: '#FAD390',
          }}
        >
          <ModeEditOutlineIcon />
        </IconButton>
      </SubWrapper>
    </Tooltip>
  );
};

const DrawToolSaveCanvas = ({
  onClick,
  isDraw,
}: {
  onClick: () => void;
  isDraw: boolean;
}) => {
  return (
    <Tooltip title="저장하기">
      <SubWrapper onClick={onClick} isDraw={isDraw}>
        <IconButton
          sx={{
            color: '#FAD390',
          }}
        >
          <SaveIcon />
        </IconButton>
      </SubWrapper>
    </Tooltip>
  );
};
const DrawToolShareCanvas = ({
  onClick,
  isDraw,
}: {
  onClick: () => void;
  isDraw: boolean;
}) => {
  return (
    <Tooltip title="채팅방에 공유하기">
      <SubWrapper onClick={onClick} isDraw={isDraw}>
        <IconButton
          sx={{
            color: '#FAD390',
          }}
        >
          <ShareIcon />
        </IconButton>
      </SubWrapper>
    </Tooltip>
  );
};

const DrawToolEraseButton = ({
  onClick,
  isDraw,
}: {
  onClick: () => void;
  isDraw: boolean;
}) => {
  const [state, setState] = useState(false);
  useEffect(() => {}, [state]);
  return (
    <SubWrapper
      onClick={() => {
        setState(!state);
        onClick();
      }}
      isDraw={isDraw}
    >
      <Tooltip title="펜모드">
        <IconButton
          sx={{
            color: '#FAD390',
          }}
        >
          <BrushIcon
            onClick={() => {
              setState(!state);
              onClick();
            }}
          />
        </IconButton>
      </Tooltip>
      <Switch defaultChecked={state} />
      <Tooltip title="지우개모드">
        <IconButton
          sx={{
            color: '#FAD390',
          }}
          onClick={() => {
            setState(!state);
            onClick();
          }}
        >
          <FontAwesomeIcon icon={faEraser} />
        </IconButton>
      </Tooltip>

      {/* 지우개 {state ? '지우개' : '펜'} */}
    </SubWrapper>
  );
};

const DrawToolRedoButton = ({
  onClick,
  isDraw,
}: {
  onClick: () => void;
  isDraw: boolean;
}) => {
  return (
    <SubWrapper onClick={onClick} isDraw={isDraw}>
      <RedoIcon />
    </SubWrapper>
  );
};

const DrawToolUndoButton = ({
  onClick,
  isDraw,
}: {
  onClick: () => void;
  isDraw: boolean;
}) => {
  return (
    <SubWrapper onClick={onClick} isDraw={isDraw}>
      <UndoIcon />
    </SubWrapper>
  );
};

const ImgItem = () => {
  const setModal = useSetRecoilState(atomModalState);
  const userChartData = useRecoilValue(atomUserChartDatas);
  const setChartData = useSetRecoilState(atomChartData);
  const [drawResult, setDrawResult] = useState<any>(undefined);

  // const [drawChart, setDrawChart] = useState<ICoinChart>();
  const drawStBars = useRecoilValue(selectorDrawStBars);

  // useEffect(()=>{
  //   if(setDrawStBars)
  // },[setDrawStBars])

  //

  // 이미지를 눌렀을 떄만 데이터를 받아오게 수정해야함.
  const getDataLake = async (coin: string, time: string) => {
    try {
      const result = await axios.post<dduckddackResponseVO<ICoinChart>>(
        API_DATA_LAKE.GET_CANDLE_DATA,
        {
          coin: coin,
          time: time,
        }
      );
      if (result.data.status === 'ok') {
        // return result.data.message;
        setChartData(result.data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    const result = userChartData.map((item, index) => {
      // getDataLake(item.coin, item.time);

      return (
        <>
          <SwiperSlide
            key={index}
            className={classNames(`flex justify-center items-center`)}
          >
            {/* <img
              src={`${item.image}`}
              alt={`Chart Draw ${index}`}
              className={classNames(`w-12 h-12 hover:cursor-pointer`)}
              onClick={() => {
                setModal({
                  modalState: true,
                  modalType: 'chartImage',
                  modalPayload: {
                    src: item.image,
                    data: drawStBars,
                  },
                });
              }}
            /> */}
            <img
              src={`${item.coin}`}
              alt={`Chart Draw ${index}`}
              className={classNames(`w-12 h-12 hover:cursor-pointer`)}
              onClick={() => {
                setModal({
                  modalState: true,
                  modalType: 'chartImage',
                  modalPayload: {
                    src: item.coin,
                    data: [],
                  },
                });
              }}
            />
          </SwiperSlide>
        </>
      );
    });
    setDrawResult(result);
  }, [userChartData]);

  return drawResult;
};

const DrawTool = ({
  onNewButton,
  onDrawButton,
  onErase,
  onUndo,
  onRedo,
  onSave,
}: {
  onNewButton: () => void;
  onDrawButton: () => void;
  onErase: () => void;
  onUndo: () => void;
  onRedo: () => void;
  onSave: () => void;
}) => {
  // const chatMsg = useRecoilValue(atomChatRecvChatMessage);
  // const wsChat = useRecoilValue(atomChatWebSocket);
  // const userInfo = useRecoilValue(atomUserInfo);
  // const selectCoin = useRecoilValue(atomSelectCoinDefault);

  // const [modal, setModal] = useRecoilState(atomModalState);
  const [config, setDrawConfig] = useRecoilState(atomDrawConfig);
  const [isDraw, setIsDraw] = useState(false);

  const [onColorPannel, setOnColorPannel] = useState(false);

  return (
    <MainWrapper
      className={classNames(`h-full w-full`, `mx-auto`, `shadow-2xl`, `grid`)}
      style={{ gridTemplateColumns: '40% 20% 40%', borderRadius: '4rem' }}
    >
      <div className={classNames(`w-full  h-full grid grid-cols-3`)}>
        {/* col1 */}
        <div className={classNames(`flex  flex-col items-center h-full`)}>
          <DrawToolDrawButton
            onClick={() => {
              setIsDraw(!isDraw);
              onDrawButton();
            }}
          />
          <DrawToolNewCanvas onClick={onNewButton} isDraw={isDraw} />
        </div>
        {/* col2 */}
        <div className={classNames(`flex  flex-col items-center  h-full`)}>
          <DrawToolSaveCanvas onClick={onSave} isDraw={isDraw} />
          <DrawToolEraseButton onClick={onErase} isDraw={isDraw} />
        </div>
        {/* col3 */}
        <div className={classNames(`flex flex-col items-center  h-full`)}>
          <DrawToolShareCanvas
            onClick={() => {
              onSave && onSave();
              console.log('여기 이미지 보내는거잖아,,');
              //  const data: TypeWebSocketChatSend = {
              //   type: 'CHAT_MESSAGE',
              //   payload: {
              //     roomId: selectCoin.coinName || '비트코인',
              //     user: {
              //       username: userInfo?.userInfo?.nickName || '익명',
              //       avatar: '',
              //     },
              //     message: `chartimg:${modal.modalPayload}`,
              //   },
              // };

              // const sendData = stringify(data);
              // wsChat?.send(sendData);
            }}
            isDraw={isDraw}
          />
          <div
            className={classNames(
              `h-1/2 w-3/4 m-2`,
              `flex justify-center items-center`
            )}
          >
            <DrawToolRedoButton onClick={onRedo} isDraw={isDraw} />
            <DrawToolUndoButton onClick={onUndo} isDraw={isDraw} />
          </div>
        </div>
      </div>
      {/* 스트로크 */}
      <div className={classNames(`flex flex-col justify-center`)}>
        <div>
          <span
            className={classNames(
              `flex justify-start items-center`,
              `text-bithumbYellow`
            )}
          >
            <div
              className={classNames(
                `relative hover:cursor-pointer`,
                `filter drop-shadow-3xl`,
                onColorPannel === false ? `animate-pulse` : ''
              )}
              onClick={(e) => {
                const target = e.target as HTMLElement;
                if (
                  target.ariaLabel === 'Color' ||
                  target.ariaLabel === 'Hue'
                ) {
                  return;
                }
                setOnColorPannel(!onColorPannel);
              }}
            >
              <Tooltip title="색상 팔레트">
                <PaletteIcon />
              </Tooltip>

              {onColorPannel && (
                <Tooltip title="팔레트">
                  <IconButton>
                    <HexColorPicker
                      data-name="colorPicker"
                      style={{
                        position: 'absolute',
                        top: '-13rem',
                      }}
                      className={classNames(`absolute `)}
                      color={config.penColor}
                      onChange={(e) => {
                        setDrawConfig((prev) => {
                          return {
                            ...prev,
                            penColor: e,
                          };
                        });
                      }}
                    />
                  </IconButton>
                </Tooltip>
              )}
            </div>
            Pen Stroke & Color
          </span>
          <Slider
            about=""
            max={20}
            min={4}
            value={config.penStroke}
            sx={{
              color: config.penColor,
            }}
            onChange={(e, value) => {
              setDrawConfig((prev) => {
                return {
                  ...prev,
                  penStroke: value as number,
                };
              });
            }}
          />
        </div>
        <div>
          <span className={classNames(`text-bithumbYellow`)}>Erase Stroke</span>
          <Slider
            about=""
            max={99}
            min={4}
            value={config.eraseStroke}
            sx={{
              color: 'white',
            }}
            onChange={(e, value) => {
              setDrawConfig((prev) => {
                return {
                  ...prev,
                  eraseStroke: value as number,
                };
              });
            }}
          />
        </div>
      </div>
      {/* 이미지 슬라이더 */}
      <div>
        <Swiper
          onSwiper={(e) => {}}
          className={classNames(` h-full w-1/2 px-10`)}
          slidesPerView={5}
          spaceBetween={30}
        >
          {ImgItem()}
        </Swiper>
      </div>
    </MainWrapper>
  );
};

export default DrawTool;
