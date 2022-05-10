import classNames from 'classnames';
import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { atomChatRecvChatMessage } from '../../atom/chat.atom';
import MainWrapper from '../Common/MainWrapper';

const OnlyDisplayChat = ({ className }: { className?: string }) => {
  const chatMsg = useRecoilValue(atomChatRecvChatMessage);

  const [chats, setChats] = useState();

  return (
    <div className={classNames(`${className}`, `h-full`, `flex justify-center items-center`)}>
      <MainWrapper className={classNames(`w-full h-5/6`)}> {chatMsg.payload?.message}</MainWrapper>
    </div>
  );
};
export default OnlyDisplayChat;
