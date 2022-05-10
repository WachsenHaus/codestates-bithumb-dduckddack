import { Avatar, Input, InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import classNames from 'classnames';
import moment from 'moment';
import { useRecoilValue } from 'recoil';
import {
  atomChatRecvChatMessage,
  atomChatWebSocket,
} from '../../atom/chat.atom';
import { atomUserName } from '../../atom/user.atom';
import MainWrapper from '../Common/MainWrapper';
import { useRef, useEffect, useState } from 'react';
import ChatRow from './ChatRow';
import { TypeWebSocketChatSend } from './../../atom/ws.type';
import stringify from 'fast-json-stable-stringify';

const ChatRoom = () => {
  const chatMsg = useRecoilValue(atomChatRecvChatMessage);
  const wsChat = useRecoilValue(atomChatWebSocket);
  const userName = useRecoilValue(atomUserName);
  const [keyword, setKeyword] = useState('');

  return (
    <div className={classNames(`h-full`, `flex justify-center items-center`)}>
      <MainWrapper
        className={classNames(`w-full h-[90%] grid grid-rows-[90%_auto]`)}
      >
        <div
          className={classNames(
            `scrollbar-hide overflow-auto h-[40rem] max-h-[100%]`
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
        <TextField
          className={classNames(`text-white`)}
          sx={{
            input: {
              color: 'white',
            },
          }}
          onKeyUpCapture={(e) => {
            if (e.key === 'Enter') {
              // 키보드 센드
              if (keyword === '') {
                return;
              }
              const data: TypeWebSocketChatSend = {
                type: 'CHAT_MESSAGE',
                payload: {
                  roomId: '비트코인',
                  user: {
                    username: '홍길동',
                    avatar: '',
                  },
                  // userJoined할때만 필요함.
                  message: keyword,
                },
              };

              const sendData = stringify(data);
              wsChat?.send(sendData);
              console.log(keyword);
              setKeyword('');
            }
          }}
          placeholder=""
          value={keyword}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <BorderColorIcon
                  sx={{
                    color: 'white',
                  }}
                />
              </InputAdornment>
            ),
          }}
          onChange={(e) => {
            if (e.target) {
              setKeyword(e.target.value);
            }
            // console.log(e);
          }}
        />
      </MainWrapper>
    </div>
  );
};

export default ChatRoom;
