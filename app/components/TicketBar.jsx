import React, { useState, useEffect, useRef } from 'react';
import RevealOpacity from '~/components/RevealOpacity';
const TicketBar = ({ remainingTickets }) => {
  const totalTickets = 5000;
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const barRef = useRef(null);


  useEffect(() => {
    const newProgress = ((totalTickets - remainingTickets) / totalTickets) * 100;
    if (isVisible) {
      setProgress(40);
    }
  }, [remainingTickets, isVisible]);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setIsVisible(true);
      }
    });

    if (barRef.current) {
      observer.observe(barRef.current);
    }

    return () => {
      if (barRef.current) {
        observer.unobserve(barRef.current);
      }
    };
  }, []);

  return (
 
           
           
    <div ref={barRef} className="progress-bar-container bg-semiDark sticky top-0 z-50 w-screen md:pt-9 pt-8 pb-4 md:h-40 h-24">
           <RevealOpacity delay={200}>
      <div className="progress-bar z-0" style={{ width: `${progress}%`, transition: 'width 1s ease-in-out 0.4s' }}></div>
      <div className="bigSubText mix-blend-difference flex justify-center">
        <div>
          Dépêchez-vous, plus que {remainingTickets} tickets restants!
        </div>
      </div>
      </RevealOpacity>
    </div>

  );
};

export default TicketBar;
