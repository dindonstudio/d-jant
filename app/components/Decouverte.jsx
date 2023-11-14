import React from 'react';

import FilledButton from './FilledButton';
import {Image} from '@shopify/hydrogen';
function Decouvertes(props) {
  const {sanity} = props;

  return (
    <div className="px-8  ">
      <div className="w-full flex flex-col justify-center items-center pb-72">
        <h2 className="text-center uppercase pb-2">
          Découverte de l'Abarth 595
        </h2>
        <div className="flex justify-center">
          <h4 className="text-center mxCh53">
            L'Abarth 595, plus qu'une voiture : une extension de votre
            personnalité. Avec son covering inédit et ses finitions exclusives,
            elle brille dans toutes les rues et dans tous les cœurs.{' '}
          </h4>
        </div>
      </div>
      <div className="grid content-baseline md:mt-13">
        <div className="col-start-2 col-end-6">
          <div className="text-right uppercase bigSubText ">
            Quand l’italie rencontre la performance
          </div>
          <h4 className="text-right">
            Libérez l'enthuastif qui sommeille en vous avec l'Abart 565 Turismo,
            un chef-d'œuvre de l'ingénierie automobile.
          </h4>
        </div>

        <div className="col-start-7 col-end-12">
          <Image
            src="https://cdn.sanity.io/images/m5ok1ygs/production/845cea8ea67a6cc9b073ecfabb0a494bbaeab527-3070x1735.png"
            width={1000}
            height={1000}
          />
        </div>
      </div>
      <div className="grid content-baseline md:pt-40">
        <div className="col-start-2 col-end-9 relative">
          <Image
            src="https://cdn.sanity.io/images/m5ok1ygs/production/b12081b78f70a5f2722bedb83809c94086589acc-4134x2038.png"
            width={1000}
            height={1000}
          />
          <div className="h-full w-1/3 absolute top-0 right-0 blueOverlay"></div>
        </div>
        <div className="flex  md:ml-12 items-center col-start-9 blue col-end-13">
          <div className="uppercase bigSubText">REVETEMENT de NUIT</div>
        </div>
      </div>
      <div className="grid content-baseline md:pt-24">
        <div className="col-start-2 col-end-8 relative ">
          <div>
            <div className="uppercase yellow text-center bigSubText pb-2">
              REVETEMENT au soleil
            </div>
            <h4 className="text-left maxch30">
              Libérez l'enthuastif qui sommeille en vous avec l'Abart 565
              Turismo, rajouter le vrai text
            </h4>
          </div>
        </div>
      </div>
      <div className="grid content-baseline md:pt-40">
        <div className="col-start-4 col-end-10 relative">
          <Image
            src="https://cdn.sanity.io/images/m5ok1ygs/production/873ff8f604740744995a8bdb4d65949151cf7e16-4295x2494.png"
            width={1000}
            height={1000}
          />
        </div>
       
      </div>
      <div className="grid content-baseline md:pt-24">
        <div className="col-start-7 col-end-11 relative ">
          <div>
            <div className="uppercase red  bigSubText pb-2">
            Des sieges totallement déjanté
            </div>
            <h4 className="text-left maxch30">
              Libérez l'enthuastif qui sommeille en vous avec l'Abart 565
              Turismo, rajouter le vrai text
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Decouvertes;
