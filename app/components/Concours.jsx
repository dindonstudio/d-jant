import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
function Concours(sanity) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const containerRef = useRef(null);
  const itemsRef = useRef([]);
  const listItemRefs = useRef([]);
  const textItemRefs = useRef([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const targetDate = new Date(now.getFullYear(), 11, 15); // December 15th of the current year
      const diff = targetDate - now;

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });

      if (diff < 0) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const container = document.querySelector('.containerSteps');
const stepRef  = document.querySelector('.textRef');
const timer  = document.querySelector('.timer');
    // Pin the container
    ScrollTrigger.create({
      trigger: container,

      pin: true,
      start: 'top top',
      end: () => `${container.scrollHeight + window.innerHeight * 4}px`,
      pinSpacing: true,
     
    });
    

    // Percentage for each item reveal

    const percentagePerItem = 100 / 4;


    const thirdElementEndRange = 3 * percentagePerItem; // Calculate end range for the third element


    gsap.to(listItemRefs.current, {
      scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: () => `${container.scrollHeight + window.innerHeight * 4}px`,
          onUpdate: (self) => {
              const progress = self.progress * 100;
              if (progress > thirdElementEndRange) {
                gsap.to(container, {
                    backgroundColor: '#f4f4f4',
                    duration: 0.7,
                    overwrite: 'auto',
                });
                gsap.to(stepRef, {
                   opacity: 0,
                    duration: 0.2,
                    overwrite: 'auto',
                });
                gsap.to(timer, {
                   opacity: 1,
                    duration: 0.9,
                    overwrite: 'auto',
                });
            } else if (progress < thirdElementEndRange) {
                gsap.to(container, {
                    backgroundColor: '#1a1a19',  // assuming this is the default color
                    duration: 0.4,
                    overwrite: 'auto',
                });
                gsap.to(stepRef, {
                   opacity: 1,
                    duration: 0.4,
                    overwrite: 'auto',
                });
                gsap.to(timer, {
                   opacity: 0,
                    duration: 0.4,
                    overwrite: 'auto',
                });
            }
              listItemRefs.current.forEach((item, index) => {
                  const startRange = index * percentagePerItem;
                  const endRange = (index + 1) * percentagePerItem;
  
                  if (progress > startRange && progress < endRange) {
                      gsap.to(item, {
                 
                          color:'#f4f4f4',
                          duration: 0.5,
                          visibility: 'visible',
                          overwrite: 'auto',
                      });
                  } else {
                      gsap.to(item, {
                   
                          color: '#1a1a19', 
                          duration: 0.5,
                          visibility: 'visible',
                          overwrite: 'auto',
                      });
                  }
              });
  
              textItemRefs.current.forEach((item, index) => {
                  const startRange = index * percentagePerItem;
                  const endRange = (index + 1) * percentagePerItem;
  
                  if (progress > startRange && progress < endRange) {
                      gsap.to(item, {
                          opacity: 1,
                          duration: 0.5,
                          delay: 0.2,
                          visibility: 'visible',
                          overwrite: 'auto',
                      });
                  } else {
                      gsap.to(item, {
                          opacity: 0,
                          duration: 0.5,
                          visibility: 'visible',
                          overwrite: 'auto',
                      });
                  }
              });
          },
      },
  });
  

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
      gsap.killTweensOf(document.querySelectorAll('li'));
    };
  }, []);
  return (
    <div className="  px-36 containerSteps relative">
      <h2 className=" pt-24 pb-20">{sanity.sanity.ConcoursTitle}</h2>
      <div ref={containerRef} className="justify-between flex textRef">
        <div className="flex-col paddinLeft ">
          {sanity.sanity.itemsConcours.map((item, index) => (
            <div className='flex gap-12 items-center' key={index}>
              <div     ref={(el) => (listItemRefs.current[index] = el)} className='bigText'>{item.number}.</div>
              <h4   ref={(el) => (textItemRefs.current[index] = el)} className='pt-12 opacity-0 item'>
                {item.text}
              </h4>
            </div>
          ))}
        </div>
   
     
      </div>
      <div className='absolute  top-0 left-0 h-screen w-screen flex justify-center items-center'
        >
             <div className='timer opacity-0 flex justify-center items-center flex-col gap-24  relative pb-32'>
          <h4 className='text-center w-full'>Tirage au sort dans : </h4>
          <div className='flex gap-24'>
          <h2 className='text-center'>      {timeLeft.days} <br /> Jours </h2>
          <h2 className='text-center'>          {timeLeft.hours} <br /> Heures  </h2>
          <h2 className='text-center'>      {timeLeft.minutes} <br /> Minutes  </h2>
          <h2 className='text-center'>  {timeLeft.seconds} <br /> Secondes  </h2>
          </div>


        </div>
        </div>
    </div>
  );
}

export default Concours;
