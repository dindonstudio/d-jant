import {Suspense} from 'react';
import {useEffect} from 'react';
import {useState} from 'react';
import { useContext } from 'react';
import {useNavigate} from '@remix-run/react';
import {defer, redirect} from '@shopify/remix-oxygen';
import PerspectiveCard from '~/components/PerspectiveCard';
import {PortableText} from '@portabletext/react'
import sanityClient, {createClient} from '@sanity/client';
import LanguageContext from '~/components/LanguageContext';
import ticket1 from '../../public/badge_1TICKET.svg';
import ticket2 from '../../public/badge_x2TICKETS.svg';
import ticket3 from '../../public/badge_x3TICKETS.svg';
import freeShiping from '../../public/FREESHIPPING.svg';
import bestOffer from '../../public/badge.BESTOFFER.svg';
import {Await, Link, useLoaderData} from '@remix-run/react';
import {
  Image,
  Money,
  VariantSelector,
  getSelectedProductOptions,
  CartForm,
} from '@shopify/hydrogen';
import {getVariantUrl} from '~/utils';

/**
 * @type {MetaFunction<typeof loader>}
 */
export const meta = ({data}) => {
  return [{title: `Déjanté | ${data?.product.title ?? ''}`}];
};

/**
 * @param {LoaderFunctionArgs}
 */
const query = `*[_type == 'product' && store.slug.current == $handle]
{
 ...,

}`;
const client = createClient({
  apiVersion: 'v2022-05-01',
  dataset: 'production',
  projectId: 'm5ok1ygs',
  useCdn: false,
});
function CustomDropdown({options, sanity}) {
  const [selectedValue, setSelectedValue] = useState(options[0]?.value || '');
  const navigate = useNavigate();

  const handleChange = (event) => {
    const selectedOption = options.find(
      (option) => option.value === event.target.value,
    );
    setSelectedValue(event.target.value);
    if (selectedOption && selectedOption.to) {
      navigate(selectedOption.to, {replace: true});
      setTimeout(() => {
        window.scrollTo(0, document.body.scrollHeight);
      }, 195);
    }
  };

  return (
    <div className="dropdown-menu">
      <select
        value={selectedValue}
        onChange={handleChange}
        className="selector"
      >
        {options.map(({value, isAvailable}) => (
          <option key={value} value={value} disabled={!isAvailable}>
            {value}
          </option>
        ))}
      </select>
    </div>
  );
}

export async function loader({params, request, context}) {
  const {handle} = params;
  const {storefront} = context;
  const sanityData = await client.fetch(query, { handle });

  const selectedOptions = getSelectedProductOptions(request).filter(
    (option) =>
      // Filter out Shopify predictive search query params
      !option.name.startsWith('_sid') &&
      !option.name.startsWith('_pos') &&
      !option.name.startsWith('_psq') &&
      !option.name.startsWith('_ss') &&
      !option.name.startsWith('_v') &&
      // Filter out third party tracking params
      !option.name.startsWith('fbclid'),
  );
  // console.log("Selected options for query:", selectedOptions);

  if (!handle) {
    throw new Error('Expected product handle to be defined');
  }

  // await the query for the critical product data
  const {product} = await storefront.query(PRODUCT_QUERY, {
    variables: {handle, selectedOptions},
  });

  // console.log("Loaded product data:", product);

  if (!product?.id) {
    throw new Response(null, {status: 404});
  }

  const firstVariant = product.variants.nodes[0];
  const firstVariantIsDefault = Boolean(
    firstVariant.selectedOptions.find(
      (option) => option.name === 'Title' && option.value === 'Default Title',
    ),
  );

  if (firstVariantIsDefault) {
    product.selectedVariant = firstVariant;
  } else {
    // if no selected variant was returned from the selected options,
    // we redirect to the first variant's url with it's selected options applied
    if (!product.selectedVariant) {
      throw redirectToFirstVariant({product, request});
    }
  }

  // In order to show which variants are available in the UI, we need to query
  // all of them. But there might be a *lot*, so instead separate the variants
  // into it's own separate query that is deferred. So there's a brief moment
  // where variant options might show as available when they're not, but after
  // this deffered query resolves, the UI will update.
  const variants = storefront.query(VARIANTS_QUERY, {
    variables: {handle},
  });
  // console.log("Raw variants response:", variants);

  const referencedProductGID = product.metafield.value;

  let referencedProduct = null;
  const referencedProductResponse = await storefront.query(
    REFERENCED_PRODUCT_QUERY,
    {
      variables: {id: referencedProductGID},
    },
  );

  referencedProduct = referencedProductResponse;

  return defer({product, variants, referencedProduct, sanityData});
}

/**
 * @param {{
 *   product: ProductFragment;
 *   request: Request;
 * }}
 */
