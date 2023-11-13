import {defer} from '@shopify/remix-oxygen';
import {Await, useLoaderData, Link} from '@remix-run/react';
import {Suspense} from 'react';
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
import Collection from '../components/Shop';
import ProgressBar from '~/components/ProgressBar';
import DragSlider from '~/components/DragSlider';
import CustomButton from '~/components/CustomButton';
import VideoPresentation from '~/components/VideoPresentation';
import FAQ from '~/components/FAQ';
import {CartForm} from '@shopify/hydrogen';
const query = `*[_type == 'home' ]
{
 ...,
  "gallery": gallery[]{
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
  return [{title: 'Hydrogen | Home'}];
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
  const recommendedProducts = storefront.query(RECOMMENDED_PRODUCTS_QUERY);
  // Log the fetched data
  // console.log(sanityData);

  return defer({sanityData, featuredCollection, recommendedProducts,galleryData});
}

export default function Homepage(sanityData, galleryData) {
  /** @type {LoaderReturnData} */
  const data = useLoaderData();
  console.log(data);
  const sanity = data?.sanityData?.[0];

  return (
    <div className="home">
      <div className="hero h-screen flex  flex-col z-20 relative overflow-hidden ">
        {/* <MarqueeBanner/> */}
        <VideoWithButtonOverlay sanity={sanity} />
      </div>
      <div className="md:pt-64">
        <Etapes />
      </div>
      <div className="md:pt-96">
        <Decouvertes />
      </div>
      <div className="md:pt-96">
        <CloseUp />
      </div>
  
      <div id="shop" className="md:pt-96">
        <RecommendedProducts products={data.recommendedProducts} />
      </div>
      <div  className="md:pt-96">
        <DragSlider galleryData={sanity.gallery}   />
      </div>
      <div  className="md:pt-96">
        <CustomButton   />
      </div>
      <div  className="md:pt-96">
        <VideoPresentation   />
      </div>
      <div  className="md:pt-96">
        <FAQ   />
      </div>

    </div>
  );
}

function RecommendedProducts({products}) {
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
      <h2 className="text-center ">CHOPE TON TICKET</h2>
      <h4 className='text-center'>Accélérez, les places sont comptées !</h4>
      <div className='w-full'>
        <ProgressBar/>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <Await resolve={products}>
          {({products}) => (
            <div className="grid paddingGrid px-8 pt-56">
              {products.nodes.map((product) => {
                const imageIndex = currentImageIndex[product.id] || 0;
                const images = product.images?.nodes || [];
                const hasNext = imageIndex < images.length - 1;
                const hasPrev = imageIndex > 0;

                return (
                  <div key={product.id} className="col-span-4 ">
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
                        </div>
                        <div className="flex justify-between absolute left-4 bottom-4"></div>
                      </Link>
                      <div className="hoverInfo md:opacity-0">
                        <div className="absolute top-0 h-full left-4 flex items-center">
                          {hasPrev && (
                            <h4
                              className="        w-full px-4 text-semiDark bg-semiWhite uppercase hover:bg-semiDark hover:text-semiWhite transition-colors duration-150"
                              onClick={() => navigateImage(product.id, 'prev')}
                            >
                              {'<'}
                            </h4>
                          )}
                        </div>
                        <div>
                          <div className="absolute top-0 h-full right-4 flex items-center">
                            {hasNext && (
                              <h4
                                className="        w-full px-4  text-semiDark bg-semiWhite uppercase hover:bg-semiDark hover:text-semiWhite transition-colors duration-150"
                                onClick={() =>
                                  navigateImage(product.id, 'next')
                                }
                              >
                                {'>'}
                              </h4>
                            )}
                          </div>
                        </div>
                        <ProductForm product={product} />
                      </div>
                    </div>
                    <div className="flex justify-between md:mt-4">
                      <h4 className="capitalize">{product.title}</h4>
                      <h4>
                        <Money data={product.priceRange.minVariantPrice} />
                      </h4>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </Await>
      </Suspense>
      <br />
    </div>
  );
}
function ProductForm({product}) {
  console.log(product);

  return (
    <VariantSelector
      handle={product.handle}
      options={product.options}
      variants={product.variants}
    >
      {({option}) => (
        <>
          {/* <div>{option.name}</div> */}
          <div className="flex justify-center items-end w-full absolute bottom-12 z-10 ">
            <div className="flex gap-8 bg-semiWhite">
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
