import React from 'react';

import FilledButton from './FilledButton';
import {Image} from '@shopify/hydrogen';
function Decouvertes(props) {
  const {sanity} = props;

  return (
    <div className="px-8  ">
      <div className="w-full flex flex-col justify-center items-center gap-10 pb-72">
        <h2 className="text-center uppercase">Découverte de l'Abarth 595</h2>
        <div className="flex justify-center">
          <h4 className="text-center mxCh53">
            L'Abarth 595, plus qu'une voiture : une extension de votre
            personnalité. Avec son covering inédit et ses finitions exclusives,
            elle brille dans toutes les rues et dans tous les cœurs.{' '}
          </h4>
        </div>
      </div>
      <div className='grid content-baseline'>
        <div className='col-start-2 col-end-6'>
        <div className='text-right uppercase bigSubText '>Quand l’italie rencontre la performance</div>
        <h4 className='text-right'>Libérez l'enthuastif qui sommeille en vous avec l'Abart 565 Turismo, un chef-d'œuvre de l'ingénierie automobile.</h4>
        </div>
  
        <div className='col-start-7 col-end-12'>
          <Image
            src="https://cdn.sanity.io/images/m5ok1ygs/production/845cea8ea67a6cc9b073ecfabb0a494bbaeab527-3070x1735.png"
            width={1000}
            height={1000}
          />
          
        </div>
      </div>
    </div>
  );
}

export default Decouvertes;
