import classNames from 'classnames';
import React from 'react';

const MainWrapper = ({
  className,
  children,
  style,
}: {
  className?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}) => {
  return (
    <div
      className={classNames(
        `bg-nightBlack`,
        `rounded-3xl`,
        `filter drop-shadow-3xl`,
        `${className}`
      )}
      style={{
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export default MainWrapper;