function redirectToFirstVariant({product, request}) {
  const url = new URL(request.url);
  const firstVariant = product.variants.nodes[0];

  return redirect(
    getVariantUrl({
      pathname: url.pathname,
      handle: product.handle,
      selectedOptions: firstVariant.selectedOptions,
      searchParams: new URLSearchParams(url.search),
    }),
    {
      status: 302,
    },
  );
}

export default function Product() {
  /** @type {LoaderReturnData} */
  const language = useContext(LanguageContext);

  const {product, variants, referencedProduct, sanityData} = useLoaderData();
  const {selectedVariant} = product;

let sanity = {
  body: "Default content",
  decouvrir: "Découvrir",
  taille: "Taille",
  panier: "AJOUTER AU PANIER"
};

if (sanityData) {
  if (language === 'fr') {
    sanity.body = sanityData[0].body;
    sanity.decouvrir = sanityData[0].decouvrirFr;
    sanity.taille = sanityData[0].tailleFr;
    sanity.panier = sanityData[0].ajouterPanierFr;
  } else if (language === 'en') {
    sanity.body = sanityData[0].bodyEnglish;
    sanity.decouvrir = sanityData[0].decouvrirEn;
    sanity.taille = sanityData[0].tailleEn;
    sanity.panier = sanityData[0].ajouterPanierEn;
  }
}
  useEffect(() => {
    document.body.classList.add('hide-header');

    // Cleanup function to remove the class when the component unmounts
    return () => {
      document.body.classList.remove('hide-header');
    };
  }, []); // Emp
  return (
    <div className="product">
      <div className="flex gap-4 md:mix-blend-normal mix-blend-difference fixed md:top-12 top-8 left-6 md:left-8 z-50">
        <Link to="../#shop">
        {language === 'en' ?
                <h5 className="md:text-semiDark text-semiWhite"> ← {sanityData[0].retourEn}</h5> :
                <h5 className="md:text-semiDark text-semiWhite">← {sanityData[0].retourFr}</h5>
            }
        </Link>
      </div>
      <ProductImage image={product.images.nodes} />
      <ProductMain
      sanity={sanity}
        referencedProduct={referencedProduct}
        selectedVariant={selectedVariant}
        product={product}
        variants={variants}
        handle={product.handle}
      />
    </div>
  );
}

/**
 * @param {{image: ProductVariantFragment['image']}}
 */
function ProductImage({image}) {
  const totalImages = image.length;

  return (
    <div className="product-image-container relative md:block flex flex-nowrapwrap overflow-x-auto">
      {image.map((image, index) => (
        <div className="product-image relative" key={image.id}>
          <Image
            alt={image.altText || 'Product Image'}
            src={image.url}
            key={image.id}
            sizes="(min-width: 45em) 50vw, 100vw"
          />
          <h5 className="index-label absolute bottom-4 left-4 text-semiDark md:hidden block">
            {`${index + 1} / ${totalImages}`}
          </h5>
        </div>
      ))}
    </div>
  );
}

/**
 * @param {{
 *   product: ProductFragment;
 *   selectedVariant: ProductFragment['selectedVariant'];
 *   variants: Promise<ProductVariantsQuery>;
 * }}
 */
