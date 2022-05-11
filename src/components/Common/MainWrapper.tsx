import classNames from 'classnames';
import React from 'react';

const MainWrapper = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={classNames(
        `bg-nightBlack`,
        `rounded-3xl`,
        `drop-shadow-2xl`,
        `${className}`
      )}
    >
      {children}
    </div>
  );
};

export default MainWrapper;
