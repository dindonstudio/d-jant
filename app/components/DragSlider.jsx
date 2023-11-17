import React, {useRef, useEffect, useState} from 'react';
import {Image} from '@shopify/hydrogen';
import Marquee from 'react-fast-marquee';
import RevealSide from '~/components/RevealSide';
export default function DragSlider({galleryData, galleryData2}) {
  const defaultSpeed = 50; // Default marquee speed
  const scrollingSpeed = 65; // Marquee speed when scrolling
  const [marqueeSpeed, setMarqueeSpeed] = useState(defaultSpeed);

  // useEffect(() => {
  //   let scrollTimeout;

  //   const handleScrollStart = () => {
  //     clearTimeout(scrollTimeout);
  //     setMarqueeSpeed(scrollingSpeed);
  //   };

  //   const handleScrollStop = () => {
  //     scrollTimeout = setTimeout(() => {
  //       setMarqueeSpeed(defaultSpeed);
  //     }, 100); // Adjust this delay as needed
  //   };

  //   window.addEventListener('scroll', handleScrollStart);
  //   window.addEventListener('scroll', handleScrollStop);

  //   return () => {
  //     window.removeEventListener('scroll', handleScrollStart);
  //     window.removeEventListener('scroll', handleScrollStop);
  //     clearTimeout(scrollTimeout);
  //   };
  // }, []);

  return (
    <div
      id="Magazine"
      className=" py-12 "
    >
      <div className="px-8 pb-52">
        <h2 className="uppercase">
          Capturez l'essence <br /> de Déjanté
        </h2>
        <h4>Chaque image est une invitation à rejoindre la course.</h4>
      </div>

      {/* <div id="gallery__container" className="md:w-screen">
        <div className="md:pt-40 md:pb-14 h-full flex justify-end flex-col">
          <div
            ref={galleryContainerRef}
            className="gallery__container noScrollBar flex flex-nowrap overflow-y-scroll gap-6 md:gap-8 md:pr-14 pb-8 md:pb-0"
          >
            {galleryData.map((item, index) => (
              <div className="flex items-end cursor-pointer" key={index}>
           
                      <Image
                           
                       src= {item.url}
                            className="w-full h-full object-cover"
                            sizes="(min-width: 45em) 20vw, 50vw"
                          />
          
              </div>
            ))}
          </div>
        </div>
      </div> */}
      <div className='flex flex-col gap-56'>
        <RevealSide origin={'left'} distance={'-50'} delay={300}>
          <Marquee autoFill={true} className="marquee1" pauseOnHover={true}>
            {galleryData2.map((img, index) => (
              <div key={index} className="">
                <Image
                  src={img.url}
                  className="w-full  object-cover"
                  sizes="(min-width: 45em) 20vw, 50vw"
                />
              </div>
            ))}
          </Marquee>
        </RevealSide>
        <RevealSide origin={'right'} distance={'50'} delay={300}>
          <Marquee autoFill={true} pauseOnHover={true} direction="right">
            {galleryData.map((img, index) => (
              <div key={index} className="marquee2">
                <Image
                  src={img.url}
                  className="w-full  object-cover"
                  sizes="(min-width: 45em) 20vw, 50vw"
                />
              </div>
            ))}
          </Marquee>
        </RevealSide>
      </div>
    </div>
  );
}
