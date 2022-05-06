import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { atomModalState } from '../../atom/modal.atom';

const HeaderSignIn = () => {
  const setModal = useSetRecoilState(atomModalState);
  const navigate = useNavigate();

  return (
    <>
      <div
        className={classNames(`hover:scale-105 hover:cursor-pointer`, `mr-5`)}
        onClick={() => {
          navigate('/user');
          //   setModal({
          //     modalState: true,
          //     modalType: 'sign',
          //   });
        }}
      >
        SignIn
      </div>
    </>
  );
};

export default HeaderSignIn;
