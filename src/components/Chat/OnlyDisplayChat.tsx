import { Avatar } from '@mui/material';
import classNames from 'classnames';
import moment from 'moment';
import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import {
  atomChatRecvChatMessage,
  atomChatWebSocket,
} from '../../atom/chat.atom';
import LottieDiv from '../Common/LottieDiv';
import MainWrapper from '../Common/MainWrapper';
import ChatRow from './ChatRow';
import LoadingJSON from '../../asset/img/loading.json';

const OnlyDisplayChat = ({ className }: { className?: string }) => {
  const chatMsg = useRecoilValue(atomChatRecvChatMessage);
  const wsChat = useRecoilValue(atomChatWebSocket);

  return (
    <div className={classNames(`${className}`)}>
      <MainWrapper
        className={classNames(
          `w-full h-full grid grid-rows-1`,
          `flex items-center`
        )}
      >
        <div
          className={classNames(`py-2`, `overflow-auto`)}
          style={{
            height: '40rem',
            maxHeight: '95%',
          }}
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
                  timestamp={item.timestamp}
                />
              );
            })}
          {wsChat === undefined && (
            <div
              className={classNames(`h-full flex justify-center items-center`)}
            >
              <LottieDiv loop jsonData={LoadingJSON} />
            </div>
          )}
        </div>
      </MainWrapper>
    </div>
  );
};
export default OnlyDisplayChat;
