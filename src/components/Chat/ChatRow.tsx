import { Avatar } from '@mui/material';
import classNames from 'classnames';
import moment from 'moment';
import React from 'react';
import { useRef, useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { atomModalState } from '../../atom/modal.atom';

const ChatContent = ({ message }: { message?: string }) => {
  const [type, setType] = useState<'img' | 'text'>('text');
  const [imagePath, setImagePath] = useState('');
  const setModal = useSetRecoilState(atomModalState);

  useEffect(() => {
    if (message?.includes('chatimg')) {
      setImagePath(message?.split('chatimg:')[1]);
      setType('img');
    } else {
      setType('text');
    }
  }, [message]);

  return (
    <>
      {type === 'img' && (
        <img
          src={imagePath}
          alt={'chart_img'}
          className={classNames('w-10 h-10 hover:cursor-pointer')}
          onClick={() => {
            setModal({
              modalType: 'image',
              modalState: true,
              modalPayload: imagePath,
            });
          }}
        />
      )}
      {type === 'text' && <span className={classNames(`ml-5`)}>{message}</span>}
    </>
  );
};

const ChatRow = ({
  index,
  lastLength,
  username,
  avatar,
  message,
  timestamp,
  roomId,
}: {
  index?: number;
  lastLength?: number;
  username?: string;
  avatar?: string;
  message?: string;
  roomId?: string;
  timestamp?: number;
}) => {
  const scrollRef = useRef<HTMLLIElement>(null);
  useEffect(() => {
    if (lastLength && scrollRef && index === lastLength - 1) {
      scrollRef?.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'nearest',
      });
    }
  }, [index, lastLength]);

  //chatimg:https://images.unsplash.com/photo-1651978595428-b79169f223a5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80
  useEffect(() => {
    if (message?.includes('chatimg')) {
      // console.log('사진인데?');
    } else {
      // console.log('글인데?');
    }
  }, [message]);

  return (
    <li
      className={classNames(
        `flex justify-start items-center text-bithumb`,
        `px-10 py-2`
      )}
      ref={scrollRef}
    >
      <Avatar
        className={classNames(`shadow-2xl`)}
        alt={username}
        src={avatar}
      />
      <span className={classNames(`ml-5`)}>
        ({roomId}){username} :{' '}
      </span>
      <ChatContent message={message} />
      {/* <span className={classNames(`ml-5`)}>{message}</span> */}
      <span className={classNames(``)}>
        {moment(timestamp).format('HH:mm')}
      </span>
    </li>
  );
};
export default React.memo(ChatRow);
