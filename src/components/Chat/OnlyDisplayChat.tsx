import { Avatar } from '@mui/material';
import classNames from 'classnames';
import moment from 'moment';
import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { atomChatRecvChatMessage } from '../../atom/chat.atom';
import MainWrapper from '../Common/MainWrapper';
import ChatRow from './ChatRow';

const OnlyDisplayChat = ({ className }: { className?: string }) => {
  const chatMsg = useRecoilValue(atomChatRecvChatMessage);

  return (
    <div
      className={classNames(
        `${className}`,
        `h-full`,
        `flex justify-center items-center`
      )}
    >
      <MainWrapper className={classNames(`w-full h-5/6 py-10`)}>
        <div
          className={classNames(
            `scrollbar-hide overflow-auto h-[45rem] max-h-[100%]`
          )}
        >
          {chatMsg &&
            chatMsg?.map((item, index) => {
              return (
                <ChatRow
                  // key={item.id || index}
                  index={index}
                  lastLength={chatMsg?.length}
                  username={item.payload?.user.username}
                  avatar={item.payload?.user.avatar}
                  message={item.payload?.message}
                  roomId={item.payload?.roomId}
                />
              );
            })}
        </div>
      </MainWrapper>
    </div>
  );
};
export default OnlyDisplayChat;
