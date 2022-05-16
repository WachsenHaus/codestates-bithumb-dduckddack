import { InputAdornment, TextField } from '@mui/material';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import classNames from 'classnames';
import { useRecoilValue } from 'recoil';
import {
  atomChatRecvChatMessage,
  atomChatWebSocket,
} from '../../atom/chat.atom';
import { atomUserInfo } from '../../atom/user.atom';
import MainWrapper from '../Common/MainWrapper';
import { useState } from 'react';
import ChatRow from './ChatRow';
import { TypeWebSocketChatSend } from './../../atom/ws.type';
import stringify from 'fast-json-stable-stringify';
import { atomSelectCoinDefault } from '../../atom/selectCoinDefault.atom';

const ChatRoom = () => {
  const chatMsg = useRecoilValue(atomChatRecvChatMessage);
  const wsChat = useRecoilValue(atomChatWebSocket);
  const userInfo = useRecoilValue(atomUserInfo);
  const selectCoin = useRecoilValue(atomSelectCoinDefault);
  const [keyword, setKeyword] = useState('');

  return (
    <div className={classNames(`h-full`, `flex justify-center items-center`)}>
      <MainWrapper
        className={classNames(`w-full h-full grid`)}
        style={{
          gridTemplateRows: '90% auto',
        }}
      >
        <div
          className={classNames(`scrollbar-hide overflow-auto `)}
          style={{
            height: '40rem',
            maxHeight: '100%',
          }}
        >
          {chatMsg &&
            chatMsg?.map((item, index) => {
              return item.payload?.roomId === selectCoin.coinName ? (
                <ChatRow
                  key={`${item.timestamp}_${item.id}`}
                  index={index}
                  lastLength={chatMsg?.length}
                  username={item.payload?.user.username}
                  avatar={item.payload?.user.avatar}
                  message={item.payload?.message}
                  roomId={item.payload?.roomId}
                  timestamp={item.timestamp}
                />
              ) : (
                <></>
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
                  roomId: selectCoin.coinName || '비트코인',
                  user: {
                    username: userInfo?.userInfo?.nickName || '익명',
                    avatar: '',
                  },
                  message: keyword,
                },
              };

              const sendData = stringify(data);
              wsChat?.send(sendData);
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
          }}
        />
      </MainWrapper>
    </div>
  );
};

export default ChatRoom;
