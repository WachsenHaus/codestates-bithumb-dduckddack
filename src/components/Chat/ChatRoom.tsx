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
import { useEffect, useRef, useState } from 'react';
import ChatRow from './ChatRow';
import {
  TypeWebSocketChatMessageRecv,
  TypeWebSocketChatSend,
} from './../../atom/ws.type';
import stringify from 'fast-json-stable-stringify';
import { atomSelectCoinDefault } from '../../atom/selectCoinDefault.atom';
import useSetDefaultCoin from '../../hooks/useSetDefaultCoin';

const ChatRoom = () => {
  useSetDefaultCoin();
  const chatMsg = useRecoilValue(atomChatRecvChatMessage);
  const wsChat = useRecoilValue(atomChatWebSocket);
  const userInfo = useRecoilValue(atomUserInfo);
  const selectCoin = useRecoilValue(atomSelectCoinDefault);
  const [keyword, setKeyword] = useState('');
  const chatWrapper = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (chatWrapper.current) {
      chatWrapper.current.scrollTop = 9999;
    }
  }, [chatWrapper, chatMsg]);
  return (
    <div className={classNames(`h-full`, `flex justify-center items-center`)}>
      <MainWrapper
        className={classNames(`w-full h-full grid`)}
        style={{
          gridTemplateRows: '90% auto',
        }}
      >
        <div
          ref={chatWrapper}
          className={classNames(`overflow-auto `)}
          style={{
            height: '40rem',
            maxHeight: '100%',
          }}
        >
          {chatMsg &&
            chatMsg.map((item, index) => {
              return item.payload?.roomId === selectCoin.coinName ? (
                <ChatRow
                  type="SELECT"
                  key={`${item.timestamp}_${item.id}`}
                  index={index}
                  lastLength={chatMsg?.length}
                  username={item.payload?.user.username}
                  userId={item.payload?.user.userId}
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
          disabled={userInfo.userInfo === undefined ? true : false}
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
                    avatar: userInfo.userInfo?.imagePath || '',
                    userId: userInfo?.userInfo?.id?.toString() || '1',
                  },
                  message: keyword,
                },
              };

              const sendData = stringify(data);
              wsChat?.send(sendData);
              setKeyword('');
            }
          }}
          placeholder={`${
            userInfo.userInfo === undefined ? '로그인 후 이용가능합니다.' : ''
          }`}
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
