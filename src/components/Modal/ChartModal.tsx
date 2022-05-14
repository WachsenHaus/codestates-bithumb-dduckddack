import { Button, Modal } from '@mui/material';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { atomModalState, TypeChartImg } from '../../atom/modal.atom';
import { iStBar } from '../../atom/tvChart.atom';
import useGenerateChart from '../../hooks/useGenerateChart';

const SignModal = () => {
  const [modal, setModal] = useRecoilState(atomModalState);

  const [payload, setPayload] = useState<any | TypeChartImg | string>();
  const [wrapperRef, candleRef, chartRef] = useGenerateChart();

  useEffect(() => {
    if (modal.modalType === 'chartImage') {
      const result = modal.modalPayload as TypeChartImg;
      if (result === undefined) {
        candleRef.current?.setData([]);
        return;
      }
      const chartData = result?.data;
      // console.log(candleRef);
      candleRef.current?.setData(chartData);
      console.log(chartData);
      setPayload(result);
    }
  }, [modal, modal.modalPayload]);

  useEffect(() => {}, []);

  return (
    <div
      // onClose={() => {
      //   setModal({
      //     modalState: false,
      //     modalType: 'sign',
      //   });
      // }}
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
        console.log(curT);
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
        {/* {modal.modalType === 'sign' && <div> adsf</div>}
        {modal.modalType === 'image' && (
          <div>
            {modal.modalPayload && (
              <img
                alt="modal_img"
                src={modal.modalPayload as string}
                className={classNames(`w-full h-full`)}
              />
            )}
          </div>
        )} */}

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
            >
              공유하기
            </Button>
          </div>
          <div className={classNames(`w-full`)} ref={wrapperRef} />
        </div>
      </div>
    </div>
  );
};

export default SignModal;
