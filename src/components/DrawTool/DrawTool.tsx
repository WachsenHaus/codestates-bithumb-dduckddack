import { Slider } from '@mui/material';
import classNames from 'classnames';
import { ReactNode, useEffect, useState } from 'react';
import MainWrapper from '../Common/MainWrapper';
import SwiperCore, { Autoplay, Pagination, Navigation, Virtual } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { atomModalState } from '../../atom/modal.atom';
import { HexColorPicker } from 'react-colorful';
import { atomDrawConfig } from '../../atom/drawConfig.atom';
import { atomUserChartDatas } from '../../atom/user.atom';

SwiperCore.use([Autoplay, Navigation]);

const SubWrapper = ({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick?: () => void;
}) => {
  return (
    <div
      className={classNames(
        `bg-bithumbSubGray bg-opacity-20 text-bithumbYellow`,
        `h-1/2 w-3/4 m-2`,
        'flex justify-center items-center',
        `rounded-3xl`,
        `filter drop-shadow-3xl`,
        `hover:cursor-pointer`
        // `shadow-2xl`
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

const DrawToolNewCanvas = ({ onClick }: { onClick: () => void }) => {
  return <SubWrapper onClick={onClick}>새로운 도화지</SubWrapper>;
};
const DrawToolDrawButton = ({ onClick }: { onClick: () => void }) => {
  return <SubWrapper onClick={onClick}>그리기버튼</SubWrapper>;
};

const DrawToolSaveCanvas = ({ onClick }: { onClick: () => void }) => {
  return <SubWrapper onClick={onClick}>저장하기</SubWrapper>;
};
const DrawToolShareCanvas = () => {
  return <SubWrapper>공유하기</SubWrapper>;
};

const DrawToolEraseButton = ({ onClick }: { onClick: () => void }) => {
  const [state, setState] = useState(false);
  return (
    <SubWrapper
      onClick={() => {
        setState(!state);
        onClick();
      }}
    >
      {state ? '지우개' : '펜'}
    </SubWrapper>
  );
};

const DrawToolRedoButton = ({ onClick }: { onClick: () => void }) => {
  return <SubWrapper onClick={onClick}>앞</SubWrapper>;
};

const DrawToolUndoButton = ({ onClick }: { onClick: () => void }) => {
  return <SubWrapper onClick={onClick}>뒤</SubWrapper>;
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
    console.log(result);
    setDrawResult(result);
  }, [userChartData]);
  console.log(userChartData);
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

  const [onColorPannel, setOnColorPannel] = useState(false);

  return (
    <MainWrapper
      className={classNames(
        `h-full w-full`,
        `mx-auto`,
        `grid grid-cols-[40%_20%_40%]`,
        `rounded-[4rem]`,
        `shadow-2xl`
      )}
    >
      <div className={classNames(`w-full  h-full grid grid-cols-3`)}>
        {/* col1 */}
        <div className={classNames(`flex  flex-col items-center h-full`)}>
          <DrawToolNewCanvas onClick={onNewButton} />
          <DrawToolDrawButton onClick={onDrawButton} />
        </div>
        {/* col2 */}
        <div className={classNames(`flex  flex-col items-center  h-full`)}>
          <DrawToolSaveCanvas onClick={onSave} />
          <DrawToolEraseButton onClick={onErase} />
        </div>
        {/* col3 */}
        <div className={classNames(`flex flex-col items-center  h-full`)}>
          <DrawToolShareCanvas />
          <div
            className={classNames(
              `h-1/2 w-3/4 m-2`,
              `flex justify-center items-center`
            )}
          >
            <DrawToolRedoButton onClick={onRedo} />
            <DrawToolUndoButton onClick={onUndo} />
          </div>
        </div>
      </div>
      {/* 스트로크 */}
      <div>
        <div>
          <span>
            펜
            <div
              className={classNames(`relative hover:cursor-pointer`)}
              onClick={() => {
                setOnColorPannel(!onColorPannel);
              }}
            >
              컬러판
              {onColorPannel && (
                <HexColorPicker
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
              )}
            </div>
          </span>
          <Slider
            about=""
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
          <span>지우개</span>
          <Slider
            about=""
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
          modules={[Virtual]}
          virtual
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
