import { CompatClient, Stomp } from '@stomp/stompjs';
import axios from 'axios';
import classNames from 'classnames';
import { map } from 'lodash';
import { useEffect, useState } from 'react';
import SockJs from 'sockjs-client';
// import ChartSearch from './ChartSearch';
// import ChatRoomDetail from './ChatRoomDetail';

type TypeChatRoom = {
  roomId: string;
  name: string;
};
const ChatRooms = () => {
  const [rooms, setRooms] = useState<TypeChatRoom[]>();
  const [client, setClient] = useState<CompatClient>();

  useEffect(() => {
    let socket = new SockJs('/chatting/ws-stomp');

    const mClient = Stomp.over(socket);

    mClient.connect(
      {},
      () => {},
      (err: any) => {
        console.log(err);
      }
    );
    setClient(mClient);
  }, []);

  return (
    <div
      className={classNames(
        `h-5/6 w-full`,
        `rounded-3xl bg-white border-2 shadow-xl`,
        `p-10`
      )}
    >
      <div
        onClick={async () => {
          const result = await axios.get<TypeChatRoom[]>('/chatting/rooms');
          console.log(result);
          if (result) {
            setRooms(result.data);
          }
        }}
      >
        채팅방 조회하기
      </div>
      <div>채팅방이 나올 리스트 박스</div>
      채팅방 리스트입니다.
      <div
        onClick={(e) => {
          client?.send(
            '/pub/chat/message',
            {},
            JSON.stringify({
              type: 'TALK',
              roomId: 'e4916e72-fc9e-4c44-9810-864c39338890',
              sender: '국밥',
              message: '국밥먹어요',
            })
          );
        }}
      >
        테스트 문구 전송
      </div>
      <div
        onClick={() => {
          client?.send(
            '/pub/chat/message',
            {},
            JSON.stringify({
              type: 'ENTER',
              roomId: 'e4916e72-fc9e-4c44-9810-864c39338890',
              sender: '국밥',
            })
          );
        }}
      >
        방 입장
      </div>
    </div>
  );
};

export default ChatRooms;
