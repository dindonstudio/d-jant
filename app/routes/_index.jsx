import {defer} from '@shopify/remix-oxygen';
import {Await, useLoaderData, Link} from '@remix-run/react';
import {Suspense} from 'react';
import { useLayoutEffect } from 'react';
import ImageSlider from '~/components/ImageSlider';
import ImageMarquee from '~/components/ImageMarquee';
import ticket1 from '../../public/badge_1TICKET.svg';
import ticket2 from '../../public/badge_x2TICKETS.svg';
import ticket3 from '../../public/badge_x3TICKETS.svg';
import bestOffer from '../../public/badge.BESTOFFER.svg';
import React, {useState, useEffect, useRef} from 'react';
// import  {SanityProductPage} from '~/lib/sanity';
import {Image, Money} from '@shopify/hydrogen';
import {json} from '@shopify/remix-oxygen';
import MarqueeBanner from '~/components/hero/Marquee';
// import  {SanityProductPage} from '~/lib/sanity';
import ProductOptions from '../components/ProductOptions';
import sanityClient, {createClient} from '@sanity/client';
import VideoPlayer from '~/components/VideoPlayer';
import VideoWithButtonOverlay from '~/components/VideoHero';
import {VariantSelector} from '@shopify/hydrogen';
import Etapes from '../components/Etapes';
import Decouvertes from '../components/Decouverte';
import CloseUp from '../components/CloseUp';
import TicketBar from '../components/TicketBar';

import DragSlider from '~/components/DragSlider';
import CustomButton from '~/components/CustomButton';
import VideoPresentation from '~/components/VideoPresentation';
import PerspectiveCard from '~/components/PerspectiveCard';
import FAQ from '~/components/FAQ';
import RevealTitle from '~/components/RevealTitleWrapper';
import RevealListWrapper from '~/components/RevealListWrapper';
import RevealOpacity from '~/components/RevealOpacity';
import CustomFooter from '~/components/CustomFooter';
import {CartForm} from '@shopify/hydrogen';
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
const params = {slug: 'about'};
const queryimage = `*[_type == "home" ]{
  "gallery": gallery[]{
    "url": image.asset->url
  }
}
`;
const queryimage2 = `*[_type == "home" ]{
  "gallery": gallery2[]{
    "url": image.asset->url
  }
}
`;

// Configure Sanity client
const client = createClient({
  apiVersion: 'v2022-05-01',
  dataset: 'production',
  projectId: 'm5ok1ygs',
  useCdn: false,
});

/**
 * @type {MetaFunction}
 */
export const meta = () => {
  return [{title: 'Déjanté | Avec ou sans permis'}];
};

/**
 * @param {LoaderFunctionArgs}
 */

export async function loader({context}) {
  const {storefront} = context;
  const variables = {handle: 'product'};
  const {collections} = await storefront.query(FEATURED_COLLECTION_QUERY);
  const featuredCollection = collections.nodes[0];
  const sanityData = await client.fetch(query);
  const galleryData = await client.fetch(queryimage);
  const galleryData2 = await client.fetch(queryimage2);
  const recommendedProducts = storefront.query(RECOMMENDED_PRODUCTS_QUERY);
  // Log the fetched data
  // console.log(sanityData);

  return defer({
    sanityData,
    featuredCollection,
    recommendedProducts,
    galleryData,
    galleryData2,
  });
}

