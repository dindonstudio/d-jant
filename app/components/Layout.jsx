import {defer} from '@shopify/remix-oxygen';
import {Suspense} from 'react';
import {Await, useLoaderData, Link} from '@remix-run/react';
import {Aside} from '~/components/Aside';

import {Header, HeaderMenu} from '~/components/Header';
import sanityClient, {createClient} from '@sanity/client';
import LanguageContext from './LanguageContext';
import {CartMain} from '~/components/Cart';

import {useEffect, useState} from 'react';
import {
  PredictiveSearchForm,
  PredictiveSearchResults,
} from '~/components/Search';

/**
 * @param {LayoutProps}
 */

const query = `*[_type == 'home' ]
  {
  ...,
    "gallery": gallery[]{
      "url": image.asset->url
    },
    "gallery2": gallery2[]{
      "url": image.asset->url
    }
  }`;
const client = createClient({
  apiVersion: 'v2022-05-01',
  dataset: 'production',
  projectId: 'm5ok1ygs',
  useCdn: false,
});
export async function loader({context}) {
  const {storefront} = context;
  const sanityData = await client.fetch(query);
  console.log('KKK');
  // Log the fetched data
  // console.log(sanityData);

  return defer({
    sanityData,
  });
}
export function Layout({
  cart,
  children = null,
  footer,
  header,
  isLoggedIn,
  sanityData,
  language,
}) {
  const data = useLoaderData();
  // Using the selected language to determine which data to fetch
  const sanity =
    language === 'en' ? data?.sanityData?.[1] : data?.sanityData?.[0];
  console.log(sanity);

  useEffect(() => {
    // Triggering a reflow
    const resizer = document.getElementById('rezized');
    const triggerReflow = () => {
      // You can access any DOM element. Here, document.body is used as an example.
      setTimeout(() => {
        resizer.style.width = '95%'; // Trigger reflow
      }, 1500);
      setTimeout(() => {
        resizer.style.width = '100%'; // Trigger reflow
      }, 1550);
    };

    triggerReflow();

    // Cleanup
    return () => {};
  }, []);
  return (
    <>
      <LanguageContext.Provider value={language}>
        <CartAside sanity={sanity} cart={cart} />
        <SearchAside />
        <MobileMenuAside menu={header.menu} shop={header.shop} />
        {/* <a onClick={toggleLanguage}>
        {language === 'fr' ? 'Switch to English' : 'Passer au français'}
      </a> */}
        <Header
          sanity={sanity}
          header={header}
          cart={cart}
          isLoggedIn={isLoggedIn}
        />
        <main>{children}</main>
        {/* <Suspense>
        <Await resolve={footer}>
          {(footer) => <Footer menu={footer.menu} shop={header.shop} />}
        </Await>
      </Suspense> */}
      </LanguageContext.Provider>
    </>
  );
}

/**
 * @param {{cart: LayoutProps['cart']}}
 */
function CartAside({cart, sanity}) {
  return (
    <Aside id="cart-aside" sanity={sanity} heading="CART">
      <Suspense fallback={<p>Loading cart ...</p>}>
        <Await resolve={cart}>
          {(cart) => {
            return <CartMain sanity={sanity} cart={cart} layout="aside" />;
          }}
        </Await>
      </Suspense>
    </Aside>
  );
}

function SearchAside() {
  return (
    <Aside id="search-aside" heading="SEARCH">
      <div className="predictive-search">
        <br />
        <PredictiveSearchForm>
          {({fetchResults, inputRef}) => (
            <div>
              <input
                name="q"
                onChange={fetchResults}
                onFocus={fetchResults}
                placeholder="Search"
                ref={inputRef}
                type="search"
              />
              &nbsp;
              <button type="submit">Search</button>
            </div>
          )}
        </PredictiveSearchForm>
        <PredictiveSearchResults />
      </div>
    </Aside>
  );
}

/**
 * @param {{
 *   menu: HeaderQuery['menu'];
 *   shop: HeaderQuery['shop'];
 * }}
 */
function MobileMenuAside({menu, shop}) {
  return (
    <Aside id="mobile-menu-aside" heading="MENU">
      <HeaderMenu
        menu={menu}
        viewport="mobile"
        primaryDomainUrl={shop.primaryDomain.url}
      />
    </Aside>
  );
}

/**
 * @typedef {{
 *   cart: Promise<CartApiQueryFragment | null>;
 *   children?: React.ReactNode;
 *   footer: Promise<FooterQuery>;
 *   header: HeaderQuery;
 *   isLoggedIn: boolean;
 * }} LayoutProps
 */

/** @typedef {import('storefrontapi.generated').CartApiQueryFragment} CartApiQueryFragment */
/** @typedef {import('storefrontapi.generated').FooterQuery} FooterQuery */
/** @typedef {import('storefrontapi.generated').HeaderQuery} HeaderQuery */
