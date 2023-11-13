import React, { useState } from 'react';
import { Image, Money, VariantSelector, CartForm } from '@shopify/hydrogen';
import { Suspense,Await } from 'react';
/**
 * Component for rendering individual recommended product card with variant selector and add to cart functionality
 * @param {Object} props - The product data.
 */
function MyButton(products) {
//   const [selectedVariant, setSelectedVariant] = useState(products.variants.nodes[0]);

//   // Handle variant selection change
//   const handleVariantChange = (newVariant) => {
//     setSelectedVariant(newVariant);
//   };

  return (
    <div className="recommended-product-card">
      {/* <Image
        alt={selectedVariant.image?.altText || 'Product Image'}
        data={selectedVariant.image}
      />
      <h3>{product.title}</h3>
      <Money data={selectedVariant.price} />

      <VariantSelector
        handle={product.handle}
        options={product.options}
        variants={product.variants.nodes}
        selectedVariant={selectedVariant}
        onVariantChange={handleVariantChange}
      />

      <AddToCartButton
        disabled={!selectedVariant || !selectedVariant.availableForSale}
        selectedVariant={selectedVariant}
      /> */}
      <Suspense fallback={<div>Loading...</div>}>
        <Await resolve={products}>
            <div>
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
            </div>
  
        </Await>
      </Suspense>
    </div>
  );
};

/**
 * Button to add a product to the cart
 * @param {Object} props - The button properties.
 */
const AddToCartButton = ({ disabled, selectedVariant }) => {
  const addToCart = () => {
    // Implement add to cart functionality
    console.log("Added to cart:", selectedVariant.id);
  };

  return (
    <button
      disabled={disabled}
      onClick={addToCart}
    >
      Add to Cart
    </button>
  );
};

export default RecommendedProductCard;
