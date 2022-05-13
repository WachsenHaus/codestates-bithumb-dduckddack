import { Modal } from '@mui/material';
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
        `fixed w-full h-full`,
        `flex justify-center items-center`,
        modal.modalState ? `visible` : `invisible`
      )}
      style={{
        zIndex: 9999,
      }}
    >
      <div
        className={classNames(
          `h-5/6`,
          `p-10`,
          // `h-5/6 w-7/12`,
          `bg-slate-300`,
          `rounded-2xl shadow-xl`,
          `shadow-xl`,
          `flex justify-center`
        )}
      >
        {modal.modalType === 'sign' && <div> adsf</div>}
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
        )}

        <div
          // className={classNames(
          //   modal.modalType === 'chartImage' ? 'visible' : 'invisible'
          // )}
          className={classNames(`flex justify-center items-center`)}
        >
          <div>
            <img
              alt="modal_img"
              src={payload?.src}
              className={classNames(`w-full h-full`)}
            />
          </div>
          <div className={classNames(`w-full h-full`)} ref={wrapperRef} />
        </div>
      </div>
    </div>
  );
};

export default SignModal;
