import {CartForm, Image, Money} from '@shopify/hydrogen';
import {Link} from '@remix-run/react';
import {useVariantUrl} from '~/utils';

/**
 * @param {CartMainProps}
 */
export function CartMain({layout, cart, sanity}) {
  // console.log(cart)

  const linesCount = Boolean(cart?.lines?.nodes?.length || 0);
  const withDiscount =
    cart &&
    Boolean(cart.discountCodes.filter((code) => code.applicable).length);
  const className = `cart-main ${withDiscount ? 'with-discount' : ''}`;

  return (
    <div className={className}>
      <CartEmpty hidden={linesCount} layout={layout} />
      <CartDetails sanity={sanity} cart={cart} layout={layout} />
    </div>
  );
}

/**
 * @param {CartMainProps}
 */
function CartDetails({layout, cart, sanity}) {
  const cartHasItems = !!cart && cart.totalQuantity > 0;

  return (
    <div className="cart-details">
      <CartLines sanity={sanity} lines={cart?.lines} layout={layout} />
      {cartHasItems && (
        <CartSummary  sanity={sanity} cost={cart.cost} layout={layout}>
          {/* <CartDiscounts discountCodes={cart.discountCodes} /> */}
          <CartCheckoutActions  sanity={sanity} checkoutUrl={cart.checkoutUrl} />
        </CartSummary>
      )}
    </div>
  );
}

/**
 * @param {{
 *   layout: CartMainProps['layout'];
 *   lines: CartApiQueryFragment['lines'] | undefined;
 * }}
 */
function CartLines({lines, layout, sanity}) {
  if (!lines) return null;
// console.log(lines.nodes)
  return (
    <div aria-labelledby="cart-lines">
      <ul>
        {lines.nodes.map((line) => (
          <CartLineItem sanity={sanity} key={line.id} line={line} layout={layout} />
        ))}
      </ul>
    </div>
  );
}

/**
 * @param {{
 *   layout: CartMainProps['layout'];
 *   line: CartLine;
 * }}
 */
function CartLineItem({layout, line, sanity}) {

  // Define default merchandise if undefined
  if (!line || !line.merchandise) {
    console.error('Line or merchandise is undefined, using default values:', line);
    // Define a default line object with both id and merchandise
    line = {
      id: 'gid://shopify/CartLine/378a9cd9-cefb-409f-8f62-66336ccf6ed8?cart=Z2NwLWV1cm9wZS13ZXN0MzowMUhGUDlDSkRCS0QxSkUxUFk5SFdSRzdDQw', // A unique identifier for the default line
      merchandise: {
        id: 'gid://shopify/ProductVariant/47049456943435', // Default variant ID
        availableForSale: true,
        price: { amount: '100.0', currencyCode: 'EUR' }, // Default price
        image: {
          altText: null,
          height: 1000,
          id: 'gid://shopify/ProductImage/51358307680587', // Default image ID
          url: 'https://cdn.shopify.com/s/files/1/0786/5417/7611/files/mockup.PACK2_0ffdeb7f-372b-42e7-b942-9e31d3bbbf18.jpg?v=1699975342', // Default image URL
          width: 1000,
        },
        product: {
          handle: 'pack-3-tickets', // Default product handle
          title: 'PACK 3 TICKETS',   // Default product title
        },
        selectedOptions: [{ name: 'Option', value: 'Bundle' }],
        title: '', // Default variant title
      }
    };
  }

  const {id, merchandise} = line;
  const {product, title, image, selectedOptions} = merchandise;
  const lineItemUrl = useVariantUrl(product.handle, selectedOptions);

  return (
    <li key={id} className="cart-line md:gap-6 gap-2 md:pt-12 md:pl-4">
      {image && (
        <Image
          alt={title}
          aspectRatio="1/1"
          className='md:w-2/5 w-1/2'
          data={image}
          height={200}
          loading="lazy"
          width={200}
        />
      )}

      <div>
        <Link
          prefetch="intent"
          to={lineItemUrl}
          onClick={() => {
            if (layout === 'aside') {
              // close the drawer
              window.location.href = lineItemUrl;
            }
          }}
        >
          <h5>
            <strong>{product.title}</strong>
          </h5>
        </Link>
        <CartLinePrice className='priceCart' line={line} as="h5" />
        <ul className='pt-8'>
          {selectedOptions.map((option) => (
            <div className='smallH5' key={option.name}>
      
                {sanity.taille}: {option.value}
              
            </div>
          ))}
        </ul>
        <CartLineQuantity sanity={sanity} line={line} />
      </div>
    </li>
  );
}

/**
 * @param {{checkoutUrl: string}}
 */
function CartCheckoutActions({checkoutUrl, sanity}) {
  if (!checkoutUrl) return null;

  return (
    <div>
      <a className='' href={checkoutUrl} target="_self">
        <h4                         className=" text-center borderblack  rounded-sm w-full px-4 pt-7 pb-6 hover:text-semiDark hover:bg-semiWhite uppercase bg-green text-semiWhite transition-colors duration-150"

        >{sanity.paiement} </h4>
      </a>
      <br />
    </div>
  );
}

/**
 * @param {{
 *   children?: React.ReactNode;
 *   cost: CartApiQueryFragment['cost'];
 *   layout: CartMainProps['layout'];
 * }}
 */
