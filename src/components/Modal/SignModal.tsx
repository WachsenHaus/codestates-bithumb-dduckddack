import { Modal } from '@mui/material';
import classNames from 'classnames';
import { useRecoilState } from 'recoil';
import { atomModalState } from '../../atom/modal.atom';

const SignModal = () => {
  const [modal, setModal] = useRecoilState(atomModalState);

  return (
    <Modal
      open={modal.modalState}
      onClose={() => {
        setModal({
          modalState: false,
          modalType: 'sign',
        });
      }}
      className={classNames(`flex justify-center items-center`)}
      style={{
        zIndex: 9999,
      }}
    >
      <div
        className={classNames(
          `h-5/6 w-7/12`,
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
                src={modal.modalPayload}
                className={classNames(`w-full h-full`)}
              />
            )}
          </div>
        )}
      </div>
    </Modal>
  );
};

export default SignModal;