function ProductMain({
  selectedVariant,
  product,
  variants,
  referencedProduct,
  handle,
  sanity
}) {
  const {title, descriptionHtml} = product;
  // console.log("ProductMain props:", { selectedVariant, product, variants, referencedProduct });

  return (
    <div className="product-main md:h-screen flex flex-col justify-between">
      {handle === 't-shirt-dejante' && (
        <>
          <div className="absolute md:fixed md:top-4 -top-28 right-3 w-24 customRight">
            <img src={ticket1} alt="Ticket 1" className="ticket-svg" />
          </div>
          <div className="absolute -top-28  md:fixed md:top-4 right-28 w-24 customLeft ">
            <img src={freeShiping} alt="Best Deal" className="best-deal-svg" />
          </div>
        </>
      )}
      {handle === 'hoodie-dejante' && (
               <>
               <div className="absolute md:fixed md:top-4 -top-28 right-3 w-24 customRight">
                 <img src={ticket2} alt="Ticket 1" className="ticket-svg" />
               </div>
               <div className="absolute -top-28  md:fixed md:top-4 right-28 w-24 customLeft ">
                 <img src={freeShiping} alt="Best Deal" className="best-deal-svg" />
               </div>
             </>
      )}
      {handle === 'pack-3-tickets-1' && (
        <>
          <div className="absolute md:fixed md:top-4 -top-28 right-3 w-24 customRight">
            <img src={ticket3} alt="Ticket 1" className="ticket-svg" />
          </div>
          <div className="absolute -top-28  md:fixed md:top-4 right-28 w-24 customLeft">
            <img src={bestOffer} alt="Best Deal" className="best-deal-svg" />
          </div>
          <div className="absolute -top-28  md:fixed md:top-4 right-52 w-24 customLeftPlus ">
                 <img src={freeShiping} alt="Best Deal" className="best-deal-svg" />
               </div>
        </>
      )}
      <div className="md:w-4/5 md:pt-8 pt-16 md:px-0 px-6 ">
        <div className="flex flex-col ">
          {' '}
          <h3>{title}</h3>
          <ProductPrice selectedVariant={selectedVariant} />
        </div>
        {/* <h4 className="green text-left md:pt-1 md:pb-4 pt-1">
          La livraison est offerte !
        </h4> */}

        <h5></h5>

        <br />
        
        <div
          className="descriptionProduct"
          
          // dangerouslySetInnerHTML={{__html: descriptionHtml}}
        />
           <PortableText
            value={sanity.body}
          />
        <Suspense
          fallback={
            <ProductForm
              product={product}
              selectedVariant={selectedVariant}
              variants={[]}
            />
          }
        >
          <Await
            errorElement="There was a problem loading product variants"
            resolve={variants}
          >
            {(data) => (
              <ProductForm
                product={product}
                sanity={sanity}
                selectedVariant={selectedVariant}
                variants={data.product?.variants.nodes || []}
              />
            )}
          </Await>
        </Suspense>
        <br />
        <br />

        <br />
      </div>
      <div className="md:sticky relative md:pt-0 pt-12 bottom-8 w-full flex justify-end pr-8">
        <Link to={`/products/${referencedProduct.node.handle}`}>
          <h4 className="text-right">
           {sanity.decouvrir} {referencedProduct.node.title} →
          </h4>
        </Link>
      </div>
    </div>
  );
}

/**
 * @param {{
 *   selectedVariant: ProductFragment['selectedVariant'];
 * }}
 */
function ProductPrice({selectedVariant}) {
  return (
    <h3 className="product-price">
      {selectedVariant?.compareAtPrice ? (
        <>
          <h3 className="product-price-on-sale">
            {selectedVariant ? <Money data={selectedVariant.price} /> : null}
            <s>
              <Money data={selectedVariant.compareAtPrice} />
            </s>
          </h3>
        </>
      ) : (
        selectedVariant?.price && <Money data={selectedVariant?.price} />
      )}
    </h3>
  );
}

/**
 * @param {{
 *   product: ProductFragment;
 *   selectedVariant: ProductFragment['selectedVariant'];
 *   variants: Array<ProductVariantFragment>;
 * }}
 */
function ProductForm({product, selectedVariant, variants, sanity}) {
  // console.log("ProductForm - Product:", product);
  // console.log("ProductForm - Selected Variant ID:", selectedVariant.id);
  // console.log("ProductForm - Variants:", variants);
  return (
    <div className="product-form">
      <div className="flex gap-24">
        <VariantSelector
          handle={product.handle}
          options={product.options}
          variants={variants}
        >
          {({option}) => (
            <ProductOptions
              key={option.name}
              option={option}
              sanity={sanity}
              handle={product.handle}
            />
          )}
        </VariantSelector>
      </div>
      <br />
      <AddToCartButton
      sanity={sanity}
        disabled={!selectedVariant || !selectedVariant.availableForSale}
        onClick={() => {
          window.location.href = window.location.href + '#cart-aside';
       
          console.log(selectedVariant);
        }}
        lines={
          selectedVariant
            ? [
                {
                  merchandiseId: selectedVariant.id,
                  quantity: 1,
                },
              ]
            : []
        }
      >
        {selectedVariant?.availableForSale ? 'Add to cart' : 'Sold out'}
      </AddToCartButton>
    </div>
  );
}

/**
 * @param {{option: VariantOption}}
 */
function ProductOptions({option, handle, sanity}) {
  console.log(option);
  if (handle === 'pack-3-tickets-1') {
    return (
      <div className="product-options md:pt-8" key={option.name}>
        <h5 className="pb-4">{sanity?.taille}</h5>
        <CustomDropdown
          options={option.values.map(({value, isAvailable, to}) => ({
            value,
            isAvailable,
            to,
          }))}
        />
      </div>
    );
  }
  return (
    <div className="product-options md:pt-8" key={option.name}>
      <h5 className="pb-4">{sanity.taille}</h5>
      <div className=" flex gap-4 ">
        {option.values.map(({value, isAvailable, isActive, to}) => {
          return (
            <Link
              className={`rounded-sm px-4 pt-3 pb-2 text-semiWhite bg-semiBlack uppercase hover:text-semiWhite transition-colors duration-150 ${
                isActive ? 'IsActive' : ''
              }`}
              key={option.name + value}
              prefetch="intent"
              preventScrollReset
              replace
              to={to}
              style={{
                border: isActive ? '1px solid white' : '1px solid transparent',
                opacity: isAvailable ? 1 : 0.3,
              }}
            >
              <h4
                className={
                  isActive
                    ? 'transition-all'
                    : 'hover:opacity-60 transition-all'
                }
              >
                {' '}
                {value}
              </h4>
            </Link>
          );
        })}
      </div>
      <br />
    </div>
  );
}

