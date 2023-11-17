import {Suspense} from 'react';
import {useEffect} from 'react';
import {defer, redirect} from '@shopify/remix-oxygen';
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
export async function loader({params, request, context}) {
  const {handle} = params;
  const {storefront} = context;

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

  if (!handle) {
    throw new Error('Expected product handle to be defined');
  }

  // await the query for the critical product data
  const {product} = await storefront.query(PRODUCT_QUERY, {
    variables: {handle, selectedOptions},
  });

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
  const referencedProductGID = product.metafield.value;

  let referencedProduct = null;
  const referencedProductResponse = await storefront.query(
    REFERENCED_PRODUCT_QUERY,
    {
      variables: {id: referencedProductGID},
    },
  );

  referencedProduct = referencedProductResponse;

  return defer({product, variants, referencedProduct});
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
  const {product, variants, referencedProduct} = useLoaderData();
  const {selectedVariant} = product;

  useEffect(() => {
    document.body.classList.add('hide-header');

    // Cleanup function to remove the class when the component unmounts
    return () => {
      document.body.classList.remove('hide-header');
    };
  }, []); // Emp
  return (
    <div className="product">
      <div className="flex gap-4 fixed top-12 left-8 z-50">
      
        <Link to="../"><h5 className='text-semiDark'> ← Retour </h5></Link>
      </div>
      <ProductImage image={product.images.nodes} />
      <ProductMain
        referencedProduct={referencedProduct}
        selectedVariant={selectedVariant}
        product={product}
        variants={variants}
      />
    </div>
  );
}

/**
 * @param {{image: ProductVariantFragment['image']}}
 */
function ProductImage({image}) {
  if (!image) {
    return <div className="product-image" />;
  }
  return (
    <div className="product-image-container">
      {image.map((image) => (
        <div className="product-image" key={image.id}>
          <Image
            alt={image.altText || 'Product Image'}
            src={image.url} // Use the src attribute for the image URL
            key={image.id}
            sizes="(min-width: 45em) 50vw, 100vw"
          />
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
function ProductMain({selectedVariant, product, variants, referencedProduct}) {
  const {title, descriptionHtml} = product;
  return (
    <div className="product-main h-screen flex flex-col justify-between">
      <div className="w-4/5 md:pt-24 ">
        <div className="flex flex-col ">
          {' '}
          <h3>{title}</h3>
          <ProductPrice selectedVariant={selectedVariant} />
        </div>

        <h5>
          
        </h5>

        <br />
        <div className='descriptionProduct' dangerouslySetInnerHTML={{__html: descriptionHtml}} />
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
      <div className="sticky bottom-8 w-full flex justify-end pr-8">
        <a href={`/products/${referencedProduct.node.handle}`}>
          <h4>Découvrez aussi le {referencedProduct.node.title} →</h4>
        </a>
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
function ProductForm({product, selectedVariant, variants}) {
  return (
    <div className="product-form">
      <div className='flex gap-24'>
      <VariantSelector
        handle={product.handle}
        options={product.options}
        variants={variants}
      >
        {({option}) => <ProductOptions key={option.name} option={option} />}


      </VariantSelector>
      </div>
      <br />
      <AddToCartButton
        disabled={!selectedVariant || !selectedVariant.availableForSale}
        onClick={() => {
          window.location.href = window.location.href + '#cart-aside';
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
function ProductOptions({option}) {
  return (
    <div className="product-options pt-12" key={option.name}>
      <h5 className="pb-4">{option.name}</h5>
      <div className=" flex gap-4 ">
        {option.values.map(({value, isAvailable, isActive, to}) => {
          return (
            <Link
            className={`rounded-sm px-4 pt-3 pb-2 text-semiWhite bg-semiBlack uppercase hover:text-semiWhite transition-colors duration-150 ${isActive ? 'IsActive' : ''}`}
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
function AddToCartButton({analytics, children, disabled, lines, onClick}) {
  return (
    <CartForm route="/cart" inputs={{lines}} action={CartForm.ACTIONS.LinesAdd}>
      {(fetcher) => (
        <>
          <input
            name="analytics"
            type="hidden"
            value={JSON.stringify(analytics)}
          />
          <button
            type="submit"
            className=" relative pt-4"
            onClick={onClick}
            disabled={disabled ?? fetcher.state !== 'idle'}
          >
            <h4 className="uppercase myButton filled productPage flex relative cursor-pointer">
              Ajouter au Panier
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
    variants(first: 1) {
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
