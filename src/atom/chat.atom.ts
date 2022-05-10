import {
  TypeWebSocketChatSend,
  TypeWebSocketChatMessageRecv,
  TypeWebSocketChatUserJoinedRecv,
  TypeWebSocketChatUserLeftRecv,
  TypeWebSocketChatUserStatsdRecv,
} from './ws.type';
import { atom } from 'recoil';

export const atomChatSender = atom<TypeWebSocketChatSend>({
  key: 'atomChatSender',
  default: {},
});

// export const atomChatReceiv = atom<TypeWebSocketChatReceive>({
//   key: 'atomChatReceiv',
//   default: {},
// });

export const atomChatRecvChatMessage = atom<TypeWebSocketChatMessageRecv[]>({
  key: 'atomChatRecvChatMessage',
  default: [],
});
export const atomChatRecvChatUserLeft = atom<TypeWebSocketChatUserLeftRecv[]>({
  key: 'atomChatRecvChatUserLeft',
  default: [],
});
export const atomChatRecvChatUserJoin = atom<TypeWebSocketChatUserJoinedRecv[]>(
  {
    key: 'atomChatRecvChatUserJoin',
    default: [],
  }
);
export const atomChatRecvChatUserStats = atom<
  TypeWebSocketChatUserStatsdRecv[]
>({
  key: 'atomChatRecvChatUserStats',
  default: [],
});

export const atomChatWebSocket = atom<WebSocket | undefined>({
  key: 'atomChatWebSocket',
  default: undefined,
});
