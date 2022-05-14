import { Avatar } from '@mui/material';
import classNames from 'classnames';
import { useRecoilValue } from 'recoil';
import { atomUserInfo } from '../../atom/user.atom';

const AvatarWrapper = () => {
  const userInfo = useRecoilValue(atomUserInfo);
  return (
    <>
      <Avatar
        className={classNames(`shadow-2xl mr-10`)}
        alt={userInfo.userInfo?.nickName}
        src=""
      />
    </>
  );
};

export default AvatarWrapper;
