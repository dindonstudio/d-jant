import {Await, NavLink} from '@remix-run/react';
import {Suspense} from 'react';
import {useRootLoaderData} from '~/root';
import MyButtonHeader from './ButtonHeader';
import {Image} from '@shopify/hydrogen';
import {logo} from '../../public/DEJANTE_LOGO.RED.svg';
/**
 * @param {HeaderProps}
 */
export function Header({header, isLoggedIn, cart,sanity}) {
  console.log(sanity)
  const {shop, menu} = header;
  const logoUrl = '../../public/DEJANTE_LOGO.RED.svg';
  
  return (
    <header className="header fadeInDown pt-0 justify-between md:h-40 w-full flex fixed items-center gap-8 z-40 md:px-8 px-6">
      <div className='flex-1 participate'>
        <div className='flex relative md:-top-4 -top-6'>
        <MyButtonHeader text={sanity.participateButton} />
        </div>

      </div>
      <div className="md:w-64 w-36 svgLogo relative md:top-0 -top-5 ">
        <SvgComponent />
      </div>
      <div className='flex-1 relative md:-top-6 -top-7 '>
        <div className='flex justify-end gap-8 '>
  
        <HeaderCtas isLoggedIn={isLoggedIn} cart={cart} />
        </div>

      </div>
    </header>
  );
}

/**
 * @param {{
 *   menu: HeaderProps['header']['menu'];
 *   primaryDomainUrl: HeaderQuery['shop']['primaryDomain']['url'];
 *   viewport: Viewport;
 * }}
 */
export function HeaderMenu({menu, primaryDomainUrl, viewport}) {
  const {publicStoreDomain} = useRootLoaderData();
  const className = `header-menu-${viewport}`;

  function closeAside(event) {
    if (viewport === 'mobile') {
      event.preventDefault();
      window.location.href = event.currentTarget.href;
    }
  }

  return (
    <nav className={className} role="navigation">
      {viewport === 'mobile' && (
        <NavLink
          end
          onClick={closeAside}
          prefetch="intent"
          style={activeLinkStyle}
          to="/"
        >
          Home
        </NavLink>
      )}
      {(menu || FALLBACK_HEADER_MENU).items.map((item) => {
        if (!item.url) return null;

        // if the url is internal, we strip the domain
        const url =
          item.url.includes('myshopify.com') ||
          item.url.includes(publicStoreDomain) ||
          item.url.includes(primaryDomainUrl)
            ? new URL(item.url).pathname
            : item.url;
        return (
          <NavLink
            className="header-menu-item"
            end
            key={item.id}
            onClick={closeAside}
            prefetch="intent"
            style={activeLinkStyle}
            to={url}
          >
            {item.title}
          </NavLink>
        );
      })}
    </nav>
  );
}

/**
 * @param {Pick<HeaderProps, 'isLoggedIn' | 'cart'>}
 */
function HeaderCtas({isLoggedIn, cart}) {
  return (
    <nav className="font2rem pt-2" role="navigation">
      <CartToggle cart={cart} />
    </nav>
  );
}

function HeaderMenuMobileToggle() {
  return (
    <a className="header-menu-mobile-toggle" href="#mobile-menu-aside">
      <h3>☰</h3>
    </a>
  );
}

function SearchToggle() {
  return <a href="#search-aside">Search</a>;
}

/**
 * @param {{count: number}}
 */
function CartBadge({ count }) {

  return (
    <h5 className='md:mt-1'>
    <a href="#cart-aside"class="relative flex items-center justify-center w-11 h-11 md:w-14 focus:ring-primary/5"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-24 h-24"><title>Bag</title><path fill-rule="evenodd" d="M8.125 5a1.875 1.875 0 0 1 3.75 0v.375h-3.75V5Zm-1.25.375V5a3.125 3.125 0 1 1 6.25 0v.375h3.5V15A2.625 2.625 0 0 1 14 17.625H6A2.625 2.625 0 0 1 3.375 15V5.375h3.5ZM4.625 15V6.625h10.75V15c0 .76-.616 1.375-1.375 1.375H6c-.76 0-1.375-.616-1.375-1.375Z"></path></svg><div class="text-contrast cartBuble bg-primary absolute bottom-1 right-1 text-[0.625rem] font-medium subpixel-antialiased h-3 min-w-[0.75rem] bg-semiWhite flex items-center justify-center leading-none  text-center text-lg text-semiDarl bg-semiwhite rounded-full w-auto px-[0.125rem] pb-px"><span>{count}</span></div></a>

    </h5>
  );
}


