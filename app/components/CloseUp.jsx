import React from 'react';
import { Image } from '@shopify/hydrogen';
import RevealOpacity from '~/components/RevealOpacity';

function CloseUp(props) {
  const { text, onClick } = props;

  return (
   <div className=''>
    <div className='px-8'>
    <h2 className='uppercase  chroma'>
    <RevealOpacity delay={200}>
      Un bon close up?
      </RevealOpacity>
     </h2>
    </div>

    <div className='w-full pt-12'>
    <RevealOpacity delay={200}>
            <Image
            src="https://cdn.sanity.io/images/m5ok1ygs/production/9d1cd0dfc5e712b0edacfe2453be1ba7d05fc76c-1121x1500.jpg?auto=format"
            width={1000}
            height={1000}
            loading='eager'
            aspectRatio='auto'
            className='w-full'
          />
            </RevealOpacity>

    </div>

   </div>
  );
}

export default CloseUp;
