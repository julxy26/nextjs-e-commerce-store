import { css } from '@emotion/react';
import { getParsedCookie, setStringifiedCookie } from '../utils/cookies';

export default function AddToCart(props) {
  return (
    <div>
      <button
        data-test-id="product-add-to-cart"
        onClick={() => {
          const currentCookieValue = getParsedCookie('cart');

          if (!currentCookieValue) {
            setStringifiedCookie('cart', [{ id: props.product.id, cart: 1 }]);
            return props.setCartTotal(1);
          }

          const foundCookie = currentCookieValue.find(
            (cookieProductObject) =>
              cookieProductObject.id === props.product.id,
          );

          if (!foundCookie) {
            currentCookieValue.push({
              id: props.product.id,
              cart: 1,
            });
          } else {
            foundCookie.cart++;
          }
          setStringifiedCookie('cart', currentCookieValue);
          props.setCartTotal(props.cartTotal + 1);
        }}
      >
        Add to cart
      </button>
    </div>
  );
}
