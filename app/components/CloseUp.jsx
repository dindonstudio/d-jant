import React from 'react';
import { Image } from '@shopify/hydrogen';
function CloseUp(props) {
  const { text, onClick } = props;

  return (
   <div className='px-8'>
    <h2 className='uppercase pb-4'>Un bon close up?</h2>
    <div className='w-full'>
    <Image
            src="https://cdn.sanity.io/images/m5ok1ygs/production/a21fffc9b54c22ab2292a53b65f97c1dad56db07-3648x5472.jpg"
            width={1000}
            height={1000}
            className='w-full'
          />
    </div>

   </div>
  );
}

export default CloseUp;
