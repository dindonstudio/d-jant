import React, { useEffect } from 'react';

const Marquee = () => {
  
  useEffect(() => {
    const spanElement = document.querySelector('.glitch .text span');
    const textContainer = document.querySelector('.glitch .text');
    
    for(let i = 0; i < 4; i++) {
      const clonedSpan = spanElement.cloneNode(true);
      textContainer.prepend(clonedSpan);
    }
  }, []);

  return (
    <section className='heightBanner blackBg z-30 relative'>
      <div className="glitch">
        <div className="text">
          <span>DÉJANTÉ AVEC OU SANS PERMIS<br/></span>
        </div>
      </div>
    </section>
  );
};

export default Marquee;
