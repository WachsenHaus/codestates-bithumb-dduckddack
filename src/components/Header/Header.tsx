import { AppBar, Box, Toolbar } from '@mui/material';
import classNames from 'classnames';
import { motion } from 'framer-motion';
import React, { useEffect } from 'react';
import LOGO from '../../asset/img/header.png';
import CI from '../../asset/img/sp_main_new.png';
import bg_main from '../../asset/img/bg_main.png';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AvatarWrapper from '../Avatar/AvatarWrapper';
import HeaderSignIn from './HeaderSignIn';
import HeaderNavTab from './HeaderNavTab';
import { useRecoilValue } from 'recoil';
import { atomUserInfo } from '../../atom/user.atom';
import CONST_ROUTE from '../../Routes';

const Header = () => {
  const navigate = useNavigate();
  const userInfo = useRecoilValue(atomUserInfo);

  // 로그인된 사용자 정보를 가져온다.
  return (
    <AppBar
      position="static"
      sx={{
        backgroundImage: `url(${bg_main})`,
        backgroundColor: 'transparent',
        zIndex: 99,
        borderBottom: '1px',
      }}
      className={classNames(`shadow-2xl`)}
    >
      <Toolbar>
        <motion.div
          whileHover={{
            scaleX: 0.9,
          }}
          className={classNames(`w-full h-full bg-no-repeat ml-4`)}
          style={{
            width: '179px',
            height: '52px',
            flexGrow: 0,
            backgroundImage: `url(${LOGO})`,
          }}
          onClick={() => {
            navigate(CONST_ROUTE.HOME);
          }}
        />
        <Box>
          <HeaderNavTab />
        </Box>

        <Box className={'absolute right-0 flex-grow'}>
          {userInfo.accessToken ? <AvatarWrapper /> : <HeaderSignIn />}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default React.memo(Header);
