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
          
        />
      </div>
      <div className='col-start-3 col-end-9 md:pt-96'>
        <h4>
        Chez Déjanté, notre projet est né d’un rêve partagé : marier l’amour de l’automobile à l’art du textile. 
De fil en aiguille, virage par virage ; l’idée s’est progressivement tisser. 
Notre objectif commun ; partager l’histoire de cet alliage haut en couleurs avec d’autres passionnés. Vous offrir et s’offrir à nous mêmes une chance de transformer nos quotidiens. 
À l’image de notre Abarth iconique : en puissance et avec un grain de magie. <br />
Bienvenue chez Déjanté.
        </h4>
      </div>
    </div>
  );
}

export default VideoPresentation;
