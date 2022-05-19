import { IconButton, Slider, Switch, Tooltip } from '@mui/material';
import classNames from 'classnames';
import { ReactNode, useEffect, useState } from 'react';
import MainWrapper from '../Common/MainWrapper';
import SwiperCore, {
  A11y,
  Autoplay,
  Navigation,
  Pagination,
  Scrollbar,
} from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { atomModalState } from '../../atom/modal.atom';
import { HexColorPicker } from 'react-colorful';
import { atomDrawConfig, atomDrawStatus } from '../../atom/drawConfig.atom';
import { atomUserChartDatas, atomUserInfo } from '../../atom/user.atom';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import SaveIcon from '@mui/icons-material/Save';
import PaletteIcon from '@mui/icons-material/Palette';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import BrushIcon from '@mui/icons-material/Brush';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEraser } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { API_DATA_LAKE } from '../../api/dataLake.api';
import axios from 'axios';
import { dduckddackResponseVO } from '../../type/api';
import { CONST_KR_UTC, ICoinChart, iStBar } from '../../atom/tvChart.atom';
import { UTCTimestamp } from 'lightweight-charts';
import LOADING_ATOM from '../../asset/img/loading_atom.json';
import LottieDiv from '../Common/LottieDiv';
import DrawCommon from './DrawCommon';

SwiperCore.use([Autoplay, Navigation, Pagination, Scrollbar, A11y]);

