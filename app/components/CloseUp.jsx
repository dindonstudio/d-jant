import React from 'react';
import { Image } from '@shopify/hydrogen';
import RevealOpacity from '~/components/RevealOpacity';

function CloseUp(props) {
  const { text, onClick } = props;

  return (
   <div className='px-8'>
    <h2 className='uppercase  chroma'>
    <RevealOpacity delay={200}>
      Un bon close up?
      </RevealOpacity>
     </h2>
    <div className='w-full pt-12'>
    <RevealOpacity delay={200}>
            <Image
            src="https://cdn.sanity.io/images/m5ok1ygs/production/a21fffc9b54c22ab2292a53b65f97c1dad56db07-3648x5472.jpg"
            width={1000}
            height={1000}
            loading='eager'
            className='w-full'
          />
            </RevealOpacity>

    </div>

   </div>
  );
}

export default CloseUp;
