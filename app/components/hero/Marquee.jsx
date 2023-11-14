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

      <div className="glitch">
        <div className="text"><span>Gagner une Abarth 595</span>
  
        </div>
      </div>

  );
};

export default Marquee;
