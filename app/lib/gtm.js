// src/components/GoogleTagManager.tsx

import React from 'react';

const GoogleTagManager= () => {
 
    return (
        <noscript>
            <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-M3TNRC59"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
        ></iframe>
        </noscript>
      )
};

export default GoogleTagManager;
