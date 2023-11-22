import React from 'react';
import { RevealList } from 'next-reveal';

const RevealListWrapper = ({ children, classname, reset, delay = 200, interval = 200, value = true }) => {

  return (
    <RevealList
      interval={interval}
      className={classname}
      origin="top"
    mobile={value}
      key={classname}
      delay={delay}
      duration={800}
      distance="0"
      easing="cubic-bezier(0.41, 0.75, 0.07, 0.97)"
      reset={reset}
      viewOffset={{ top: 25, right: 0, bottom: 200, left: 0 }}
    >
      {children}
    </RevealList>
  );
};

export default RevealListWrapper;
