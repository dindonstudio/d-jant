import React, { useEffect, useState } from 'react';

function MyButtonHeader(props) {
  const { text } = props;
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
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

    const shopElement = document.getElementById('shop');
    if (shopElement) {
      const yOffset = 0; // 2 rem above the element
      const y = shopElement.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div>
      <h5 className='myButton buttonHeader flex relative cursor-pointer' onClick={scrollToShop}>
        {text}
        <div className='arrow absolute right-0 opacity-0'>
          <svg xmlns="http://www.w3.org/2000/svg" fill='#f4f4f4' width="18" height="18" viewBox="0 0 24 24">
            <path d="M7.33 24l-2.83-2.829 9.339-9.175-9.339-9.167 2.83-2.829 12.17 11.996z"/>
          </svg>
        </div>
      </h5>

      {/* SVG Filter Definition */}
      <svg className='fixed top-0 -z-10 left-0' xmlns="http://www.w3.org/2000/svg" version="1.1">
        <defs>
          <filter id="svgBlur">
            <feGaussianBlur stdDeviation="0 50" />
          </filter>
        </defs>
      </svg>
    </div>
  );
}

export default MyButtonHeader;
