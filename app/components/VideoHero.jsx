import React from 'react';
// Import the VideoPlayer and MyButtonHero components if they are in separate files.
// import VideoPlayer from './VideoPlayer';
// import MyButtonHero from './MyButtonHero';
import MyButtonHero from '~/components/ButtonHero';
import { RevealList } from  'next-reveal'



import VideoPlayer from '~/components/VideoPlayer';

function VideoWithButtonOverlay(props) {
  const {sanity} = props;

  return (
    <div className="w-full h-full relative  z-0 borderRadius overflow-hidden ">
      <div className='BlackReveal' ></div>
      <div className='scaleDown'>
      <VideoPlayer url=            {sanity.heroVideoUrl}   loop mute autoplay />

      </div>
      {/* <div className="blackOverlay"></div> */}

      <div  className="grid  absolute w-full top-0 left-0 px-10 z-20 h-full">
        <div  className="flex fadeInUp flex-col md:gap-4 gap-2 items-center col-span-12   justify-center  ">
            <h3 className=''>{sanity.heroTitleCar}</h3>


            <h5 className="maxCH fadeInUp2 text-center ">
            {sanity.heroSubTitleCar}
            </h5>

 
            <div className="mt-4 fadeInUp3 ">
              <MyButtonHero text={sanity.discoverButton} />
            </div>

        </div>
      </div>
    </div>
  );
}

export default VideoWithButtonOverlay;
