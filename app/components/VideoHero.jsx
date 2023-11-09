import React from 'react';
// Import the VideoPlayer and MyButtonHero components if they are in separate files.
// import VideoPlayer from './VideoPlayer';
// import MyButtonHero from './MyButtonHero';
import MyButtonHero from '~/components/ButtonHero';

import VideoPlayer from '~/components/VideoPlayer';

function VideoWithButtonOverlay(props) {
    const { sanity } = props;

   

    return (
        <div className="w-full h-full relative  z-0 borderRadius overflow-hidden ">
            <VideoPlayer url={sanity.videoUrl} loop mute autoplay />
            {/* <div className="blackOverlay"></div> */}
   
                <div className="grid absolute w-full top-0 left-0 px-10 z-20 h-full">
                    <div className='flex flex-col gap-8 items-center col-span-12 pl-8  justify-center  '>
                    <h3 className='maxCH text-center'>
                    Participez au concours pour un changement de vitesse dans votre quotidien.
                    </h3>
        <MyButtonHero text={"DÉCOUVRIR"}/>
                    </div>
        

                </div>
        
        </div>
    );
}

export default VideoWithButtonOverlay;
