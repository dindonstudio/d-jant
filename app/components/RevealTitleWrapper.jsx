import React from 'react';
import { RevealWrapper } from 'next-reveal';

const RevealTitle = ({ children }) => {
  return (
    <RevealWrapper

       
      origin='top'
      delay={200}
      duration={800}
      distance='-60px'
      easing='cubic-bezier(0.41, 0.75, 0.07, 0.97)'
      reset={false}
      viewOffset={{ top: 25, right: 0, bottom: 10, left: 5 }}
    >
      {children}
    </RevealWrapper>
  );
};

export default RevealTitle;
