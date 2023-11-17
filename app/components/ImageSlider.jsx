import React, { useEffect, useState, useRef } from 'react';
import { Image } from '@shopify/hydrogen';
const ImageSlider = ({ images }) => {
  const sliderRef = useRef(null);
  const [sliderWidth, setSliderWidth] = useState(0);
  const [animationWidth, setAnimationWidth] = useState(0);
  const [speed, setSpeed] = useState(0);

  useEffect(() => {
    const sliderElement = sliderRef.current;
    if (!sliderElement) return;

    let tempAnimationWidth = 0;
    let tempSliderWidth = 0;

    // Calculate animation and slider width
    [...sliderElement.children].forEach((child) => {
      tempAnimationWidth += child.offsetWidth;
      tempSliderWidth += child.offsetWidth;
    });

    // Calculate the number of visible slides and speed
    const slidesVisible = Math.ceil(sliderElement.offsetWidth / sliderElement.children[0].offsetWidth);
    const slidesNumber = sliderElement.children.length;
    tempSliderWidth += tempAnimationWidth; // Adjust for the cloned elements

    setAnimationWidth(tempAnimationWidth);
    setSliderWidth(tempSliderWidth);
    setSpeed(slidesNumber * 2);

    // Append clones for looping
    const cloneElements = [...sliderElement.children].slice(0, slidesVisible);
    cloneElements.forEach((clone) => sliderElement.appendChild(clone.cloneNode(true)));

    // Restart the animation for cross-browser compatibility
    const currentClass = sliderElement.className;
    sliderElement.className = '';
    setTimeout(() => {
      sliderElement.className = currentClass;
    }, 1);
  }, [images]);

  // Dynamic styles for animation
  const dynamicStyles = {
    width: `${sliderWidth}px`,
    animation: `smoothscroll ${speed}s linear infinite`,
  };

  return (
    <div className="block">
      <div className="animation" ref={sliderRef} style={dynamicStyles}>
        {images.map((img, index) => (
          <div key={index} className="image-container">
             <Image
                           
                           src= {img.url}
                                className="w-full h-full object-cover"
                                sizes="(min-width: 45em) 20vw, 50vw"
                              />
              
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
