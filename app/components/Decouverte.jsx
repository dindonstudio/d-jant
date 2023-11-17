import React from 'react';

import FilledButton from './FilledButton';
import RevealTitle from '~/components/RevealTitleWrapper';
import RevealOpacity from '~/components/RevealOpacity';
import RevealLine from '~/components/RevealLine';
import RevealListWrapper from '~/components/RevealListWrapper';

import {Image} from '@shopify/hydrogen';
function Decouvertes(props) {
  const {sanity} = props;

  return (
    <div className="px-8  ">
      <div className="w-full flex flex-col justify-center items-center pb-72">
        <h2 className="text-center uppercase pb-2">
        <RevealTitle>

          Découverte de l'Abarth 595
          </RevealTitle>
        </h2>
        <div className="flex justify-center">
          <h4 className="text-center mxCh53">
          <RevealTitle>
            L'Abarth 595, plus qu'une voiture : une extension de votre
            personnalité. Avec son covering inédit et ses finitions exclusives,
            elle brille dans toutes les rues et dans tous les cœurs.{' '}
            </RevealTitle>
          </h4>
        </div>
       
      </div>
      <div className="grid content-baseline md:mt-13 relative one">
        <div className="col-start-2 col-end-6 ">
          <div className="text-right uppercase bigSubText overIt relative -right-12 pr-12">
          <RevealOpacity delay={600}>
            Quand l’italie rencontre la performance
            </RevealOpacity>
          </div>
          <h4 className="text-right">
          <RevealOpacity delay={700}>
            Libérez l'enthuastif qui sommeille en vous avec l'Abart 565 Turismo,
            un chef-d'œuvre de l'ingénierie automobile.
            </RevealOpacity>
          </h4>
          <div className='absolute dotContainer'>
            <div className='relative'>
            <RevealOpacity delay={400}>
            <div className="roundPoint"></div>
            </RevealOpacity>
            <RevealLine delay={400}>
          <div className="firstLine"></div>
          </RevealLine>
          <RevealLine delay={400} classname={'lineHorizontalReveal'}>
          <div className="secondLine "></div>
          </RevealLine>
            </div>
         
          </div>
  
        </div>



        <div className="col-start-7 col-end-12 relative -z-10">
        <RevealOpacity delay={200}>
          <Image
            src="https://cdn.sanity.io/images/m5ok1ygs/production/845cea8ea67a6cc9b073ecfabb0a494bbaeab527-3070x1735.png"
            width={1000}
            loading='eager'
            height={1000}
            aspectRatio='auto'
          />
                  </RevealOpacity>
        </div>

      </div>
      <div className="grid content-baseline md:pt-40 two relative">
        <div className="col-start-2 col-end-9 relative -z-10 three">
        <RevealOpacity delay={200}>
          <Image
            src="https://cdn.sanity.io/images/m5ok1ygs/production/b12081b78f70a5f2722bedb83809c94086589acc-4134x2038.png"
            width={1000}
            height={1000}
            loading='eager'
            aspectRatio='auto'
          />
       
                </RevealOpacity>
                <RevealOpacity delay={500}>
          <div className="h-full w-1/3 absolute top-0 right-0 blueOverlay"></div>
          </RevealOpacity>
          <div className='absolute dotContainer'>
            <div className='relative'>
            <RevealOpacity delay={600}>
            <div className="roundPoint"></div>
            </RevealOpacity>
      
          <RevealLine delay={600} classname={'lineHorizontalReveal'}>
          <div className="secondLine "></div>
          </RevealLine>
            </div>
         
          </div>
        </div>
        <div className="flex  md:ml-12 items-center col-start-9 blue col-end-13">
          <div className="uppercase bigSubText overIt pl-12 -left-12 relative">
          <RevealOpacity delay={600}>
            REVETEMENT de NUIT
            </RevealOpacity></div>
        </div>
        <div className='absolute dotContainer'>
            <div className='relative'>
            <RevealOpacity delay={400}>
            <div className="roundPoint"></div>
            </RevealOpacity>
      
          <RevealLine delay={400} classname={'lineHorizontalReveal'}>
          <div className="secondLine "></div>
          </RevealLine>
            </div>
         
          </div>
      </div>
      <div className="grid content-baseline md:pt-24 three">
        <div className="col-start-2 col-end-8 relative ">
          <div className=' overIt pt-12 relative -top-12'>
            <div className="uppercase yellow text-center bigSubText pb-2">
            <RevealOpacity delay={600}>
              REVETEMENT au soleil
              </RevealOpacity>
            </div>
            <h4 className="text-left maxch30">
            <RevealOpacity delay={600}>

              Libérez l'enthuastif qui sommeille en vous avec l'Abart 565
              Turismo, rajouter le vrai text
              </RevealOpacity>
            </h4>
          </div>
      
        </div>
      </div>
      <div className="grid content-baseline md:pt-40 four relative">
        <div className="col-start-4 col-end-10 relative">
        <RevealOpacity delay={200}>
          <Image
            src="https://cdn.sanity.io/images/m5ok1ygs/production/873ff8f604740744995a8bdb4d65949151cf7e16-4295x2494.png"
            width={1000}
            height={1000}
            aspectRatio='auto'
            loading='eager'
          />
                     </RevealOpacity>
        </div>
        <div className='absolute dotContainer'>
            <div className='relative'>
            <RevealOpacity delay={400}>
            <div className="roundPoint"></div>
            </RevealOpacity>
            <RevealLine delay={400}>
              <div className='firstLineContainer'>
              <div className="firstLine"></div>
              </div>
   
          </RevealLine>
          <RevealLine delay={400} classname={'lineHorizontalReveal'}>
          <div className="secondLine "></div>
          </RevealLine>
            </div>
         
          </div>
      </div>
      <div className="grid content-baseline md:pt-24">
        <div className="col-start-8 col-end-12 relative overIt pl-12 -left-12 ">
          <div>
            <div className="uppercase red  bigSubText pb-2">
            <RevealOpacity delay={400}>

            Des sieges totallement déjanté
            </RevealOpacity>
            </div>
            <h4 className="text-left maxch30">
            <RevealOpacity delay={400}>

              Libérez l'enthuastif qui sommeille en vous avec l'Abart 565
              Turismo, rajouter le vrai text
              </RevealOpacity>
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Decouvertes;
