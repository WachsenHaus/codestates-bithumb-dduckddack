import stringify from 'fast-json-stable-stringify';
import parse from 'fast-json-parse';
import React, { useEffect } from 'react';
import _ from 'lodash';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { atomSubscribeWebSocektMessage, atomSubscribeWebSocket } from '../atom/ws.atom';
import { TypeWebSocketChatReceive, TypeWebSocketSubscribeReturnType, TypeWebSocketTypes } from '../atom/ws.type';
import { atomWsStBar } from '../atom/tvChart.atom';
import { atomTickers, atomTransactions, atomWebsocketObj } from '../atom/total.atom';
import { atomChatRecvChatMessage, atomChatRecvChatUserLeft, atomChatRecvChatUserJoin, atomChatRecvChatUserStats } from '../atom/chat.atom';

/**
 *
 * @returns 빗썸 웹소켓과 연결하고 웹소켓 객체를 반환합니다.
 */
export const useGenerateSocket = (type: TypeWebSocketTypes) => {
  const [wsSubscribe, setWsSubscribe] = useRecoilState(atomSubscribeWebSocket);
  const wsMessage = useRecoilValue(atomSubscribeWebSocektMessage);

  const setTickers = useSetRecoilState(atomTickers);
  const setTransactions = useSetRecoilState(atomTransactions);
  const setSt = useSetRecoilState(atomWsStBar);
  const setChatMsg = useSetRecoilState(atomChatRecvChatMessage);
  const setChatUserLeft = useSetRecoilState(atomChatRecvChatUserLeft);
  const setChatUserJoin = useSetRecoilState(atomChatRecvChatUserJoin);
  const setChatUserStats = useSetRecoilState(atomChatRecvChatUserStats);

  const generateOnError: any | null = (type: TypeWebSocketTypes) => (ev: Event) => {
    console.error(`Error WebSocket ${type} ${ev}`);
    console.error(ev);
  };
  const generateOnCloser: any | null = (type: TypeWebSocketTypes) => (ev: CloseEvent) => {
    console.info(`Close WebSocket ${type} ${ev}`);
    console.info(ev);
    setWsSubscribe(undefined);
  };

  const generateOnMessage: any | null = (nameType: TypeWebSocketTypes) => (ev: MessageEvent<TypeWebSocketSubscribeReturnType>) => {
    if (ev) {
      const { subtype, type, content }: TypeWebSocketSubscribeReturnType = parse(ev.data).value;
      switch (nameType) {
        case 'SUBSCRIBE':
          if (type === 'data') {
            if (subtype === 'tk') {
              setTimeout(() => {
                setTickers(content);
              }, 0);
            } else if (subtype === 'st') {
              setTimeout(() => {
                setSt(content);
              }, 0);
            } else if (subtype === 'tr') {
              setTimeout(() => {
                setTransactions(content);
              }, 0);
            }
          }
          break;
        default:
          break;
      }
    }
  };

  const generateOnChatMessage: any | null = (nameType: TypeWebSocketTypes) => (ev: MessageEvent<TypeWebSocketChatReceive>) => {
    if (ev) {
      const recvData: TypeWebSocketChatReceive = parse(ev.data).value;
      console.log(recvData);
      switch (nameType) {
        case 'CHAT':
          switch (recvData.type) {
            case 'CHAT_MESSAGE':
              setTimeout(() => {
                setChatMsg({
                  id: recvData.id,
                  payload: recvData.payload,
                  timestamp: recvData.timestamp,
                });
              }, 0);
              break;
            case 'USER_JOINED':
              setTimeout(() => {
                setChatUserJoin({
                  id: recvData.id,
                  payload: recvData.payload,
                  timestamp: recvData.timestamp,
                });
              }, 0);
              break;
            case 'USER_LEFT':
              setTimeout(() => {
                setChatUserLeft({
                  id: recvData.id,
                  payload: recvData.payload,
                  timestamp: recvData.timestamp,
                });
              }, 0);
              break;
            case 'USER_STATS':
              setTimeout(() => {
                setChatUserStats({
                  id: recvData.id,
                  payload: recvData.payload,
                  timestamp: recvData.timestamp,
                });
              }, 0);
              break;
          }
          break;
        default:
          break;
      }
    }
  };

  const generateOnOpen: any | null = (type: TypeWebSocketTypes, ws: WebSocket) => (ev: Event) => {
    if (ev) {
      console.log(`Connected WebSocket ${type}`);
      switch (type) {
        case 'SUBSCRIBE':
          if (wsSubscribe) {
            wsSubscribe.close();
            console.warn(`Exist ${type} Socket`);
          }
          if (wsSubscribe?.CLOSED || wsSubscribe === undefined) {
            setWsSubscribe(ws);
          }
          break;
        default:
          break;
      }
    }
  };

  /**
   * 웹소켓의 구독 메세지가 변경되면 소켓에 전달합니다.
   */
  useEffect(() => {
    if (wsSubscribe && wsMessage?.events) {
      const data = stringify(wsMessage);
      wsSubscribe.send(data);
    }
  }, [wsMessage]);

  /**
   * 웹소켓을 생성합니다.
   */
  useEffect(() => {
    try {
      switch (type) {
        case 'SUBSCRIBE':
          const subWs = new WebSocket('wss://wss1.bithumb.com/public');
          subWs.onopen = generateOnOpen(type, subWs);
          subWs.onerror = generateOnError(type);
          subWs.onclose = generateOnCloser(type);
          subWs.onmessage = generateOnMessage(type);
          break;
        case 'CHAT':
          const chatWs = new WebSocket('wss://cointalk.kro.kr:8080/chatting/rs');
          chatWs.onopen = generateOnOpen(type, chatWs);
          chatWs.onerror = generateOnError(type);
          chatWs.onclose = generateOnCloser(type);
          chatWs.onmessage = generateOnChatMessage(type);
          break;
        default:
          break;
      }
    } catch (err) {
      console.error(err);
    }
  }, []);
};

/**
 *
 * @param ws
 * @returns 웹소켓의 연결을 끊습니다.
 */
export const useDisconnectWebSocket = (ws: WebSocket) => {
  useEffect(() => {
    try {
      if (ws) {
        ws.close();
      }
    } catch (err) {
      console.error(err);
    }
  }, [ws]);
  return ws;
};
