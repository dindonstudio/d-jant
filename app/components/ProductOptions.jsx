import { useState, useEffect } from 'react';
import { useLocation } from '@remix-run/react';
import { CartForm } from '@shopify/hydrogen';


export async function loader({params, context, request}) {
    const {handle} = 't-shirt-dejante';
    const searchParams = new URL(request.url).searchParams;
    const selectedOptions = [];
  
    // set selected options from the query string
    searchParams.forEach((value, name) => {
      selectedOptions.push({name, value});
    });
  
    const {product} = await context.storefront.query(PRODUCT_QUERY, {
      variables: {
        handle,
        selectedOptions,
      },
    });
  
    if (!product?.id) {
      throw new Response(null, {status: 404});
    }
  
    return json({
      product,
    });
  }
  
export default function ProductOptions({ options, handle, variants }) {
  const { search } = useLocation();
  const [selectedVariant, setSelectedVariant] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(search);
    updateSelectedVariant(params);
  }, [search, variants]);

  const updateSelectedVariant = (params) => {
    console.log("Updating selected variant...");

    const selectedOptions = {};
    options.forEach(option => {
      selectedOptions[option.name] = params.get(option.name);
    });

    console.log("Selected options:", selectedOptions);

    const foundVariant = variants.find(variant => 
      options.every(option => 
        variant[option.name] === selectedOptions[option.name]
      )
    );

    console.log("Found variant:", foundVariant);
    setSelectedVariant(foundVariant);
  };

  const handleOptionClick = (optionName, value) => {
    console.log(`Option clicked: ${optionName}, Value: ${value}`);

    const linkParams = new URLSearchParams(search);
    linkParams.set(optionName, value);
    window.history.pushState({}, '', `${handle}?${linkParams.toString()}`);
    updateSelectedVariant(linkParams);
  };

  return (
    <div className="grid gap-4 mb-6">
      {options.map((option) => {
        if (!option.values.length) {
          return null;
        }
        return (
          <div key={option.name} className="flex flex-col flex-wrap mb-4 gap-y-2 last:mb-0">
            <h3 className="whitespace-pre-wrap max-w-prose font-bold text-lead min-w-[4rem]">
              {option.name}
            </h3>
            <div className="flex flex-wrap items-baseline gap-4">
              {option.values.map((value) => (
                <button
                  key={value}
                  onClick={() => handleOptionClick(option.name, value)}
                  className="leading-none py-1 border-b-[1.5px] cursor-pointer hover:no-underline transition-all duration-200"
                >
                  {value}
                </button>
              ))}
            </div>
          </div>
        );
      })}

      <CartForm
        route="/cart"
        inputs={{
          lines: selectedVariant ? [{ merchandiseId: selectedVariant.id }] : [],
        }}
        action={CartForm.ACTIONS.LinesAdd}
      >
        {(fetcher) => (
          <button
            type="submit"
            onClick={() => {
              console.log("Add to cart clicked");
              window.location.href = window.location.href + '#cart-aside';
            }}
            disabled={!selectedVariant || fetcher.state !== 'idle'}
            className="border border-black rounded-sm w-full px-4 py-2 text-white bg-black uppercase hover:bg-white hover:text-black transition-colors duration-150"
          >
            Add to cart
          </button>
        )}
      </CartForm>
    </div>
  );
}


const PRODUCT_QUERY = `#graphql
  query product($handle: String!, $selectedOptions: [SelectedOptionInput!]!) {
    product(handle: $handle) {
      id
      title
      handle
      vendor
      description
      descriptionHtml
      featuredImage{
        id
        url
        altText
        width
        height
      }
      options {
        name,
        values
      }
      selectedVariant: variantBySelectedOptions(selectedOptions: $selectedOptions) {
        id
        availableForSale
        selectedOptions {
          name
          value
        }
        image {
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
        compareAtPrice {
          amount
          currencyCode
        }
        sku
        title
        unitPrice {
          amount
          currencyCode
        }
        product {
          title
          handle
        }
      }
      variants(first: 1) {
        nodes {
          id
          title
          availableForSale
          price {
            currencyCode
            amount
          }
          compareAtPrice {
            currencyCode
            amount
          }
          selectedOptions {
            name
            value
          }
        }
      }
    }
  }
`;
