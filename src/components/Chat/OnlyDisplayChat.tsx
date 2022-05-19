import { Avatar } from '@mui/material';
import classNames from 'classnames';
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import {
  atomChatRecvChatMessage,
  atomChatWebSocket,
} from '../../atom/chat.atom';
import LottieDiv from '../Common/LottieDiv';
import MainWrapper from '../Common/MainWrapper';
import ChatRow from './ChatRow';
import LoadingJSON from '../../asset/img/loading.json';
import { motion } from 'framer-motion';

const OnlyDisplayChat = ({ className }: { className?: string }) => {
  const chatMsg = useRecoilValue(atomChatRecvChatMessage);
  const wsChat = useRecoilValue(atomChatWebSocket);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current?.scrollHeight;
    }
  }, [chatMsg]);
  return (
    <motion.div
      transition={{
        delay: 1.2,
        x: { type: 'spring', stiffness: 100 },
        default: { duration: 1 },
      }}
      initial={{
        scale: 0,
        opacity: 0,
        translateX: '100%',
      }}
      animate={{
        scale: 1,
        opacity: 1,
        translateX: 0,
      }}
      className={classNames(`${className}`)}
    >
      <MainWrapper
        className={classNames(
          `w-full h-full grid grid-rows-1`,
          `flex items-center`
        )}
      >
        <div
          ref={scrollRef}
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
                  type="ALL"
                  // key={item.id || index}
                  key={`${item.timestamp}_${item.id}`}
                  userId={item.payload?.user.userId}
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
    </motion.div>
  );
};
export default OnlyDisplayChat;
