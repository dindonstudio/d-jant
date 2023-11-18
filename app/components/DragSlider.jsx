import React, { useState } from 'react';
import { Image } from '@shopify/hydrogen';
import Marquee from 'react-fast-marquee';
import RevealSide from '~/components/RevealSide';
import MyGallery from '~/components/MyGallery';

export default function DragSlider({ galleryData, galleryData2 }) {
  const [galleryStyle, setGalleryStyle] = useState({ opacity: 0, zIndex: -50 });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const openGallery = (index, isSecondMarquee = false) => {
    const calculatedIndex = isSecondMarquee ? index + galleryData2.length : index;
    setSelectedIndex(calculatedIndex);
    setGalleryStyle({ opacity: 1, zIndex: 50 });
  };

  const closeGallery = () => {
    setGalleryStyle({ opacity: 0, zIndex: -50 });
  };

  return (
    <div id="Magazine" className="py-12">
   <div className="px-8 pb-52">
        <h2 className="uppercase">
          Capturez l'essence <br /> de Déjanté
        </h2>
        <h4>Chaque image est une invitation à rejoindre la course.</h4>
      </div>

      <div className='flex flex-col gap-40'>
        <RevealSide origin={'left'} distance={'-50'} delay={300}>
          <Marquee autoFill={true} className="marquee2" pauseOnHover={true}>
            {galleryData2.map((img, index) => (
              <div key={index} className="mx-4 overflow-hidden" onClick={() => openGallery(index)}>
                <Image src={img.url} className="w-full object-cover" sizes="(min-width: 45em) 20vw, 50vw" />
              </div>
            ))}
          </Marquee>
        </RevealSide>
        <RevealSide origin={'right'} distance={'50'} delay={300}>
          <Marquee autoFill={true} pauseOnHover={true} direction="right">
            {galleryData.map((img, index) => (
              <div key={index} className="marquee2 mx-4 overflow-hidden" onClick={() => openGallery(index, true)}>
                <Image src={img.url} className="w-full object-cover" sizes="(min-width: 45em) 20vw, 50vw" />
              </div>
            ))}
          </Marquee>
        </RevealSide>
      </div>
      <div
        className='fixed top-0 left-0 transition-opacity w-full h-full flex justify-center items-center galleryContainer'
        style={{ opacity: galleryStyle.opacity, zIndex: galleryStyle.zIndex }}
      >
        <MyGallery startIndex={selectedIndex} galleryData={galleryData} galleryData2={galleryData2} />
        <div onClick={closeGallery} className="closeGallery w-full h-full z-10 fixed left-0 top-0"> </div>
        <h5 className='fixed top-12 left-8 cursor-pointer z-20'  onClick={closeGallery} > Fermer</h5>
      </div>
    </div>
  );
}
