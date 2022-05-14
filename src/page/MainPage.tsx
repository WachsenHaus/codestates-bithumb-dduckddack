import classNames from 'classnames';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { atomSelectCoinDefault } from '../atom/selectCoinDefault.atom';
import BestCoin from '../components/BestCoin/BestCoin';
import OnlyDisplayChat from '../components/Chat/OnlyDisplayChat';
import { useCoinList } from '../hooks/useInitialize';
import { useGenerateSocket } from '../hooks/useWebSocket';

const MainPage = () => {
  const setDefaultCoins = useSetRecoilState(atomSelectCoinDefault);
  useEffect(() => {
    setDefaultCoins({
      coinType: 'C0101',
      coinSymbol: 'BTC',
      marketSymbol: 'KRW',
      siseCrncCd: 'C0100',
      coinName: '비트코인',
    });
  }, []);
  useCoinList();

  return (
    <div className={classNames(`grid grid-cols-12 `, `max-h-full`, `h-full`)}>
      <BestCoin
        className={classNames(
          `col-start-3 col-end-7  drop-shadow-2xl`,
          `h-5/6 my-auto mx-2`
        )}
      />
      <OnlyDisplayChat
        className={classNames(
          `col-start-7 col-end-11  drop-shadow-2xl`,
          `h-5/6 my-auto mx-2`
        )}
      />
    </div>
  );
};

export default MainPage;
