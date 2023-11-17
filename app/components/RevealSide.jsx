import React from 'react';
import {RevealWrapper} from 'next-reveal';

const RevealSide = ({children, delay, distance, origin}) => {
  return (
    <RevealWrapper
      origin={origin}
      delay={delay}
      duration={800}
      distance='-100px'
      easing="cubic-bezier(0.41, 0.75, 0.07, 0.97)"
      reset={false}
      viewOffset={{top: 25, right: 0, bottom: 10, left: 5}}
    >
      {children}
    </RevealWrapper>
  );
};

export default RevealSide;
