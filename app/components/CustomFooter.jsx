import React from 'react';

const CustomFooter = () => {
  return (
    <footer className="bg-semiWhite text-semiDark flex gap-4 flex-col justify-center items-center py-8">
      <h3 className="uppercase">Déjanté avec ou sans permis</h3>
      <li>
            <a href="/policies/legal-notice">
              <h5>Réglement du concours</h5>
            </a>
          </li>
      <ul className="flex md:gap-8 md:flex-row flex-col items-center">
        <div className='flex gap-4'>
          <li>
            <a href="/policies/privacy-policy">
              <h5>Politique de confidentialité</h5>
            </a>
          </li>
          <li>
            <a href="/policies/refund-policy">
              {' '}
              <h5>Politique de remboursement</h5>
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
              <h5>Conditions d'utilisation</h5>
            </a>
          </li>
        </div>
      </ul>
      <div className="flex gap-8 md:pt-4 pt-8">
        <a
          href="https://www.instagram.com/dejante_fr/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h4>Instagram</h4>
        </a>
        <a
          href="https://www.twitter.com/dejantefr"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h4>          Twitter</h4>

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
        <a href="mailto:contact@dejante.co"><h4>contact@dejante.co</h4></a>
      </div>
    </footer>
  );
};

export default CustomFooter;
