import React from 'react';

const CustomFooter = () => {
  return (
    <footer className="bg-semiWhite text-semiDark flex gap-8 md:gap-4 flex-col md:flex-row justify-between items-center py-10 md:px-8">
    
    
      <ul className="flex md:gap-4 md:flex-row flex-col md:justify-end items-center order-1 flex-1">
        <div className='flex gap-6'>
        <li>
            <a href="/policies/refund-policy">
              {' '}
              <h5>Réglement du concours</h5>
            </a>
          </li>
          <li>
            <a href="/policies/privacy-policy">
              <h5>Politique de confidentialité</h5>
            </a>
          </li>
       
        </div>
        <div className='flex gap-4'>
          <li>
            <a href="/policies/shipping-policy">
              {' '}
              <h5>Politique de livraison</h5>
            </a>
          </li>
          <li>
            <a href="/policies/terms-of-service">
              <h5>CGU / CGV</h5>
            </a>
          </li>
        </div>
      </ul>
      <h4 className="uppercase flex-1 text-center order-2 ">- Déjanté avec ou sans permis -</h4>
      <div className="flex md:gap-4 md:flex-col flex-col justify-start order-3 flex-1">
        <div className='flex gap-4'>
        <a
          href="https://www.instagram.com/dejante_fr/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h5>Instagram</h5>
        </a>
        <a
          href="https://www.twitter.com/dejantefr"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h5>          Twitter</h5>

        </a>
        <a
          href="https://www.twitter.com/dejantefr"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h5>          Facebook</h5>

        </a>
        <a
          href="https://www.twitter.com/dejantefr"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h5>          Youtube</h5>

        </a>
        <a
          href="https://www.twitter.com/dejantefr"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h5>          Pinterest</h5>

        </a>
        <a
          href="https://www.twitter.com/dejantefr"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h5>          TikTok</h5>

        </a>
        {/* <a
          href="https://www.ticktock.com/me"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h4>
          TikTok
          </h4>

        </a> */}
        <a href="mailto:contact@dejante.co"><h5>contact@dejante.co</h5></a>
      </div>
        </div>
      
    </footer>
  );
};

export default CustomFooter;
