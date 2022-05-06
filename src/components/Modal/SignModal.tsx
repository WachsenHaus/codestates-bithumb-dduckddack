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
      className={classNames(`flex justify-center items-center `)}
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
        adsf
      </div>
    </Modal>
  );
};

export default SignModal;