export default function Homepage(sanityData, galleryData, galleryData2) {
  /** @type {LoaderReturnData} */
  const data = useLoaderData();

  const sanity = data?.sanityData?.[0];

  return (
    <div className="home">
      <div className="hero h-screen flex  flex-col z-20 relative overflow-hidden ">
        {/* <MarqueeBanner/> */}
        <VideoWithButtonOverlay sanity={sanity} />
      </div>
      <div id="rezized">
        <div className="md:pt-64 pt-32">
          <Etapes />
        </div>
        <div className="md:pt-96 pt-44">
          <Decouvertes />
        </div>
        <div className="md:pt-96 pt-44">
          <CloseUp />
        </div>

        <div id="shop" className="md:pt-96 pt-44">
          <RecommendedProducts products={data.recommendedProducts} />
        </div>
        <div className="md:pt-80 pt-20">
          <DragSlider
            galleryData={sanity.gallery}
            galleryData2={sanity.gallery2}
          />
        </div>

        <div className="">
          <CustomButton />
        </div>
        <div className="md:pt-0 pt-20">
          <VideoPresentation />
        </div>

        <div className="md:pt-96 pt-44">
          <FAQ />
        </div>
        <div className="md:pt-72 pt-32">
          <CustomFooter />
        </div>
      </div>
    </div>
  );
}

