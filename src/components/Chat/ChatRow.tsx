import { Avatar } from '@mui/material';
import classNames from 'classnames';
import moment from 'moment';
import React from 'react';
import { useRef, useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { atomModalState } from '../../atom/modal.atom';
import { atomUserInfo } from '../../atom/user.atom';

const ChatContent = ({
  message,
  className,
}: {
  message?: string;
  className?: string;
}) => {
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
          className={classNames(
            'w-24 h-10 hover:cursor-pointer',
            className,
            `bg-nightBlack`
          )}
          onClick={() => {
            console.log('네');
            setModal({
              modalType: 'image',
              modalState: true,
              modalPayload: imagePath,
            });
          }}
        />
      )}
      {type === 'text' && (
        <span className={classNames(`ml-5`, className)}>{message}</span>
      )}
    </>
  );
};

const TimeSpan = ({ timestamp }: { timestamp?: number }) => {
  return (
    <span className={classNames(`flex-grow-0 text-xss`)}>
      {moment(timestamp).utc(true).format('MM-DD / HH:mm')}
    </span>
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
  userId,
  type,
}: {
  index?: number;
  lastLength?: number;
  username?: string;
  avatar?: string;
  message?: string;
  roomId?: string;
  timestamp?: number;
  userId?: string;
  type?: 'ALL' | 'SELECT';
}) => {
  const userInfo = useRecoilValue(atomUserInfo);

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

  return userInfo.userInfo?.id === userId ? (
    <>
      <li
        className={classNames(
          `w-full`,
          `flex justify-end items-center text-red-50`,
          `px-10 py-2`,
          `flex-1`
        )}
        ref={scrollRef}
      >
        <TimeSpan timestamp={timestamp} />
        <ChatContent
          className={classNames(
            `flex-grow-0`,
            `bg-bithumbSubGray rounded-2xl px-4`,
            `text-black`,
            `mx-2`
          )}
          message={message}
        />
      </li>
    </>
  ) : (
    <li
      className={classNames(
        `w-full`,
        `flex justify-start items-center text-bithumb`,
        `px-10 py-2`,
        `flex-1`
      )}
      ref={scrollRef}
    >
      <Avatar
        className={classNames(`shadow-2xl`)}
        alt={username}
        src={avatar}
      />
      <span className={classNames(`ml-2`)}>
        {type === 'ALL' ? `(${roomId}):${username} : ` : `${username} : `}
      </span>

      <ChatContent
        className={classNames(
          `flex-grow-0`,
          `bg-bithumbYellow rounded-2xl px-4`,
          `text-black`,
          `mx-2`
        )}
        message={message}
      />
      <TimeSpan timestamp={timestamp} />
    </li>
  );
};
export default React.memo(ChatRow);
