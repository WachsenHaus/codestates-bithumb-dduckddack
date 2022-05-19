import React, { useLayoutEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { atomSelectCoinDefault } from '../atom/selectCoinDefault.atom';

/**
 * 기본 코인 설정이 필요할 경우 기본 비트코인으로 설정합니다.
 */
const useSetDefaultCoin = () => {
  const [deafultCoins, setDefaultCoins] = useRecoilState(atomSelectCoinDefault);
  useLayoutEffect(() => {
    if (deafultCoins.coinSymbol === 'BTC') {
      return;
    }
    setDefaultCoins({
      coinType: 'C0101',
      coinSymbol: 'BTC',
      marketSymbol: 'KRW',
      siseCrncCd: 'C0100',
      coinName: '비트코인',
    });
  }, []);
};

export default useSetDefaultCoin;
