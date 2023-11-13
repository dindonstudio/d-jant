
import React, { useRef, useEffect, useState } from "react";
import { Image } from "@shopify/hydrogen";

export default function DragSlider({ galleryData }) {

  
  
    const galleryContainerRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
  
    const handleMouseDown = (e) => {
      setIsDragging(true);
      setStartX(e.pageX - galleryContainerRef.current.offsetLeft);
      setScrollLeft(galleryContainerRef.current.scrollLeft);
    };
  
    const handleMouseLeave = () => {
      setIsDragging(false);
    };
    let lastX = 0;
    let lastTime = 0;
    let velocity = 0;
    const friction = 0.95;  // Adjust this for stronger/weaker deceleration
    
    const handleMouseMove = (e) => {
      if (!isDragging) return;
      e.preventDefault();
    
      const x = e.pageX - galleryContainerRef.current.offsetLeft;
      const now = Date.now();
      const elapsed = now - lastTime;
    
      if (elapsed > 0) { // avoid division by zero
        velocity = (x - lastX) / elapsed;
      }
    
      const walk = x - startX;
      galleryContainerRef.current.scrollLeft = scrollLeft - walk;
    
      lastX = x;
      lastTime = now;
    };
    
    const animate = () => {
      if (Math.abs(velocity) > 0.1) {
        galleryContainerRef.current.scrollLeft -= velocity * 10;  // the * 10 is arbitrary, adjust for stronger/weaker momentum
        velocity *= friction;
    
        requestAnimationFrame(animate);
      }
    }
    
    const handleMouseUp = () => {
      setIsDragging(false);
      if (Math.abs(velocity) > 0.1) {
        requestAnimationFrame(animate);
      }
    };
    
    
    useEffect(() => {
      const galleryElement = galleryContainerRef.current;
  
      galleryElement.addEventListener("mousedown", handleMouseDown);
      galleryElement.addEventListener("mouseleave", handleMouseLeave);
      galleryElement.addEventListener("mouseup", handleMouseUp);
      galleryElement.addEventListener("mousemove", handleMouseMove);
  
      return () => {
        galleryElement.removeEventListener("mousedown", handleMouseDown);
        galleryElement.removeEventListener("mouseleave", handleMouseLeave);
        galleryElement.removeEventListener("mouseup", handleMouseUp);
        galleryElement.removeEventListener("mousemove", handleMouseMove);
      };
    }, [isDragging, startX, scrollLeft]);
  
  return (
    <div id="Magazine" className="px-8">
        <h2 className="uppercase">Capturez l'essence <br /> de Déjanté</h2>
        <h4>Chaque image est une invitation  à rejoindre  la course.</h4>
      <div id="gallery__container" className="md:w-screen">
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
      </div>
    </div>
  );
}
