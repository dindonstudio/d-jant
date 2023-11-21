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
      <div className="w-full flex flex-col justify-center items-center md:pb-72 pb-40">
        <h2 className="text-center uppercase pb-2 maxCh16">
        <RevealTitle>

          Découverte de l'Abarth 595
          </RevealTitle>
        </h2>
        <div className="flex justify-center">
          <h4 className="text-center mxCh53 ">
          <RevealTitle>
        Plus qu'une voiture, son covering inedit, elle brille dans toutes les rues et dans tous les cœurs{' '}
            </RevealTitle>
          </h4>
        </div>
       
      </div>
      <div className="grid content-baseline md:mt-13 relative one ">
        <div className="col-start-2 col-end-6 md:pt-0  ">
          <div className="md:text-right uppercase bigSubText overIt md:pt-0 pt-12 relative md:-right-12 md:pr-12">
          <RevealOpacity delay={700}>
            Quand l’italie rencontre la performance
            </RevealOpacity>
          </div>
          <h4 className="md:text-right">
          <RevealOpacity delay={800}>
            Libérez l'enthuastif qui sommeille en vous avec l'Abart 565 Turismo,
            un chef-d'œuvre de l'ingénierie automobile.
            </RevealOpacity>
          </h4>
          <div className='absolute dotContainer'>
            <div className='relative'>
            <RevealOpacity delay={100}>
            <div className="roundPoint"></div>
            </RevealOpacity>
            <RevealLine delay={100}>
          <div className="firstLine"></div>
          </RevealLine>
          <RevealLine delay={100} classname={'lineHorizontalReveal'}>
          <div className="secondLine "></div>
          </RevealLine>
            </div>
         
          </div>
  
        </div>



        <div className="col-start-7 col-end-12 relative -z-10 md:px-0 px-12">
 
          <Image
            src="https://cdn.sanity.io/images/m5ok1ygs/production/845cea8ea67a6cc9b073ecfabb0a494bbaeab527-3070x1735.png"
            width={1000}
            loading='eager'
            height={1000}
            aspectRatio='auto'
          />
                 
        </div>

      </div>
      <div className="grid content-baseline md:pt-40 two relative  pt-32">
        <div className="md:col-start-2 md:col-end-9 col-start-1 col-end-11 relative -z-10 three">

          <Image
            src="https://cdn.sanity.io/images/m5ok1ygs/production/b12081b78f70a5f2722bedb83809c94086589acc-4134x2038.png"
            width={1000}
            height={1000}
            loading='eager'
            aspectRatio='auto'
          />
       
        
                <RevealOpacity delay={200}>
          <div className="h-full w-1/3 absolute top-0 right-0 blueOverlay"></div>
          </RevealOpacity>
          <div className='absolute dotContainer'>
            <div className='relative'>
            <RevealOpacity delay={1400}>
            <div className="roundPoint"></div>
            </RevealOpacity>
      
          <RevealLine delay={1400} classname={'lineHorizontalReveal'}>
          <div className="secondLine "></div>
          </RevealLine>
            </div>
         
          </div>
        </div>
        <div className="flex  md:ml-12 items-center col-start-9 blue top-1/2 md:top-auto md:relative -right-2 md:right-0 absolute col-end-13">
          <div className="uppercase bigSubText overIt pl-12 -left-12 md:relative  noBG ">
          <RevealOpacity delay={1200}>
            REVETEMENT de NUIT
            </RevealOpacity></div>
        </div>
        <div className='absolute dotContainer'>
            <div className='relative'>
            <RevealOpacity delay={1000}>
            <div className="roundPoint"></div>
            </RevealOpacity>
      
          <RevealLine delay={1000} classname={'lineHorizontalReveal'}>
          <div className="secondLine "></div>
          </RevealLine>
            </div>
         
          </div>
      </div>
      <div className="grid content-baseline md:pt-24 three pt-12">
        <div className="md:col-start-2 md:col-end-8 col-start-1 col-end-10 relative ">
          <div className=' overIt pt-12 relative md:-top-12 -top-8'>
            <div className="uppercase yellow text-left md:text-center bigSubText pb-2">
            <RevealOpacity delay={1000}>
              REVETEMENT au soleil
              </RevealOpacity>
            </div>
            <h4 className="text-left maxch30">
            <RevealOpacity delay={1000}>

              Libérez l'enthuastif qui sommeille en vous avec l'Abart 565
              Turismo, rajouter le vrai text
              </RevealOpacity>
            </h4>
          </div>
      
        </div>
      </div>
      <div className="grid content-baseline md:pt-40 four relative pt-32">
        <div className="md:col-start-4 md:col-end-10 col-start-2 col-end-12 relative">
 
          <Image
            src="https://cdn.sanity.io/images/m5ok1ygs/production/873ff8f604740744995a8bdb4d65949151cf7e16-4295x2494.png"
            width={1000}
            height={1000}
            aspectRatio='auto'
            loading='eager'
          />
          
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
      <div className="grid content-baseline md:pt-24 pt-12">
        <div className="md:col-start-8 md:col-end-12 col-start-5 col-end-13 relative overIt md:pl-12 md:-left-12 ">
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
