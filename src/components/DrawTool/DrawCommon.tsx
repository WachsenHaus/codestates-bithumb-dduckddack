import classNames from 'classnames';
import React, { ReactNode } from 'react';

const DrawCommon = ({
  children,
  className,
}: {
  children?: ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={classNames(
        `w-full h-full`,
        `flex justify-center items-center`,
        className
      )}
    >
      {children}
    </div>
  );
};

export default DrawCommon;
