import { IconButton, Slider, Switch, Tooltip } from '@mui/material';
import classNames from 'classnames';
import { ReactNode, useEffect, useState } from 'react';
import MainWrapper from '../Common/MainWrapper';
import SwiperCore, { Autoplay, Navigation } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
// import 'swiper/css';
// import 'swiper/css/pagination';
// import 'swiper/css/navigation';
// import 'swiper/swiper.scss'; // core Swiper
// import 'swiper/modules/navigation/navigation.scss'; // Navigation module
// import 'swiper/modules/pagination/pagination.scss'; // Pagination module
// swiper core styles
import 'swiper/css';

// modules styles
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { atomModalState } from '../../atom/modal.atom';
import { HexColorPicker } from 'react-colorful';
import { atomDrawConfig } from '../../atom/drawConfig.atom';
import { atomUserChartDatas } from '../../atom/user.atom';
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

SwiperCore.use([Autoplay, Navigation]);

// {
//   children,
//   onClick,
//   active,
//   isDraw,
//   ref,
// }: {
//   children: ReactNode;
//   onClick?: () => void;
//   active?: boolean;
//   isDraw?: boolean;
//   ref?: any;
// }

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

          // `pointer-events-none`
          // `shadow-2xl`
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
  const [drawResult, setDrawResult] = useState<any>(undefined);

  useEffect(() => {
    const result = userChartData.map((item) => (
      <SwiperSlide className={classNames(`flex justify-center items-center`)}>
        <img
          src={item.chartImg}
          alt="radomphoto"
          className={classNames(`w-12 h-12 hover:cursor-pointer`)}
          onClick={() => {
            setModal({
              modalState: true,
              modalType: 'chartImage',
              modalPayload: {
                src: item.chartImg,
                data: item.chartData,
              },
            });
          }}
        />
      </SwiperSlide>
    ));

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
  const setModal = useSetRecoilState(atomModalState);
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
          <DrawToolShareCanvas onClick={() => {}} isDraw={isDraw} />
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
              className={classNames(`relative hover:cursor-pointer`)}
              onClick={(e) => {
                console.log(e.target);
                const target = e.target as HTMLElement;
                console.log(e.currentTarget);
                if (
                  target.ariaLabel === 'Color' ||
                  target.ariaLabel === 'Hue'
                ) {
                  return;
                }
                setOnColorPannel(!onColorPannel);
              }}
            >
              <PaletteIcon
                sx={{
                  color: config.penColor,
                }}
              />
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
          onSwiper={(e) => {
            // refSwiper.current = e;
          }}
          className={classNames(` h-full w-full px-10`)}
          //   initialSlide={0}
          slidesPerView={5}
          spaceBetween={30}
          // centeredSlides
          //   autoplay={{ delay: 0 }}
          //   loop
          //   rewind
          //   navigation
        >
          {ImgItem()}
          {/* {ImgItem()}
          {ImgItem()}
          {ImgItem()}
          {ImgItem()}
          {ImgItem()}
          {ImgItem()} */}

          {/* <SwiperSlide
            className={classNames(`flex justify-center items-center`)}
          >
            <img
              src="https://source.unsplash.com/random"
              alt="radomphoto"
              className={classNames(`w-12 h-12 hover:cursor-pointer`)}
              onClick={() => {
                setModal({
                  modalState: true,
                  modalType: 'image',
                  modalPayload: 'https://source.unsplash.com/random',
                });
              }}
            />
          </SwiperSlide>
          <SwiperSlide
            className={classNames(`flex justify-center items-center`)}
          >
            <img
              src="https://source.unsplash.com/random"
              alt="radomphoto"
              className={classNames(`w-12 h-12`)}
              onClick={() => {
                setModal({
                  modalState: true,
                  modalType: 'image',
                  modalPayload: 'https://source.unsplash.com/random',
                });
              }}
            />
          </SwiperSlide>
          <SwiperSlide
            className={classNames(`flex justify-center items-center`)}
          >
            <img
              src="https://source.unsplash.com/random"
              alt="radomphoto"
              className={classNames(`w-12 h-12`)}
              onClick={() => {
                setModal({
                  modalState: true,
                  modalType: 'image',
                  modalPayload: 'https://source.unsplash.com/random',
                });
              }}
            />
          </SwiperSlide>
          <SwiperSlide
            className={classNames(`flex justify-center items-center`)}
          >
            <img
              src="https://source.unsplash.com/random"
              alt="radomphoto"
              className={classNames(`w-12 h-12`)}
              onClick={() => {
                setModal({
                  modalState: true,
                  modalType: 'image',
                  modalPayload: 'https://source.unsplash.com/random',
                });
              }}
            />
          </SwiperSlide>
          <SwiperSlide
            className={classNames(`flex justify-center items-center`)}
          >
            <img
              src="https://source.unsplash.com/random"
              alt="radomphoto"
              className={classNames(`w-12 h-12`)}
              onClick={() => {
                setModal({
                  modalState: true,
                  modalType: 'image',
                  modalPayload: 'https://source.unsplash.com/random',
                });
              }}
            />
          </SwiperSlide>
          <SwiperSlide
            className={classNames(`flex justify-center items-center`)}
          >
            <img
              src="https://source.unsplash.com/random"
              alt="radomphoto"
              className={classNames(`w-12 h-12`)}
              onClick={() => {
                setModal({
                  modalState: true,
                  modalType: 'image',
                  modalPayload: 'https://source.unsplash.com/random',
                });
              }}
            />
          </SwiperSlide> */}

          {/* <SwiperSlide>이미지3</SwiperSlide> */}
        </Swiper>
      </div>
    </MainWrapper>
  );
};

export default DrawTool;
