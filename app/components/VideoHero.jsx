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
      <VideoPlayer url={'https://cdn.shopify.com/videos/c/o/v/8266dd760c4a4966af83c83b8226cf66.mp4'} loop mute autoplay />

      </div>
      {/* <div className="blackOverlay"></div> */}

      <div  className="grid  absolute w-full top-0 left-0 px-10 z-20 h-full">
        <div  className="flex fadeInUp flex-col md:gap-4 gap-2 items-center col-span-12   justify-center  ">
            <h3 className=''>Gagnez une Abarth 595</h3>


            <h5 className="maxCH fadeInUp2 text-center ">
              Participez au concours pour un changement de vitesse dans votre
              quotidien.
            </h5>

 
            <div className="mt-4 fadeInUp3 ">
              <MyButtonHero text={'DÉCOUVRIR'} />
            </div>

        </div>
      </div>
    </div>
  );
}

export default VideoWithButtonOverlay;