export function CartSummary({cost, layout, children = null}) {
  const className =
    layout === 'page' ? 'cart-summary-page' : 'cart-summary-aside';

  return (
    <div aria-labelledby="cart-summary" className={className}>
      <div className='flex justify-between py-8 px-4'>
      <h4>Total</h4>
      <h4 className=''>
      <Money data={cost?.subtotalAmount} />
      </h4>

      </div>
  
  
      {children}
    </div>
  );
}

/**
 * @param {{lineIds: string[]}}
 */
function CartLineRemoveButton({lineIds, sanity}) {
  return (
    <CartForm
      route="/cart"
      action={CartForm.ACTIONS.LinesRemove}
      inputs={{lineIds}}
    >
      <button className='md:pl-4 w-full' type="submit"><div className='smallH5'>{sanity.supprimer}</div></button>
    </CartForm>
  );
}

/**
 * @param {{line: CartLine}}
 */
function CartLineQuantity({line, sanity}) {

  const {id: lineId, quantity} = line;
  const prevQuantity = Number(Math.max(0, quantity - 1).toFixed(0));
  const nextQuantity = Number((quantity + 1).toFixed(0));

  return (
    <div className="cart-line-quantiy flex-wrap">
      <div className='smallH5'>{sanity.quantiteText} {quantity} &nbsp;&nbsp;</div>
      <CartLineUpdateButton lines={[{id: lineId, quantity: prevQuantity}]}>
        <button
          aria-label="Decrease quantity"
          disabled={quantity <= 1}
          name="decrease-quantity"
          value={prevQuantity}
        >
          <h5>&#8722; </h5>
        </button>
      </CartLineUpdateButton>
      &nbsp;
      <CartLineUpdateButton lines={[{id: lineId, quantity: nextQuantity}]}>
        <button
          aria-label="Increase quantity"
          name="increase-quantity"
          value={nextQuantity}
        >
          <h5>&#43;</h5>
        </button>
      </CartLineUpdateButton>
      &nbsp;
      <CartLineRemoveButton sanity={sanity} lineIds={[lineId]} />
    </div>
  );
}

/**
 * @param {{
 *   line: CartLine;
 *   priceType?: 'regular' | 'compareAt';
 *   [key: string]: any;
 * }}
 */
function CartLinePrice({line, priceType = 'regular', ...passthroughProps}) {
  if (!line?.cost?.amountPerQuantity || !line?.cost?.totalAmount) return null;

  const moneyV2 =
    priceType === 'regular'
      ? line.cost.totalAmount
      : line.cost.compareAtAmountPerQuantity;

  if (moneyV2 == null) {
    return null;
  }

  return (
    <div>
      <Money withoutTrailingZeros {...passthroughProps} data={moneyV2} />
    </div>
  );
}

/**
 * @param {{
 *   hidden: boolean;
 *   layout?: CartMainProps['layout'];
 * }}
 */
export function CartEmpty({hidden = false, layout = 'aside'}) {
  return (
    <div hidden={hidden}>
      <br />
      <h3>
  VOTRE PANIER EST VIDE 
      </h3>
      <br />
      <Link
        to="/collections"
        onClick={() => {
          if (layout === 'aside') {
            window.location.href = '/collections';
          }
        }}
      >
       Continuer vos achats →
      </Link>
    </div>
  );
}

/**
 * @param {{
 *   discountCodes: CartApiQueryFragment['discountCodes'];
 * }}
 */
function CartDiscounts({discountCodes}) {
  const codes =
    discountCodes
      ?.filter((discount) => discount.applicable)
      ?.map(({code}) => code) || [];

  return (
    <div>
      {/* Have existing discount, display it with a remove option */}
      <dl hidden={!codes.length}>
        <div>
          <dt>Discount(s)</dt>
          <UpdateDiscountForm>
            <div className="cart-discount">
              <code>{codes?.join(', ')}</code>
              &nbsp;
              <button>Remove</button>
            </div>
          </UpdateDiscountForm>
        </div>
      </dl>

      {/* Show an input to apply a discount */}
      <UpdateDiscountForm discountCodes={codes}>
        <div>
          <input type="text" name="discountCode" placeholder="Discount code" />
          &nbsp;
          <button type="submit">Apply</button>
        </div>
      </UpdateDiscountForm>
    </div>
  );
}

/**
 * @param {{
 *   discountCodes?: string[];
 *   children: React.ReactNode;
 * }}
 */
function UpdateDiscountForm({discountCodes, children}) {
  return (
    <CartForm
      route="/cart"
      action={CartForm.ACTIONS.DiscountCodesUpdate}
      inputs={{
        discountCodes: discountCodes || [],
      }}
    >
      {children}
    </CartForm>
  );
}

/**
 * @param {{
 *   children: React.ReactNode;
 *   lines: CartLineUpdateInput[];
 * }}
 */
function CartLineUpdateButton({children, lines}) {
  return (
    <CartForm
      route="/cart"
      action={CartForm.ACTIONS.LinesUpdate}
      inputs={{lines}}
    >
      {children}
    </CartForm>
  );
}

/** @typedef {CartApiQueryFragment['lines']['nodes'][0]} CartLine */
/**
 * @typedef {{
 *   cart: CartApiQueryFragment | null;
 *   layout: 'page' | 'aside';
 * }} CartMainProps
 */

/** @typedef {import('@shopify/hydrogen/storefront-api-types').CartLineUpdateInput} CartLineUpdateInput */
/** @typedef {import('storefrontapi.generated').CartApiQueryFragment} CartApiQueryFragment */
