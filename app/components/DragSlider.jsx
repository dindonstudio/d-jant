import React, { useState } from 'react';
import { Image } from '@shopify/hydrogen';
import Marquee from 'react-fast-marquee';
import RevealSide from '~/components/RevealSide';
import MyGallery from '~/components/MyGallery';
import { PortableText } from '@portabletext/react';
export default function DragSlider({ galleryData, galleryData2,sanity }) {
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
    <div id="Magazine" className="py-12 overflow-x-hidden">
   <div className="px-8 md:pb-52 pb-24">
        <h2 className="uppercase">
        <PortableText
            value={sanity.sliderTitle}
          />
        </h2>
        <h4>{sanity.sliderSubTitle}</h4>
      </div>

      <div className=' hidden flex-col md:gap-40 gap-20'>
        <RevealSide mobile={false} origin={'left'} distance={'-50'} delay={300}>
          <Marquee speed={50} autoFill={false} className="marquee2" pauseOnHover={true}>
            {galleryData2.map((img, index) => (
              <div key={index} className="md:mx-4 mx-2 overflow-hidden" onClick={() => openGallery(index)}>
                <Image loading='eager' src={img.url} className="w-full object-cover" sizes="(min-width: 45em) 20vw, 50vw" />
              </div>
            ))}
          </Marquee>
        </RevealSide>
        <RevealSide mobile={false} origin={'right'} distance={'50'} delay={300}>
          <Marquee speed={50} autoFill={false} pauseOnHover={true} direction="right">
            {galleryData.map((img, index) => (
              <div key={index} className="marquee2 md:mx-4 mx-2 overflow-hidden" onClick={() => openGallery(index, true)}>
                <Image loading='eager' src={img.url} className="w-full object-cover" sizes="(min-width: 45em) 20vw, 50vw" />
              </div>
            ))}
          </Marquee>
        </RevealSide>
      </div>
      <div
        className='relative top-0 left-0 transition-opacity w-full h-full flex justify-center items-center galleryContainer'
        // style={{ opacity: galleryStyle.opacity, zIndex: galleryStyle.zIndex }}
      >
        <MyGallery startIndex={selectedIndex} galleryData={galleryData} galleryData2={galleryData2} />
        {/* <div onClick={closeGallery} className="closeGallery w-full h-full z-10 fixed left-0 top-0"> </div>
        <h5 className='fixed md:top-12 md:left-8 top-4 left-6 cursor-pointer z-20'  onClick={closeGallery} > Fermer</h5> */}
      </div>
    </div>
  );
}
