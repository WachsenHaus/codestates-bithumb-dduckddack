import classNames from 'classnames';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import CONST_ROUTE from '../../Routes';

const HeaderNavTab = () => {
  const navigate = useNavigate();
  return (
    <div
      className={classNames(
        `flex justify-center items-center`,
        `mx-20`,
        `font-bmjua`
      )}
    >
      <div
        className={classNames(`mx-10 hover:cursor-pointer hover:scale-105`)}
        onClick={() => {
          navigate(CONST_ROUTE.TRADE);
        }}
      >
        거래소
      </div>
      <div
        className={classNames(`mx-10 hover:cursor-pointer hover:scale-105`)}
        onClick={() => {
          navigate(CONST_ROUTE.CHAT);
        }}
      >
        채팅방
      </div>
      <div
        className={classNames(`mx-10 hover:cursor-pointer hover:scale-105`)}
        onClick={() => {
          navigate(CONST_ROUTE.NEWS);
        }}
      >
        뉴스룸
      </div>
    </div>
  );
};

export default React.memo(HeaderNavTab);
