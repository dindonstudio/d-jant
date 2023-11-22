import React, { useRef, useEffect, useState } from 'react';

function FilledButton(props) {
  const { text } = props;
  const shopRef = useRef(null);
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    shopRef.current = document.getElementById('shop');
    
    if (isScrolling) {
      // Apply the blur effect
      document.body.style.filter = 'url(#svgBlur)';

      const handleScroll = () => {
        clearTimeout(window.scrollTimeout);
        window.scrollTimeout = setTimeout(() => {
          document.body.style.filter = 'none'; // Remove blur
          setIsScrolling(false); // Update state to remove the listener
        }, 20); // Adjust this delay as needed
      };

      window.addEventListener('scroll', handleScroll);

      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, [isScrolling]);

  const scrollToShop = () => {
    setIsScrolling(true); // Enable scrolling state

    if (shopRef.current) {
      const yOffset = +100; // 2 rem above the element
      const y = shopRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <h3 className='myButton filled flex relative cursor-pointer' onClick={scrollToShop}>
      {text}
      <div className='arrow absolute right-0 opacity-0'>
        <svg className='w-12 h-16' xmlns="http://www.w3.org/2000/svg" fill='#f4f4f4' width="23" height="23" viewBox="0 0 24 24">
          <path d="M7.33 24l-2.83-2.829 9.339-9.175-9.339-9.167 2.83-2.829 12.17 11.996z"/>
        </svg>
      </div>
    </h3>
  );
}

export default FilledButton;
