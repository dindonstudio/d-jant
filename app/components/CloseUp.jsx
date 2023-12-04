import React from 'react';
import { Image } from '@shopify/hydrogen';
import RevealOpacity from '~/components/RevealOpacity';

function CloseUp(props) {
  const {sanity} = props;

  return (
   <div className='closeUp'>
    <div className='md:px-8 px-6'>
    <h2 className='uppercase  chroma'>
    <RevealOpacity delay={200}>
  {sanity.closeUp}
      </RevealOpacity>
     </h2>
    </div>

    <div className='w-full md:pt-12 pt-8'>
    <RevealOpacity delay={200}>
            <Image
            src="https://cdn.sanity.io/images/m5ok1ygs/production/9d1cd0dfc5e712b0edacfe2453be1ba7d05fc76c-1121x1500.jpg?auto=format"
            width={1000}
            height={1000}
            loading='eager'
            onLoad={console.log('loaded')}
            aspectRatio='auto'
            className='w-full'
          />
            </RevealOpacity>

    </div>

   </div>
  );
}

export default CloseUp;
