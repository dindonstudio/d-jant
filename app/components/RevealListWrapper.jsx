import React from 'react';
import {RevealList} from 'next-reveal';

const RevealListWrapper = ({children, classname, reset}) => {
  console.log(classname)
  return (
    <RevealList
      interval={200}
      className={classname}
      origin="top"
      delay={200}
      duration={800}
      distance="0"
      easing="cubic-bezier(0.41, 0.75, 0.07, 0.97)"
      reset={reset}
      viewOffset={{top: 25, right: 0, bottom: 200, left: 5}}
    >
      {children}
    </RevealList>
  );
};

export default RevealListWrapper;
