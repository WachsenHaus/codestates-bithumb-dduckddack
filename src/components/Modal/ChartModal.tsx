import { Button } from '@mui/material';
import classNames from 'classnames';
import stringify from 'fast-json-stable-stringify';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { atomChatWebSocket } from '../../atom/chat.atom';
import { atomModalState, TypeChartImg } from '../../atom/modal.atom';
import { atomSelectCoinDefault } from '../../atom/selectCoinDefault.atom';
import { atomUserInfo } from '../../atom/user.atom';
import { TypeWebSocketChatSend } from '../../atom/ws.type';
import useGenerateChart from '../../hooks/useGenerateChart';
import LOADING_ATOM from '../../asset/img/loading_atom.json';
import LottieDiv from '../Common/LottieDiv';

const ChartModal = () => {
  const [modal, setModal] = useRecoilState(atomModalState);
  const wsChat = useRecoilValue(atomChatWebSocket);
  const userInfo = useRecoilValue(atomUserInfo);
  const selectCoin = useRecoilValue(atomSelectCoinDefault);
  const [payload, setPayload] = useState<any | TypeChartImg | string>();
  const [wrapperRef, candleRef, chartRef] = useGenerateChart();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (modal.modalType === 'chartImage') {
      setIsLoading(true);
      const result = modal.modalPayload as TypeChartImg;
      if (result === undefined) {
        candleRef.current?.setData([]);
        return;
      }
      const chartData = result?.data;
      if (chartData.length === 0) {
        setIsLoading(true);
        return;
      }
      candleRef.current?.setData(chartData);

      setPayload(result);
      setIsLoading(false);
    }
  }, [modal, modal.modalPayload]);

  return (
    <div
      data-name="modal"
      onClick={(e) => {
        const curT = e.target as HTMLElement;
        if (curT.dataset.name === 'modal') {
          setModal({
            modalState: false,
            modalType: 'chartImage',
            modalPayload: undefined,
          });
        }
      }}
      className={classNames(
        `fixed w-screen h-screen`,
        `bg-black bg-opacity-90`,
        modal.modalState && modal.modalType === 'chartImage'
          ? `visible`
          : `invisible`,
        `flex items-center justify-center`
      )}
      style={{
        zIndex: 9999,
      }}
    >
      <div
        className={classNames(
          `p-10`,
          `h-1/2 w-2/3`,
          `bg-slate-300`,
          `rounded-2xl shadow-xl`,
          `shadow-xl`,
          `flex justify-center`
        )}
      >
        <div
          className={classNames(
            `w-5/6 grid grid-cols-2 grid-rows-1 content-around gap-x-5`
          )}
        >
          <div className={classNames(`w-full`, `relative`)}>
            <img
              className={classNames(`h-full`)}
              alt="modal_img"
              src={payload?.src}
            />
            <Button
              variant="contained"
              color="secondary"
              className={classNames(`left-1/2`, `absolute -translate-x-1/2`)}
              onClick={() => {
                const data: TypeWebSocketChatSend = {
                  type: 'CHAT_MESSAGE',
                  payload: {
                    roomId: selectCoin.coinName || '비트코인',
                    user: {
                      username: userInfo?.userInfo?.nickName || '익명',
                      avatar: '',
                      userId: userInfo?.userInfo?.id?.toString() || '1',
                    },
                    message: `chatimg:${payload.src}`,
                  },
                };

                const sendData = stringify(data);
                wsChat?.send(sendData);
                setModal({
                  modalState: false,
                  modalType: 'chartImage',
                  modalPayload: undefined,
                });
              }}
            >
              공유하기
            </Button>
          </div>
          <div className={classNames(`w-full h-full relative`)}>
            <div className={classNames(`w-full h-full`)} ref={wrapperRef} />
            {isLoading && (
              <LottieDiv
                className={classNames(`w-full h-full left-0 top-0 z-50`)}
                position="absolute"
                loop
                jsonData={LOADING_ATOM}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartModal;