/**
 * @param {Pick<HeaderProps, 'cart'>}
 */
function CartToggle({cart}) {
  return (
    <Suspense fallback={<CartBadge count={0} />}>
      <Await resolve={cart}>
        {(cart) => {
          if (!cart) return <CartBadge count={0} />;
          return <CartBadge count={cart.totalQuantity || 0} />;
        }}
      </Await>
    </Suspense>
  );
}

const FALLBACK_HEADER_MENU = {
  id: 'gid://shopify/Menu/199655587896',
  items: [
    {
      id: 'gid://shopify/MenuItem/461609500728',
      resourceId: null,
      tags: [],
      title: 'Collections',
      type: 'HTTP',
      url: '/collections',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461609533496',
      resourceId: null,
      tags: [],
      title: 'Blog',
      type: 'HTTP',
      url: '/blogs/journal',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461609566264',
      resourceId: null,
      tags: [],
      title: 'Policies',
      type: 'HTTP',
      url: '/policies',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461609599032',
      resourceId: 'gid://shopify/Page/92591030328',
      tags: [],
      title: 'About',
      type: 'PAGE',
      url: '/pages/about',
      items: [],
    },
  ],
};

const SvgComponent = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    id="Layer_1"
    x={0}
    y={0}
    style={{
      enableBackground: 'new 0 0 800 800',
    }}
    viewBox="0 0 800 800"
    {...props}
  >
    <style>{'.st0{fill:#ce2029}.st1{fill:#fff}'}</style>
    <path
      fill="#ce2029"
      d="M762.31 339.77c-.86-27.74-6.72-41.6-17.51-43.62-11.58-2.16-23.17-5.13-34.76-6.36-80.28-8.45-160.56-17.85-240.85-24.38-86.91-7.07-173.81-3.07-260.69 3.88-50.74 2.14-101.44 6.55-152.08 15.56-9.86 1.76-16.84 10.54-18.11 38.19-1.88 41-1.44 81.71 1.31 122.35 1.19 17.65 5.93 25.09 12.38 27.44 46.37 16.92 93.11 24.51 139.79 32.98 67.56 12.25 135.15 26.76 202.81 31.57 69.65 4.96 139.24-10.99 208.74-22.8 46.04-7.83 92.04-16.93 138.05-25.22 9.08-1.64 15.86-9.75 18.01-34.1 3.34-38.13 4.1-76.59 2.91-115.49zm-89.08-.29c.53-1.15 2.1-2.01 3.21-2.06 5.32-.21 10.65-.09 15.98-.09.29.71.57 1.42.86 2.14-6.63 8.59-12.92 17.73-20.08 25.44-2.52 2.71-7.18 1.93-12.49 3.12 4.74-10.89 8.52-19.8 12.52-28.55zm-407.39-.12c.47-1.02 1.76-1.9 2.68-1.92 5.52-.18 11.03-.09 16.55-.09.24.72.49 1.46.74 2.18-6.66 8.57-12.97 17.7-20.17 25.41-2.52 2.7-7.16 1.9-12.46 3.04 4.81-10.96 8.66-19.85 12.66-28.62zm-102.52 97.31c-18.78 8.68-38.18 7.23-58.13 6.99.44-2.34.7-4.4 1.22-6.36 7.59-28.62 15.27-57.19 22.72-85.88 1.15-4.45 2.65-6.31 6.31-6.11 6.85.37 13.72.1 21.44.1-7.43 27.96-14.55 54.8-22.1 83.26 4.54-.87 8.4-.99 11.96-2.43 21.58-8.67 36.18-26.84 41.64-56.34 2.86-15.49-.78-35.63-19.09-36.21-22.73-.74-45.49-.69-68.23-.96-2.17-.03-4.35-.01-7.61-.01 3.65-8.05 6.66-15.04 9.98-21.77.61-1.23 2.48-1.91 3.77-1.92 24.44-.08 48.87-.15 73.31.13 3.84.05 7.74 1.41 11.49 2.78 22.4 8.18 31.86 31.48 24.1 60.49-8.99 33.61-28.18 52.88-52.78 64.24zm541.54 6.84c-18.62.22-37.25-.48-55.88-1-8.45-.23-14.94-6.36-21.06-13.28.01.02.01.03.01.06h-.14c-1.33 8.61-6.17 14.15-13.95 14.38-14 .4-28 .45-41.98-.13-3.12-.14-6.15-3.47-10.29-5.99-5.48 7.32-13.94 6.37-22.27 6.29-7.29-.08-14.56.14-21.84-.08-7-.2-9.86-5.19-7.96-14.13 1.34-6.38 3.21-12.57 4.16-19.77-6.24 7.02-12.7 13.73-18.66 21.16-8.95 11.15-19.22 15.29-31.55 12.03.25-2.03.52-4.11.91-7.26-8.41 10.4-18.37 8.21-27.78 7.68-9.17-.53-19.6 4.83-27.34-8.13-5.28 5.84-11.24 10.27-18.73 10.04-7.59-.22-13.1-4.76-17.27-13.57-5.53 11.82-14.01 12.24-22.8 12.07-10.94-.22-10.96-.07-15.03 13.59-4.33 14.56-12.35 23.1-23.88 26.01-14.17 3.56-24.92-10.68-22.33-29.66.43-3.11 1.1-6.17 1.79-10-13.58 0-26.8.34-40-.16-5.88-.23-11.96-1.21-17.56-3.54-15.13-6.28-19.57-29.29-9.15-45.34 6.19-9.53 14.43-14.52 23.47-15.36 9.6-.9 19.33.13 28.95 1.11 3.16.32 6.39 2.68 9.18 4.96 5.03 4.1 6.88 11.55 4.78 18.76-1.94 6.68-5.17 10.95-11.38 10.25-5.92-.67-11.92-.14-18.86-.14 2.44-6.87 4.6-12.94 7.29-20.48-4.74 0-8.9-.25-13 .18-1.07.11-2.48 2.16-2.92 3.73-1.89 6.69-3.48 13.5-5.13 20.32-1.31 5.48.62 8.56 4.52 9.69 1.99.57 4.08.75 6.12.72 18.27-.18 36.56-.56 54.83-.57 3.38 0 4.83-1.47 5.91-5.67 3.35-13.08 6.95-26.05 10.79-38.89.61-2.01 2.92-4.3 4.52-4.4 7.25-.47 14.52-.21 22.65-.21-4.35 16.52-8.5 32.42-12.89 49.09h28.32c.2-4.82.02-9.75.64-14.51 2.46-18.89 14.68-33.12 31.01-34.24 15.42-1.05 30.91-.22 47.08-.22-4.4 16.28-8.64 31.96-13.26 49 9.9 0 19.1.18 28.28-.24 1.09-.05 2.52-3.2 3.08-5.24 3.52-12.74 6.93-25.53 10.14-38.42.95-3.84 2.16-5.53 5.43-5.35 7.08.39 14.17.13 22.03.13-2.42 9.46-4.7 18.34-6.97 27.22.3.32.6.64.9.97 6.08-6.61 12.18-13.18 18.23-19.84 6.18-6.78 12.89-11.68 21.24-11.36 4.58.18 7.05 3.11 6.83 9.16-.14 3.63-.61 7.37-1.47 10.81-2.62 10.53-5.51 20.93-8.64 32.69 9.08 0 17.73.07 26.39-.13.78-.02 1.94-1.58 2.26-2.74 2.81-10.14 5.47-20.34 8.46-31.59h-10.55c.55-11.14 2.49-15.29 9.14-17.83 11-4.2 18.53-13.89 23.43-26.81 2.99-7.88 6.72-10.87 13-9.4 1.44.33 2.96.05 5.27.05-3.36 13.07-6.54 25.46-9.94 38.73h17.58c-1.95 9.61-6.81 14.8-15.02 14.66-5.43-.09-7.99 2.46-9.37 9.22-1.68 8.28-4.04 16.31-6.69 26.7h37.86c.01-.06.02-.1.03-.16.03.03.07.07.09.1-.57-5.06-1.72-10.15-1.62-15.18.25-11.39 4.19-20.7 11.65-26.35 17-12.87 35.05-12.14 52.81-4.04 9.62 4.38 10.92 19.55 3.46 28.2-.93 1.08-2.17 2.34-3.29 2.38-7.39.22-14.78.11-23.05.11 2.56-7.17 4.74-13.26 7.36-20.57-4.66 0-8.5-.31-12.3.17-1.29.17-3.06 2.02-3.54 3.66-1.96 6.64-3.57 13.47-5.2 20.28-1.4 5.85.65 9.11 4.88 9.94 3.12.61 6.32.68 9.48.69 16.57.06 33.13.02 49.77.02-.83 8.38-5.95 14.89-13.47 14.97z"
      className="st0"
    />
    <path
      fill="#fff"
      d="M285.8 339.53c-6.66 8.57-12.97 17.7-20.17 25.41-2.52 2.7-7.16 1.9-12.46 3.04 4.81-10.95 8.66-19.85 12.66-28.62.47-1.02 1.76-1.9 2.68-1.92 5.52-.18 11.03-.09 16.55-.09.25.72.5 1.46.74 2.18zM693.28 339.47c-6.63 8.59-12.92 17.73-20.08 25.44-2.52 2.71-7.18 1.93-12.49 3.12 4.74-10.89 8.52-19.8 12.52-28.55.53-1.15 2.1-2.01 3.21-2.06 5.32-.21 10.65-.09 15.98-.09.29.72.58 1.43.86 2.14zM718.33 428.55c-.83 8.37-5.94 14.88-13.47 14.96-18.62.22-37.25-.48-55.88-1-8.45-.23-14.94-6.36-21.06-13.28-.57-5.06-1.72-10.15-1.62-15.18.25-11.39 4.19-20.7 11.65-26.35 17-12.87 35.05-12.14 52.81-4.04 9.62 4.38 10.92 19.55 3.46 28.2-.93 1.08-2.17 2.34-3.29 2.38-7.39.22-14.78.11-23.05.11 2.56-7.17 4.74-13.26 7.36-20.57-4.66 0-8.5-.31-12.3.17-1.29.17-3.06 2.02-3.54 3.66-1.96 6.64-3.57 13.47-5.2 20.28-1.4 5.85.65 9.11 4.88 9.94 3.12.61 6.32.68 9.48.69 16.57.06 33.12.03 49.77.03zM589.94 429.28c2.65-10.39 5.01-18.42 6.69-26.7 1.38-6.76 3.94-9.31 9.37-9.22 8.21.14 13.07-5.05 15.02-14.66h-17.58c3.4-13.26 6.58-25.66 9.94-38.73-2.31 0-3.83.29-5.27-.05-6.27-1.47-10.01 1.52-13 9.4-4.9 12.93-12.43 22.62-23.43 26.81-6.64 2.54-8.59 6.7-9.14 17.83h10.55c-2.99 11.25-5.64 21.46-8.46 31.59-.32 1.16-1.48 2.72-2.26 2.74-8.65.2-17.31.13-26.39.13 3.13-11.76 6.02-22.16 8.64-32.69.86-3.45 1.33-7.18 1.47-10.81.22-6.05-2.25-8.98-6.83-9.16-8.35-.32-15.05 4.58-21.24 11.36-6.05 6.65-12.16 13.23-18.23 19.84-.3-.33-.6-.65-.9-.97 2.27-8.88 4.55-17.76 6.97-27.22-7.86 0-14.95.26-22.03-.13-3.27-.17-4.48 1.52-5.43 5.35-3.21 12.89-6.62 25.68-10.14 38.42-.56 2.04-1.99 5.2-3.08 5.24-9.18.42-18.38.24-28.28.24 4.62-17.04 8.86-32.72 13.26-49-16.17 0-31.66-.83-47.08.22-16.33 1.13-28.55 15.35-31.01 34.24-.62 4.76-.45 9.69-.64 14.51h-28.32c4.38-16.68 8.54-32.57 12.89-49.09-8.13 0-15.4-.26-22.65.21-1.6.1-3.91 2.39-4.52 4.4-3.84 12.84-7.44 25.81-10.79 38.89-1.08 4.19-2.53 5.67-5.91 5.67-18.27.01-36.55.39-54.83.57-2.04.02-4.14-.15-6.12-.72-3.9-1.13-5.83-4.21-4.52-9.69 1.64-6.82 3.24-13.63 5.13-20.32.44-1.57 1.85-3.61 2.92-3.73 4.1-.44 8.25-.18 13-.18-2.69 7.54-4.85 13.61-7.29 20.48 6.94 0 12.94-.53 18.86.14 6.21.7 9.44-3.57 11.38-10.25 2.1-7.2.25-14.65-4.78-18.76-2.79-2.29-6.02-4.64-9.18-4.96-9.62-.99-19.35-2.01-28.95-1.11-9.03.84-17.27 5.84-23.47 15.36-10.42 16.04-5.98 39.06 9.15 45.34 5.59 2.33 11.68 3.31 17.56 3.54 13.21.51 26.42.16 40 .16-.69 3.83-1.37 6.89-1.79 10-2.6 18.99 8.16 33.22 22.33 29.66 11.54-2.91 19.55-11.45 23.88-26.01 4.07-13.66 4.09-13.81 15.03-13.59 8.79.17 17.27-.24 22.8-12.07 4.17 8.81 9.69 13.35 17.27 13.57 7.49.23 13.46-4.2 18.73-10.04 7.74 12.95 18.17 7.6 27.34 8.13 9.41.53 19.36 2.72 27.78-7.68-.39 3.15-.65 5.23-.91 7.26 12.33 3.26 22.59-.88 31.55-12.03 5.97-7.43 12.42-14.14 18.66-21.16-.95 7.2-2.81 13.39-4.16 19.77-1.9 8.94.96 13.94 7.96 14.13 7.28.22 14.55 0 21.84.08 8.33.08 16.79 1.03 22.27-6.29 4.14 2.52 7.17 5.85 10.29 5.99 13.98.57 27.98.53 41.98.13 7.78-.23 12.62-5.77 13.95-14.38h-37.85zM306.6 469.59c-5.57-9.31-2.49-20.96 6.68-24.72-2.31 8.52-4.43 16.38-6.68 24.72zm106.2-45.51c-1.32 5.78-4.37 4.64-7.11 3.99-3.4-.8-7.06-2.86-6.22-8.49 1.15-7.69 3.12-15.19 5.04-22.63.32-1.25 2.22-2.4 3.45-2.51 3.88-.32 7.78-.11 12.78-.11-2.93 10.82-5.75 20.16-7.94 29.75zM216.1 372.43c-8.99 33.61-28.18 52.87-52.78 64.24-18.78 8.68-38.18 7.23-58.13 6.99.44-2.34.7-4.4 1.22-6.36 7.59-28.62 15.27-57.19 22.72-85.88 1.15-4.45 2.65-6.31 6.31-6.11 6.85.37 13.72.1 21.44.1-7.43 27.96-14.55 54.8-22.1 83.26 4.54-.87 8.4-.99 11.96-2.43 21.58-8.67 36.18-26.84 41.64-56.34 2.86-15.49-.78-35.63-19.09-36.21-22.73-.74-45.49-.69-68.23-.96-2.17-.03-4.35-.01-7.61-.01 3.65-8.05 6.66-15.04 9.98-21.77.61-1.23 2.48-1.91 3.77-1.92 24.44-.08 48.87-.15 73.31.13 3.84.05 7.74 1.41 11.49 2.78 22.4 8.18 31.86 31.47 24.1 60.49z"
      className="st1"
    />
    <path
      fill="#fff"
      d="M420.72 394.32c-2.92 10.83-5.73 20.17-7.93 29.75-1.32 5.78-4.37 4.64-7.11 3.99-3.4-.8-7.06-2.86-6.22-8.49 1.15-7.69 3.12-15.19 5.04-22.63.32-1.25 2.22-2.4 3.45-2.51 3.87-.31 7.78-.11 12.77-.11zM313.27 444.87c-2.31 8.53-4.42 16.39-6.68 24.72-5.57-9.31-2.49-20.96 6.68-24.72z"
      className="st0"
    />
  </svg>
);
export default SvgComponent;
/**
 * @param {{
 *   isActive: boolean;
 *   isPending: boolean;
 * }}
 */
function activeLinkStyle({isActive, isPending}) {
  return {
    fontWeight: isActive ? 'bold' : undefined,
    color: isPending ? 'grey' : 'black',
  };
}

/** @typedef {Pick<LayoutProps, 'header' | 'cart' | 'isLoggedIn'>} HeaderProps */
/** @typedef {'desktop' | 'mobile'} Viewport */

/** @typedef {import('storefrontapi.generated').HeaderQuery} HeaderQuery */
/** @typedef {import('./Layout').LayoutProps} LayoutProps */
