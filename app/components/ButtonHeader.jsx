import React, { useRef, useEffect } from 'react';

function MyButtonHeader(props) {
  const { text } = props;
  const shopRef = useRef(null);

  useEffect(() => {
    shopRef.current = document.getElementById('shop');
  }, []);

  const scrollToShop = () => {
    if (shopRef.current) {
      const yOffset = +100; // 2 rem above the element
      const y = shopRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <h5 className='myButton buttonHeader flex relative cursor-pointer' onClick={scrollToShop}>
      {text}
      <div className='arrow absolute right-0 opacity-0'>
        <svg xmlns="http://www.w3.org/2000/svg" fill='#f4f4f4' width="18" height="18" viewBox="0 0 24 24">
          <path d="M7.33 24l-2.83-2.829 9.339-9.175-9.339-9.167 2.83-2.829 12.17 11.996z"/>
        </svg>
      </div>
    </h5>
  );
}

export default MyButtonHeader;
