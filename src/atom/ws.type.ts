import { TypeCoinKind } from './coinList.type';

export type TypeWebSocketTypes = 'SUBSCRIBE' | 'CHAT';

/**
 * tr : 트랜잭션
 * tk : 티커
 * st : 캔들스틱
 */
export type TypeWebSocketDetailTypes = 'tr' | 'tk' | 'st';

export type TypeWebSocketDetailObj = {
  filters: string[];
  type: TypeWebSocketDetailTypes;
};

/**
 * 빗썸의 웹소켓 리턴타입
 */
export type TypeWebSocketSubscribeReturnType = {
  type: string;
  subtype: TypeWebSocketDetailTypes;
  content: any;
};

export interface IWebSocketSubscribeMessage {
  events: TypeWebSocketDetailObj[];
  type: TypeWebSocketTypes;
}

export type TypeWebSocketTickerReturnType = {
  a?: string; //변화금액
  c?: string; //코인번호
  e?: string; //현재가
  f?: string; //f전일가
  h?: string; //고가(당일)
  k?: string; //MID
  l?: string; //저가(당일)
  m?: string; //원화코인
  o?: string; //?시작가로 추정됨
  r?: string; //변동률(퍼센트)
  u?: string; //거래금액
  u24?: string; //24시간 거래금액
  v?: string; //거래량
  v24?: string; //24시간 거래량
  w?: string; // 모르겠음
};

export type TypeWebSocketTransactionReturnType = {
  m: TypeCoinKind;
  c: string;
  l: Array<{
    o: string;
    n: string;
    p: string;
    q: string;
    t: string;
  }>;
};

export type TypeChatUser = {
  username: string;
  userId: string;
  avatar: string;
};
export type TypeWebSocketChatPayloadType = {
  payload?: {
    roomId: string;
    user: TypeChatUser;
  };
  id?: number;
  timestamp?: number;
};

export type TypeWebSocketChatMessageRecv = {
  type?: 'CHAT_MESSAGE';
  payload?: {
    roomId: string;
    user: TypeChatUser;
    message?: string;
  };
  id?: number;
  timestamp?: number;
};
export type TypeWebSocketChatUserLeftRecv = {
  type?: 'USER_LEFT';
  payload?: {
    roomId: string;
    user: {
      username: string;
      avatar: string;
      userId: string;
    };
  };
  id?: number;
  timestamp?: number;
};
export type TypeWebSocketChatUserJoinedRecv = {
  type?: 'USER_JOINED';
  payload?: {
    roomId: string;
    user: TypeChatUser;
  };
  id?: number;
  timestamp?: number;
};
export type TypeWebSocketChatUserStatsdRecv = {
  type?: 'USER_STATS';
  payload?: {
    roomId: string;
    user: TypeChatUser;
    stats?: {
      [key in string]: {
        user: {
          username: string;
          avatar: string;
        };
        lastMessage: number;
        messageCount: number;
      };
    };
  };
  id?: number;
  timestamp?: number;
};

export type TypeWebSocketChatSend = {
  type?: 'CHAT_MESSAGE' | 'USER_JOINED';
  payload?: {
    roomId: string;
    user: TypeChatUser;
    // userJoined할때만 필요함.
    message?: string;
  };
};

export type TypeWebSocketChatReceive = {
  type?: 'USER_STATS' | 'CHAT_MESSAGE' | 'USER_JOINED' | 'USER_LEFT';
  payload?: {
    roomId: string;
    user: TypeChatUser;
    message?: string;
    stats?: {
      [key in string]: {
        user: TypeChatUser;
        lastMessage: number;
        messageCount: number;
      };
    };
  };
  id?: number;
  timestamp?: number;
};
