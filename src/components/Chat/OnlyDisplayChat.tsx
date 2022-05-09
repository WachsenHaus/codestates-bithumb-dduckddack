import classNames from 'classnames';
import React from 'react';
import MainWrapper from '../Common/MainWrapper';

const OnlyDisplayChat = ({ className }: { className?: string }) => {
  return (
    <div
      className={classNames(
        `${className}`,
        `h-full`,
        `flex justify-center items-center`
      )}
    >
      <MainWrapper className={classNames(`w-full h-5/6`)}>채팅창</MainWrapper>
    </div>
  );
};
export default OnlyDisplayChat;
