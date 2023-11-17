import React from 'react';
import {RevealWrapper} from 'next-reveal';

const RevealButton = ({children, classname, delay}) => {
  return (
    <RevealWrapper
      className={classname}
      origin="top"
      delay={delay}
      duration={800}
      scale={0.9}
      distance="0"
      easing="cubic-bezier(0.41, 0.75, 0.07, 0.97)"
      reset={false}
      viewOffset={{top: 25, right: 0, bottom: 10, left: 5}}
    >
      {children}
    </RevealWrapper>
  );
};

export default RevealButton;