const SubWrapper = React.forwardRef(
  (
    props: {
      children: ReactNode;
      onClick?: () => void;
      active?: boolean;
      isDraw?: boolean;
      ref?: any;
      className?: string;
      disabled?: boolean;
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
            : `pointer-events-none opacity-10`,
          props.className
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
  const userInfo = useRecoilValue(atomUserInfo);
  const [isLogin, setIsLogin] = useState(userInfo.userInfo ? true : false);

  useEffect(() => {
    if (userInfo.userInfo) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [userInfo]);
  return (
    <Tooltip title={isLogin ? '그림그리기 모드' : '로그인 하세요'}>
      <SubWrapper
        onClick={() => {
          if (isLogin) {
            setState(!state);
            onClick();
          }
        }}
        className={classNames(
          isLogin ? `pointer-events-auto` : `pointer-events-none`,
          isLogin ? `hover:cursor-pointer` : `hover:cursor-not-allowed`
        )}
        active={state}
        isDraw={true}
      >
        <IconButton
          disabled={isLogin === false}
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

const DrawToolEraseButton = ({
  onClick,
  isDraw,
  className,
}: {
  onClick: () => void;
  isDraw: boolean;
  className?: string;
}) => {
  const [state, setState] = useState(false);

  return (
    <SubWrapper
      className={className}
      onClick={() => {
        setState(!state);
        onClick();
      }}
      isDraw={isDraw}
    >
      <Tooltip title="펜모드">
        <IconButton
          onClick={() => {
            setState(!state);
          }}
          sx={{
            color: '#FAD390',
          }}
        >
          <BrushIcon />
        </IconButton>
      </Tooltip>
      <Switch checked={state} defaultChecked={state} />
      <Tooltip title="지우개모드">
        <IconButton
          sx={{
            color: '#FAD390',
          }}
          onClick={() => {
            setState(!state);
          }}
        >
          <FontAwesomeIcon icon={faEraser} />
        </IconButton>
      </Tooltip>
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
  const setDrawStatus = useSetRecoilState(atomDrawStatus);

  // 이미지를 눌렀을 떄만 데이터를 받아오게 수정해야함.
  const getDataLake = async (coin: string, time: string) => {
    try {
      const result = await axios.post<dduckddackResponseVO<ICoinChart>>(
        API_DATA_LAKE.GET_CANDLE_DATA,
        {
          coin: coin,
          time: time,
          chartIntervals: '1m',
        }
      );
      if (result.data.status === '0000') {
        let obj: iStBar[] = [];
        const { c, h, l, o, t, v } = result.data.message;
        for (let i = 0; i < t.length; i++) {
          const time = ((t[i] + CONST_KR_UTC) / 1000) as UTCTimestamp;
          obj.push({
            time: time,
            open: o[i],
            high: h[i],
            low: l[i],
            close: c[i],
          });
        }

        return obj;
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setDrawStatus(true);
    const result = userChartData.map((item, index) => {
      return (
        <>
          <SwiperSlide
            key={index}
            className={classNames(`flex justify-center items-center`)}
          >
            <img
              src={`${item.image}`}
              alt={`Chart Draw ${index}`}
              className={classNames(`w-16 h-16 hover:cursor-pointer`)}
              onClick={async () => {
                const stData = await getDataLake(item.coin, item.time);
                setModal({
                  modalState: true,
                  modalType: 'chartImage',
                  modalPayload: {
                    src: item.image,
                    data: stData!,
                  },
                });
              }}
            />
          </SwiperSlide>
        </>
      );
    });
    setDrawStatus(false);
    setDrawResult(result);
  }, [userChartData]);

  return drawResult;
};

const DrawTool = ({
  status,
  onNewButton,
  onDrawButton,
  onErase,
  onUndo,
  onRedo,
  onSave,
}: {
  status: boolean;
  onNewButton: () => void;
  onDrawButton: () => void;
  onErase: () => void;
  onUndo: () => void;
  onRedo: () => void;
  onSave: () => Promise<boolean>;
}) => {
  const [drawStatus, setDrawStatus] = useRecoilState(atomDrawStatus);
  const [config, setDrawConfig] = useRecoilState(atomDrawConfig);
  const [isDraw, setIsDraw] = useState(false);

  const [onColorPannel, setOnColorPannel] = useState(false);
  const [perView, setPerView] = useState(4);
  useEffect(() => {
    const width = document.documentElement.clientWidth;
    if (width < 1450) {
      setPerView(2);
    } else if (width < 1800) {
      setPerView(3);
    }
  }, [document.documentElement.clientWidth]);

  return (
    <MainWrapper
      className={classNames(`h-full w-full`, `mx-auto`, `shadow-2xl`, `grid`)}
      style={{ gridTemplateColumns: '40% 20% 40%', borderRadius: '4rem' }}
    >
      <div className={classNames(`w-full  h-full grid grid-rows-2`)}>
        {/* row1 */}
        <div className={classNames(`w-full grid grid-cols-3 `)}>
          <DrawCommon>
            <DrawToolDrawButton
              onClick={() => {
                setIsDraw(!isDraw);
                onDrawButton();
              }}
            />
          </DrawCommon>

          <DrawCommon>
            <DrawToolSaveCanvas
              onClick={() => {
                setDrawStatus(true);
                onSave && onSave();
              }}
              isDraw={isDraw}
            />
          </DrawCommon>

          <DrawCommon>
            <div
              className={classNames(
                `h-1/2 w-3/4 m-2`,
                `flex justify-center items-center`
              )}
            >
              <DrawToolRedoButton onClick={onRedo} isDraw={isDraw} />
              <DrawToolUndoButton onClick={onUndo} isDraw={isDraw} />
            </div>
          </DrawCommon>
        </div>

        {/* row2 */}
        <div className={classNames(`w-full grid grid-cols-3`)}>
          <DrawCommon>
            <DrawToolNewCanvas onClick={onNewButton} isDraw={isDraw} />
          </DrawCommon>
          <DrawCommon className={classNames(`col-span-2`)}>
            <DrawToolEraseButton onClick={onErase} isDraw={isDraw} />
          </DrawCommon>
        </div>
      </div>
      {/* 스트로크 */}
      <div className={classNames(`flex flex-col justify-center`)}>
        <div>
          <span
            className={classNames(
              `flex justify-between items-center`,
              `text-bithumbYellow`,
              `xl:text-xs`
            )}
          >
            Pen Stroke & Color
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
              {config.penStroke}px
            </div>
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
          <span
            className={classNames(
              `text-bithumbYellow`,
              `flex justify-between items-center`,
              `xl:text-xs`
            )}
          >
            Erase Stroke
            <div>{config.eraseStroke}px</div>
          </span>
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
      <div className={classNames(`max-w-lg relative`)}>
        <Swiper
          modules={[Navigation, Pagination, Scrollbar]}
          onSwiper={(e) => {}}
          className={classNames(`h-full px-10 `)}
          slidesPerView={perView}
          navigation
        >
          {ImgItem()}
        </Swiper>

        {drawStatus && (
          <div
            className={classNames(
              `z-50`,
              `absolute`,
              `w-full h-full`,
              `bg-nightBlack`,
              `left-0 top-0`
            )}
          >
            <LottieDiv
              className={classNames(`w-full h-full`)}
              jsonData={LOADING_ATOM}
              loop
            />
          </div>
        )}
      </div>
    </MainWrapper>
  );
};

export default DrawTool;
