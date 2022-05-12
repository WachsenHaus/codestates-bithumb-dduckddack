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
    <div className={classNames(`${className}`)}>
      <MainWrapper
        className={classNames(
          `w-full h-full grid grid-rows-1`,
          `flex items-center`
        )}
      >
        <div
          className={classNames(
            `py-2`,
            `h-[40rem] max-h-[95%]`,
            `scrollbar-hide overflow-auto`
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