function RecommendedProducts({products}) {
  const [isMobile, setIsMobile] = useState(false); // Initially set to false
  const containerRef = useRef(null);
  useLayoutEffect(() => {
    const container = document.querySelector('.mobileSlider'); // Adjust the class name as per your structure
    if (container) {
      const containerWidth = container.offsetWidth;
      const items = container.getElementsByClassName('widthCustomItemMobile'); // Adjust the class name as per your structure
      if (items.length > 1) {
        const itemWidth = items[1].offsetWidth; // Targeting the second item
        const scrollPosition = itemWidth - (containerWidth / 2) + (itemWidth / 2);
        container.scrollLeft = scrollPosition + 25;
      }
    }
  }, []);
  
  
  
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Set isMobile state to true initially when the component mounts
    setIsMobile(true);

    // Immediately call handleResize to set the state based on current window width
    handleResize();

    // Add event listener for subsequent resize events
    window.addEventListener('resize', handleResize);

    // Cleanup function to remove event listener
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const [selectedVariants, setSelectedVariants] = useState({});
  const [currentImageIndex, setCurrentImageIndex] = useState({});

  const handleVariantChange = (productId, variantId) => {
    setSelectedVariants((prev) => ({...prev, [productId]: variantId}));
  };

  // Function to handle image navigation
  const navigateImage = (productId, direction) => {
    setCurrentImageIndex((prev) => {
      const currentIndex = prev[productId] || 0;
      const newIndex =
        direction === 'next' ? currentIndex + 1 : currentIndex - 1;
      return {...prev, [productId]: newIndex};
    });
  };
console.log(products)
  return (
    <div className="recommended-products">
      <h2 className="text-center pb-4 md:pb-0 ">
        <RevealOpacity delay={200}>CHOPE TON TICKET</RevealOpacity>
      </h2>
      <TicketBar remainingTickets={4096} />
      {/* <h4 className='text-center'>Accélérez, les places sont comptées !</h4> */}
      {/* <div className='w-full'>
        <ProgressBar/>
      </div> */}
      <Suspense fallback={<div>Loading...</div>}>
        <Await resolve={products}>
          {({products}) => (
            <RevealListWrapper
            value={false}
              reset={false}
              ref={containerRef}
              classname={'grid paddingGrid  mobileSlider '}
            >
              {products.nodes.map((product, index) => {
                const itemStyle = index === 2 && isMobile ? {opacity: 1} : {};
                const imageIndex = currentImageIndex[product.id] || 0;
                const images = product.images?.nodes || [];
                const hasNext = imageIndex < images.length - 1;
                const hasPrev = imageIndex > 0;
                const shouldDisplayProductForm = index !== 2;

                return (
                  <div
                    key={product.id}
                    className="md:col-span-4 flex-grow-0 flex-shrink-0 widthCustomItemMobile"
                    style={itemStyle}
                  >
                    <div className="relative productLink">
                      <Link
                        className="relative "
                        to={`/products/${product.handle}`}
                      >
                        <div className="relative  h-5/6">
                          <Image
                            data={images[imageIndex]}
                            aspectRatio="0.70"
                            className="w-full h-full object-cover"
                            sizes="(min-width: 45em) 20vw, 50vw"
                          />

                          {index === 0 && (
                            <div className='absolute top-2 right-2 w-24'>
       <img
                              src={ticket1}
                              alt="Ticket 1"
                              className="ticket-svg"
                            />
                            </div>
                     
                          )}
                          {index === 1 && (
                                  <div className='absolute top-2 right-2 w-24'>
                            <img
                              src={ticket2}
                              alt="Ticket 2"
                              className="ticket-svg"
                            />
                             </div>
                          )}
                          {index === 2 && (
                            <>
                                            <div className='absolute top-2 right-2 w-24'>
                              <img
                                src={ticket3}
                                alt="Ticket 3"
                                className="ticket-svg"
                              />
                                     </div>
                                     <div className='absolute top-2 left-2 w-24'>
                              <img
                                src={bestOffer}
                                alt="Best Deal"
                                className="best-deal-svg"
                              />
                                    </div>
                            </>
                          )}
                        </div>
                        <div className="flex justify-between absolute left-4 bottom-4"></div>
                      </Link>
                      <div className="hoverInfo md:opacity-0">
                        <div className="absolute top-0 h-full md:left-4 left-0 flex items-center z-10-">
                          {hasPrev && (
                            <h4
                              className="    md:scale-150 scale-100   w-full px-4  text-semiDark  uppercase cursor-pointer transition-colors duration-150"
                              onClick={() => navigateImage(product.id, 'prev')}
                            >
                              <svg width="24" height="24">
                                <path d="M20 .755l-14.374 11.245 14.374 11.219-.619.781-15.381-12 15.391-12 .609.755z" />
                              </svg>
                            </h4>
                          )}
                        </div>
                        <div>
                          <div className="absolute top-0 h-full md:right-4 right-0 opacity-75 hover:opacity-100 flex items-center z-10">
                            {hasNext && (
                              <h4
                                className="    md:scale-150 scale-100   w-full px-4  text-semiDark  uppercase cursor-pointer transition-colors duration-150"
                                onClick={() =>
                                  navigateImage(product.id, 'next')
                                }
                              >
                                <svg width="24" height="24" clipRule="evenodd">
                                  <path d="M4 .755l14.374 11.245-14.374 11.219.619.781 15.381-12-15.391-12-.609.755z" />
                                </svg>
                              </h4>
                            )}
                          </div>
                        </div>
                        {shouldDisplayProductForm && (
                          <ProductForm product={product} />
                        )}
                           <div className="text-semiDark z-10 absolute bottom-12 flex pointer-events-none  h-full w-full items-end  left-0 top-0  justify-center  group-hover:hidden md:hidden  ">
                <h5 className="uppercase relative bg-semiWhite bottom-8 px-4 pt-1 ">Voir le produit</h5>
              </div>
                      </div>
                    </div>
                    <div className="flex justify-between md:mt-6 mt-2">
                      <h5 className="capitalize">{product.title}</h5>
                      <h5>
                        <div className='flex gap-3'>
                        {index === 2 && (
                          <h5 className='line-through opacity-50'>€100,00</h5>
                          )}
                        <Money data={product.priceRange.minVariantPrice} />
                        </div>
                      
                      </h5>
                    </div>
                  </div>
                );
              })}
            </RevealListWrapper>
          )}
        </Await>
      </Suspense>
      <br />
      <h3 className='green text-center md:pt-20 pt-1'>La livraison (sous 3 à 5 jours) est offerte !</h3>
    </div>
  );
}
function ProductForm({product}) {
  // console.log(product);

  return (
    <VariantSelector
      handle={product.handle}
      options={product.options}
      variants={product.variants}
    >
      {({option}) => (
        <>
          {/* <div>{option.name}</div> */}
          <div className="md:flex justify-center items-end w-full absolute bottom-12 z-10 group hidden ">
            <div className="flex gap-8 bg-semiWhite relative">
              <div className="text-semiDark z-10  bg-semiWhite absolute h-full w-full left-0 top-0 flex justify-center items-center group-hover:hidden ">
                <h5 className="uppercase relative top-1">Ajouter au panier</h5>
              </div>

              {option.values.map((value, index) => {
                const variant = product.variants.nodes[index]; // Match variant by index
                return (
                  <div
                    key={value.id} // Assuming each value has a unique ID
                    prefetch="intent"
                    className={
                      value.isActive
                        ? 'active'
                        : value.isAvailable
                        ? ''
                        : 'opacity-80'
                    }
                  >
                    <CartForm
                      action="CustomEditInPlace"
                      inputs={{
                        addLines: [
                          {
                            merchandiseId: variant.id,
                            quantity: 1,
                          },
                        ],
                      }}
                    >
                      <button
                        type="submit"
                        onClick={() => {
                          console.log('Add to cart clicked');
                          window.location.href = '#cart-aside';
                        }}
                        className="  rounded-sm w-full px-4 pt-3 pb-2 text-semiDark bg-semiWhite uppercase hover:bg-semiDark hover:text-semiWhite transition-colors duration-150"
                      >
                        <h5>{value.value}</h5>
                      </button>
                    </CartForm>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </VariantSelector>
  );
}

/**
 * @param {{option: VariantOption}}
 */

/**
 * @param {{
 *   analytics?: unknown;
 *   children: React.ReactNode;
 *   disabled?: boolean;
 *   lines: CartLineInput[];
 *   onClick?: () => void;
 * }}
 */

export async function action({request, context}) {
  const {cart} = context;

  const formData = await request.formData();
  const {action, inputs} = CartForm.getFormInput(formData);

  let status = 200;
  let result;

  if (action === 'CustomEditInPlace') {
    result = await cart.addLines(inputs.addLines);
    // result = await cart.removeLines(inputs.removeLines);
  } else {
    invariant(false, `${action} cart action is not defined`);
  }

  const headers = cart.setCartId(result.cart.id);

  return json(result, {status, headers});
}

/**
 * @param {{
 *   products: Promise<RecommendedProductsQuery>;
 * }}
 */

/** @typedef {import('@shopify/remix-oxygen').LoaderFunctionArgs} LoaderFunctionArgs */
/** @template T @typedef {import('@remix-run/react').MetaFunction<T>} MetaFunction */
/** @typedef {import('storefrontapi.generated').FeaturedCollectionFragment} FeaturedCollectionFragment */
/** @typedef {import('storefrontapi.generated').RecommendedProductsQuery} RecommendedProductsQuery */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof loader>} LoaderReturnData */
const FEATURED_COLLECTION_QUERY = `#graphql
  fragment FeaturedCollection on Collection {
    id
    title
    image {
      id
      url
      altText
      width
      height
    }
    handle
  }
  query FeaturedCollection($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    collections(first: 1, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...FeaturedCollection
      }
    }
  }
`;

const PRODUCT_VARIANT_FRAGMENT = `#graphql
  fragment ProductVariant on ProductVariant {
    availableForSale
    compareAtPrice {
      amount
      currencyCode
    }
    id
    image {
      __typename
      id
      url
      altText
      width
      height
    }
    price {
      amount
      currencyCode
    }
    product {
      title
      handle
    }
    selectedOptions {
      name
      value
    }
    sku
    title
    unitPrice {
      amount
      currencyCode
    }
  }
`;
const RECOMMENDED_PRODUCTS_QUERY = `#graphql
  fragment RecommendedProductVariant on ProductVariant {
    id
    title
    availableForSale
    price {
      amount
      currencyCode
    }
    image {
      id
      url
      altText
      width
      height
    }
    selectedOptions {
      name
      value
    }
  }

  fragment RecommendedProduct on Product {
    id
    title
    handle
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
    options {
      name
      values
    }
    
    images(first: 3) {
      nodes {
        id
        url
        altText
        width
        height
      }
    }
    variants(first: 250) {
      nodes {
        ...RecommendedProductVariant
      }
    }
  }

  query RecommendedProducts($country: CountryCode, $language: LanguageCode)
  @inContext(country: $country, language: $language) {
    products(first: 3, sortKey: CREATED_AT) {
      nodes {
        ...RecommendedProduct
      }
    }
  }
`;
