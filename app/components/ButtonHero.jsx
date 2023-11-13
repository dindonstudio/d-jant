import React, { useRef, useEffect } from 'react';

function MyButtonHero(props) {
  const { text } = props;
  const decouverteRef = useRef(null);

  useEffect(() => {
    decouverteRef.current = document.getElementById('decouverte');
  }, []);

  const scrollToDecouverte = () => {
    if (decouverteRef.current) {
      const yOffset = -100; // 2 rem above the element
      const y = decouverteRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };


  return (
    <h4 className='myButton hero flex relative cursor-pointer' onClick={scrollToDecouverte}>
      {text}
      <div className='arrow absolute mt-1 right-0 opacity-0'>
        <svg xmlns="http://www.w3.org/2000/svg" fill='#f4f4f4' width="25" height="25" viewBox="0 0 24 24">
          <path d="M7.33 24l-2.83-2.829 9.339-9.175-9.339-9.167 2.83-2.829 12.17 11.996z"/>
        </svg>
      </div>
    </h4>
  );
}

export default MyButtonHero;

