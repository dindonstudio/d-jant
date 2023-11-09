import {defer} from '@shopify/remix-oxygen';
import {Await, useLoaderData, Link} from '@remix-run/react';
import {Suspense} from 'react';
import React, {useState, useEffect, useRef} from 'react';
import  {SanityProductPage} from '~/lib/sanity';

import {Image, Money} from '@shopify/hydrogen';
import {json} from '@shopify/remix-oxygen';
import MarqueeBanner from '~/components/hero/Marquee';
// import  {SanityProductPage} from '~/lib/sanity';
import sanityClient, {createClient} from '@sanity/client';
import VideoPlayer from '~/components/VideoPlayer';
import VideoWithButtonOverlay from '~/components/VideoHero';
import Etapes from '../components/Etapes';
import Decouvertes from '../components/Decouverte';
import CloseUp from '../components/CloseUp';
import Collection from '../components/Shop';

const query = `*[_type == 'home' ]`;
const params = {slug: 'about'};
const queryProduct = `*[_type == 'product' && slug.current == pack-3-tickets]`;

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
  const variables = { handle: 'product' };
  const {collections} = await storefront.query(FEATURED_COLLECTION_QUERY);
  const featuredCollection = collections.nodes[0];
  const sanityData = await client.fetch(query);
  const recommendedProducts = storefront.query(RECOMMENDED_PRODUCTS_QUERY);
console.log(recommendedProducts)
  // Log the fetched data
  // console.log(sanityData);

  return defer({sanityData, featuredCollection, recommendedProducts});
}

export default function Homepage(sanityData) {
  /** @type {LoaderReturnData} */
  const data = useLoaderData();
  console.log(data)
  const sanity = data?.sanityData?.[0];

  return (
    <div className="home">
      <div className="hero h-screen flex  flex-col z-20 relative overflow-hidden ">
        {/* <MarqueeBanner/> */}
        <VideoWithButtonOverlay sanity={sanity} />
    
      </div>
      <div className='md:pt-64'>
      <Etapes />
      </div>
      <div className='md:pt-96'>
      <Decouvertes />
      </div>
      <div className='md:pt-96'>
      <CloseUp />
      </div>
      {/* <div className='md:pt-96'>
      <Collection handle={"product"} />
      </div> */}
             <RecommendedProducts products={data.recommendedProducts} />

    </div>
  );
}
function FeaturedCollection({collection })
  {
  if (!collection) return null;
  const image = collection?.image;
  return (
    <Link
      className="featured-collection"
      to={`/collections/${collection.handle}`}
    >
      {image && (
        <div className="featured-collection-image">
          <Image data={image} sizes="100vw" />
        </div>
      )}
      <h1>{collection.title}</h1>
    </Link>
  );
}
function RecommendedProducts({ products,}) {
  return (
    <div className="recommended-products">
      <h2>Recommended Products</h2>
      <Suspense fallback={<div>Loading...</div>}>
        <Await resolve={products}>
          {({products}) => (
            <div className="recommended-products-grid">
              {products.nodes.map((product) => (
                <Link
                  key={product.id}
                  className="recommended-product"
                  to={`/products/${product.handle}`}
                >
                  <Image
                    data={product.images.nodes[0]}
                    aspectRatio="1/1"
                    sizes="(min-width: 45em) 20vw, 50vw"
                  />
                  <h4>{product.title}</h4>
                  <small>
                    <Money data={product.priceRange.minVariantPrice} />
                  </small>
                </Link>
              ))}
            </div>
          )}
        </Await>
      </Suspense>
      <br />
    </div>
  );
}

/**


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
` 
const RECOMMENDED_PRODUCTS_QUERY = `#graphql
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
    images(first: 1) {
      nodes {
        id
        url
        altText
        width
        height
      }
    }
  }
  query RecommendedProducts ($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    products(first: 4, sortKey: UPDATED_AT,) {
      nodes {
        ...RecommendedProduct
      }
    }
  }
`