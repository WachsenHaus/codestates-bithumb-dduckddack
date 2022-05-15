import React from 'react';
import LottieDiv from '../components/Common/LottieDiv';
import NotFound from '../asset/img/404not.json';
import classNames from 'classnames';

const NotFoundPage = () => {
  return (
    <div className={classNames(`max-h-full max-w-xl`, `mx-auto h-full`)}>
      <div className={classNames(`h-full w-full`)}>
        <LottieDiv
          jsonData={NotFound}
          className={classNames(`h-full w-full`)}
        />
      </div>
    </div>
  );
};

export default NotFoundPage;
