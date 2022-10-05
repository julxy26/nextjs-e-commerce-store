import { css } from '@emotion/react';
import { useState } from 'react';
import { getProducts } from '../database/products';
import { getParsedCookie, setStringifiedCookie } from '../utils/cookies';

const addToCartButtonStyles = () => css``;

export default function AddToCart(props) {
  const [cartTotal, setCartTotal] = useState(0);

  return (
    <div>
      <button
        css={addToCartButtonStyles(cartTotal)}
        data-test-id="product-add-to-cart"
        onClick={() => {
          const currentCookieValue = getParsedCookie('cart');

          if (!currentCookieValue) {
            setStringifiedCookie('cart', [{ id: props.product.id, cart: 1 }]);
            return setCartTotal(1);
          }

          const allCookie = currentCookieValue.find(
            (cookieProductObject) => cookieProductObject.cart,
          );

          if (!allCookie) {
            currentCookieValue.push({
              id: props.product.id,
              cart: 1,
            });
          } else {
            allCookie.cart++;
          }
          setStringifiedCookie('cart', currentCookieValue);
          setCartTotal(allCookie.cart);
        }}
      >
        Add to cart
      </button>
    </div>
  );
}

export async function getServerSideProps() {
  const products = await getProducts();
  return {
    props: {
      products: products,
    },
  };
}
