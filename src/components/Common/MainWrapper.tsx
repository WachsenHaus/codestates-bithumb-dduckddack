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
        `${className}`,
        `bg-nightBlack`,
        `rounded-3xl`,
        `drop-shadow-xl`
      )}
    >
      {children}
    </div>
  );
};

export default MainWrapper;
