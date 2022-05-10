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

  useEffect(() => {
    if (message?.includes('chatimg')) {
      // chatimg:https://www.google.com/imgres?imgurl=https%3A%2F%2Fcdn.pixabay.com%2Fphoto%2F2014%2F09%2F21%2F14%2F39%2Fsurface-455124__480.jpg&imgrefurl=https%3A%2F%2Fpixabay.com%2Fko%2Fimages%2Fsearch%2F%25EB%25B9%2584%2F&tbnid=YTFoYOX0Qu2vSM&vet=12ahUKEwiLmObtq9X3AhVmTPUHHTqdBV8QMygCegUIARDJAQ..i&docid=3t2BMyjwVXQjaM&w=826&h=480&q=%EC%9D%B4%EB%AF%B8%EC%A7%80&ved=2ahUKEwiLmObtq9X3AhVmTPUHHTqdBV8QMygCegUIARDJAQ
      console.log('사진인데?');
    } else {
      console.log('글인데?');
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
