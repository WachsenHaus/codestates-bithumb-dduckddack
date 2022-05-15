import { Avatar } from '@mui/material';
import classNames from 'classnames';
import { useRecoilState, useRecoilValue } from 'recoil';
import { atomUserInfo } from '../../atom/user.atom';
import { Popper } from '@mui/material';
import { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import CONST_ROUTE from '../../Routes';

const AvatarWrapper = () => {
  const [userInfo, setUserInfo] = useRecoilState(atomUserInfo);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  const [open, isOpen] = useState(false);
  return (
    <div
      ref={containerRef}
      onClick={() => {
        isOpen(!open);
      }}
      className={classNames(`hover:cursor-pointer`)}
    >
      <Avatar
        className={classNames(`shadow-2xl mr-10`)}
        alt={userInfo.userInfo?.nickName}
        src=""
      />
      <Popper open={open} anchorEl={containerRef.current}>
        <AnimatePresence>
          {open && (
            <motion.div
              className={classNames(
                `bg-bithumbGray font-bmjua`,
                `-translate-x-10`,
                `w-36 h-36`,
                `flex flex-col  items-center`,
                `hover:cursor-pointer`
              )}
              initial={{
                opacity: 0,
              }}
              transition={{ type: 'spring', stiffness: 100 }}
              animate={{
                opacity: 1,
              }}
            >
              <div
                className={classNames(
                  `flex-1 flex justify-center items-center w-full`,
                  `bg-slate-700`
                )}
                onClick={() => {
                  // 마이페이지로 이동
                  navigate(CONST_ROUTE.MY);
                }}
              >
                마이페이지
              </div>
              <div
                className={classNames(
                  `flex-1 flex justify-center items-center w-full`
                )}
                onClick={() => {
                  localStorage.clear();
                  navigate(CONST_ROUTE.HOME);
                  setUserInfo({});
                }}
              >
                로그아웃
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Popper>
    </div>
  );
};

export default AvatarWrapper;
