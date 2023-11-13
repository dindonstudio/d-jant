import React from 'react';
// Import the VideoPlayer and MyButtonHero components if they are in separate files.
// import VideoPlayer from './VideoPlayer';
// import MyButtonHero from './MyButtonHero';

import VideoPlayer from '~/components/VideoPlayer';

function VideoPresentation(props) {
  const {sanity} = props;

  return (
    <div className="grid md:px-8 ">
      <div className="col-start-1 col-end-9 md:pb-40">
        <h2 className="uppercase">Découvrez la vie à travers le pare-brise</h2>
        {/* <h4>Ressentez chaque virage, chaque accélération, chaque instant de liberté.</h4> */}
      </div>
      <div className="col-start-2 col-end-12">
        <VideoPlayer
          url={
            'https://cdn.shopify.com/videos/c/o/v/4fd141f5e89b4be1925cef0f25f1d09a.mp4'
          }
          controls
          autoplay
        />
      </div>
      <div className='col-start-3 col-end-9 md:pt-96'>
        <h4>
          On espère vous en avoir mis plein les yeux avec notre Abarth et que
          l'étincelle a été allumée pour donner vie à notre concours ! Si le
          ronronnement de son moteur et son design vous ont séduit, pourquoi ne
          pas transformer cette admiration en action ? Participez à notre
          jeu-concours et cette Abarth pourrait bien finir dans votre garage.
          Pour toutes questions sur le déroulement ou les détails, plongez dans
          notre FAQ ci-dessous.
        </h4>
      </div>
    </div>
  );
}

export default VideoPresentation;