/**
 * @param {{
 *   analytics?: unknown;
 *   children: React.ReactNode;
 *   disabled?: boolean;
 *   lines: CartLineInput[];
 *   onClick?: () => void;
 * }}
 */
function AddToCartButton({analytics, children, disabled, lines, onClick, sanity}) {
  console.log('CartForm lines:', lines);

  return (
    <CartForm sanity={sanity} route="/cart" inputs={{lines}} action={CartForm.ACTIONS.LinesAdd}>
      {(fetcher) => (
        <>
          <input
            name="analytics"
            type="hidden"
            value={JSON.stringify(analytics)}
          />
          <button
            type="submit"
            className=" relative pt-4 md:w-auto w-full"
            onClick={onClick}
            disabled={disabled ?? fetcher.state !== 'idle'}
          >
            <h4 className="uppercase myButton filled productPage flex justify-center relative cursor-pointer">
              {sanity?.panier}
              {/* <div className="  arrow absolute right-0 opacity-0 ">
                <svg
                  className="w-10 h-12"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#f4f4f4"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                >
                  <path d="M7.33 24l-2.83-2.829 9.339-9.175-9.339-9.167 2.83-2.829 12.17 11.996z" />
                </svg>
              </div> */}
            </h4>
          </button>
        </>
      )}
    </CartForm>
  );
}

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

const PRODUCT_FRAGMENT = `#graphql
  fragment Product on Product {
    id
    title
    vendor
    handle
    descriptionHtml
    description
    images(first: 5) {
      nodes {
        id
        url
        altText
        width
        height
      }
    }
    options {
      name
      values
    }
    selectedVariant: variantBySelectedOptions(selectedOptions: $selectedOptions) {
      ...ProductVariant
    }
    variants(first: 16) {
      nodes {
        ...ProductVariant
      }
    }
    seo {
      description
      title
    }
    metafield(namespace: "custom", key: "link") {
      value
    }
    metafield(namespace: "custom", key: "pack_3_t_shirt_hoodie") {
      value
    }
  }
  ${PRODUCT_VARIANT_FRAGMENT}
`;

const PRODUCT_QUERY = `#graphql
  query Product(
    $country: CountryCode
    $handle: String!
    $language: LanguageCode
    $selectedOptions: [SelectedOptionInput!]!
  ) @inContext(country: $country, language: $language) {
    product(handle: $handle) {
      ...Product
    }
  }
  ${PRODUCT_FRAGMENT}
`;

const PRODUCT_VARIANTS_FRAGMENT = `#graphql
  fragment ProductVariants on Product {
    variants(first: 250) {
      nodes {
        ...ProductVariant
      }
    }
  }
  ${PRODUCT_VARIANT_FRAGMENT}
`;

const VARIANTS_QUERY = `#graphql
  ${PRODUCT_VARIANTS_FRAGMENT}
  query ProductVariants(
    $country: CountryCode
    $language: LanguageCode
    $handle: String!
  ) @inContext(country: $country, language: $language) {
    product(handle: $handle) {
      ...ProductVariants
    }
  }
`;
const REFERENCED_PRODUCT_QUERY = `#graphql
  query ReferencedProduct($id: ID!) {
    node(id: $id) {
      ... on Product {
        title
        handle
      }
    }
  }
`;

/** @typedef {import('@shopify/remix-oxygen').LoaderFunctionArgs} LoaderFunctionArgs */
/** @template T @typedef {import('@remix-run/react').MetaFunction<T>} MetaFunction */
/** @typedef {import('@remix-run/react').FetcherWithComponents} FetcherWithComponents */
/** @typedef {import('storefrontapi.generated').ProductFragment} ProductFragment */
/** @typedef {import('storefrontapi.generated').ProductVariantsQuery} ProductVariantsQuery */
/** @typedef {import('storefrontapi.generated').ProductVariantFragment} ProductVariantFragment */
/** @typedef {import('@shopify/hydrogen').VariantOption} VariantOption */
/** @typedef {import('@shopify/hydrogen/storefront-api-types').CartLineInput} CartLineInput */
/** @typedef {import('@shopify/hydrogen/storefront-api-types').SelectedOption} SelectedOption */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof loader>} LoaderReturnData */
