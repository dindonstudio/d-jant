import {defer} from '@shopify/remix-oxygen';
import {Await, useLoaderData, Link} from '@remix-run/react';
import {Suspense} from 'react';
import ImageSlider from '~/components/ImageSlider';
import ImageMarquee from '~/components/ImageMarquee';
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
        <div className="md:pt-96 pt-20">
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
              reset={false}
              classname={'grid paddingGrid  mobileSlider '}
            >
              {products.nodes.map((product, index) => {
                 const itemStyle = index === 2 && isMobile ? { opacity: 1 } : {};
                const imageIndex = currentImageIndex[product.id] || 0;
                const images = product.images?.nodes || [];
                const hasNext = imageIndex < images.length - 1;
                const hasPrev = imageIndex > 0;
                const shouldDisplayProductForm = index !== 2;

                return (
                  <div key={product.id} className="md:col-span-4 flex-grow-0 flex-shrink-0 widthCustomItemMobile"
                  style={itemStyle}>
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
                          {/* <PerspectiveCard number={index + 1} /> */}
                          <div class="ribbon-wrapper">
                            <div class="ribbon-content flex justify-center gap-1">
                          <div className='customTop relative'>
                          {index + 1}X
                          </div>
                      
                              <div className='h-4 relative -top-4'>
                                <svg
                                  key={index}
                                  version="1.1"
                                  x="0px"
                                  y="0px"
                                  height="32px"
                                  viewBox="0 0 256 191"
                                  enableBackground="new 0 0 256 256"
                                  xmlSpace="preserve"
                                >
                                  <metadata>
                                    {' '}
                                    Svg Vector Icons :
                                    http://www.onlinewebfonts.com/icon{' '}
                                  </metadata>
                                  <g>
                                    <g>
                                      <path d="M147.8,113.1h-5.3l-14.7,14.7v-14.7H124v29.7h3.9v-10.3l4.8-4.7l10.5,15h5.2l-13-17.7L147.8,113.1z M111.2,138.1c-1.5,1.3-3.4,1.9-5.6,1.9c-1.8,0-3.5-0.5-5-1.4c-1.5-0.9-2.7-2.3-3.4-4.2c-0.7-1.9-1.1-4.1-1.1-6.6c0-2,0.3-3.9,0.9-5.7c0.6-1.9,1.7-3.3,3.2-4.4c1.5-1.1,3.4-1.6,5.7-1.6c2,0,3.6,0.5,4.9,1.5c1.3,1,2.3,2.6,3,4.7l3.9-0.9c-0.8-2.7-2.2-4.9-4.2-6.4c-2-1.5-4.5-2.3-7.5-2.3c-2.6,0-5,0.6-7.2,1.8s-3.9,3-5,5.3c-1.2,2.3-1.8,5-1.8,8.1c0,2.8,0.5,5.5,1.6,8c1,2.5,2.6,4.4,4.6,5.7c2,1.3,4.6,1.9,7.8,1.9c3.1,0,5.7-0.8,7.8-2.6c2.1-1.7,3.6-4.2,4.4-7.4l-3.9-1C113.8,134.9,112.8,136.8,111.2,138.1z M81.4,142.8h3.9v-29.7h-3.9V142.8z M53.8,116.6h9.8v26.2h3.9v-26.2h9.8v-3.5H53.8V116.6L53.8,116.6z M156.7,129.2H173v-3.5h-16.4v-9.1h17.4v-3.5h-21.4v29.7h22.1v-3.5h-18.1L156.7,129.2L156.7,129.2z M210.6,81.1H45.4c-7.8,0-14.1,6.4-14.1,14.2v65.3c0,7.8,6.3,14.2,14.1,14.2h165.2c7.8,0,14.1-6.4,14.1-14.2V95.3C224.7,87.5,218.4,81.1,210.6,81.1z M216.5,160.7c0,3.3-2.6,5.9-5.9,5.9H45.4c-3.3,0-5.9-2.6-5.9-5.9V95.3c0-3.3,2.6-5.9,5.9-5.9h165.2c3.3,0,5.9,2.6,5.9,5.9V160.7z M179.1,116.6h9.8v26.2h3.9v-26.2h9.8v-3.5h-23.5V116.6L179.1,116.6z M243.1,89.4h2.9v-5.9h-5.9c-6.5,0-11.8-5.3-11.8-11.9v-5.9H27.7v5.9c0,6.5-5.3,11.9-11.8,11.9H10v5.9h3c1.6,0,2.9,1.3,2.9,3c0,1.6-1.3,3-2.9,3h-3v5.9h3c1.6,0,2.9,1.3,2.9,3c0,1.6-1.3,3-2.9,3h-3v5.9h3c1.6,0,2.9,1.3,2.9,3c0,1.6-1.3,3-2.9,3h-3v5.9h3c1.6,0,2.9,1.3,2.9,3c0,1.6-1.3,3-2.9,3h-3v6h3c1.6,0,2.9,1.3,2.9,3c0,1.6-1.3,3-2.9,3h-3v5.9h3c1.6,0,2.9,1.3,2.9,3c0,1.6-1.3,3-2.9,3h-3v5.9h3c1.6,0,2.9,1.3,2.9,3c0,1.6-1.3,3-2.9,3h-3v5.9h5.9c6.5,0,11.8,5.3,11.8,11.9v5.9h200.6v-5.9c0-6.5,5.3-11.9,11.8-11.9h5.9v-5.9h-2.9c-1.6,0-3-1.3-3-3c0-1.6,1.3-3,3-3h2.9v-5.9h-2.9c-1.6,0-3-1.3-3-3c0-1.6,1.3-3,3-3h2.9v-5.9h-2.9c-1.6,0-3-1.3-3-3c0-1.6,1.3-3,3-3h2.9V131h-2.9c-1.6,0-3-1.3-3-3c0-1.6,1.3-3,3-3h2.9v-6h-2.9c-1.6,0-3-1.3-3-3s1.3-3,3-3h2.9v-5.9h-2.9c-1.6,0-3-1.3-3-3c0-1.6,1.3-3,3-3h2.9v-5.9h-2.9c-1.6,0-3-1.3-3-3C240.1,90.7,241.4,89.4,243.1,89.4z M233.6,110.2c-1.1,1.7-1.7,3.8-1.7,5.9c0,2.2,0.6,4.2,1.7,5.9c-1.1,1.7-1.7,3.8-1.7,5.9c0,2.2,0.6,4.2,1.7,5.9c-1.1,1.7-1.7,3.8-1.7,5.9c0,2.2,0.6,4.2,1.7,5.9c-1.1,1.7-1.7,3.8-1.7,5.9c0,2.2,0.6,4.2,1.7,5.9c-1.1,1.7-1.7,3.8-1.7,5.9c0,0.8,0.1,1.5,0.2,2.3c-6.4,2.8-11.1,8.9-11.9,16.2H35.7c-0.8-7.2-5.5-13.3-11.9-16.2c0.1-0.7,0.2-1.5,0.2-2.3c0-2.2-0.6-4.2-1.7-5.9c1.1-1.7,1.7-3.8,1.7-5.9c0-2.2-0.6-4.2-1.7-5.9c1.1-1.7,1.7-3.8,1.7-5.9c0-2.2-0.6-4.2-1.7-5.9c1.1-1.7,1.7-3.8,1.7-5.9c0-2.2-0.6-4.2-1.7-5.9c1.1-1.7,1.7-3.8,1.7-5.9c0-2.2-0.6-4.2-1.7-5.9c1.1-1.7,1.7-3.8,1.7-5.9c0-2.2-0.6-4.2-1.7-5.9c1.1-1.7,1.7-3.8,1.7-5.9c0-0.8-0.1-1.5-0.2-2.3c6.4-2.8,11.1-8.9,11.9-16.2h184.6c0.8,7.2,5.5,13.3,11.9,16.2c-0.2,0.7-0.2,1.5-0.2,2.3c0,2.2,0.6,4.2,1.7,5.9c-1.1,1.7-1.7,3.8-1.7,5.9C231.9,106.4,232.6,108.5,233.6,110.2z" />
                                    </g>
                                  </g>
                                </svg>
                              </div>
                            </div>
                          </div>
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
                      </div>
                    </div>
                    <div className="flex justify-between md:mt-6 mt-2">
                      <h5 className="capitalize">{product.title}</h5>
                      <h5>
                        <Money data={product.priceRange.minVariantPrice} />
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
          <div className="flex justify-center items-end w-full absolute bottom-12 z-10 group ">
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
