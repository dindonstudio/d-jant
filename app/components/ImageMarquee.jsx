import React, { useEffect, useState, useRef } from 'react';
import { Image } from '@shopify/hydrogen';
import Marquee from "react-fast-marquee";

const ImageMarquee = ({ images }) => {
  

  return (
    
      <div className="animation">
          <Marquee>
          {images.map((img, index) => (
          <div key={index} className="">
             <Image
                           
                           src= {img.url}
                                className="w-full h-full object-cover"
                                sizes="(min-width: 45em) 20vw, 50vw"
                              />
              
          </div>
        ))}
          </Marquee>
       
      </div>
    
  );
};

export default ImageMarquee;
