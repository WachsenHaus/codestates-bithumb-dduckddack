import classNames from 'classnames';
import { ReactNode } from 'react';

const Wrapper = ({ children }: { children: ReactNode }) => {
  return (
    <div
      className={classNames(
        `flex justify-center items-center font-bmjua text-bithumb`
      )}
    >
      {children}
    </div>
  );
};

const BestCoinTitle = () => {
  return (
    <>
      <div></div>
      <Wrapper>코인이름</Wrapper>
      <Wrapper>가격</Wrapper>
      <Wrapper>변동률</Wrapper>
      <Wrapper>거래대금</Wrapper>
    </>
  );
};

export default BestCoinTitle;
