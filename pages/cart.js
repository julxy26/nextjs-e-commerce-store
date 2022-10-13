import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { getProducts } from '../database/products';
import {
  getParsedCookie,
  removeCookie,
  setStringifiedCookie,
} from '../utils/cookies';

// import { getProductById, getProducts } from '../database/products';
// import { getParsedCookie, setStringifiedCookie } from '../utils/cookies';

// return {
//   id: cartItem.id,
// name: product[0].title,
// price: product[0].price,
// qty: cartItem.cart,
// };

export default function Cart(props) {
  const currentCookieValue = getParsedCookie('cart');

  return (
    <>
      <Head>
        <title>Cart</title>
        <meta name="description" content="cart" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>Cart page</h1>

      {!currentCookieValue ? (
        <div key={`cart-${props.products.id}`}>{props.cartItems}</div>
      ) : (
        currentCookieValue.map((cartItem) => {
          const product = props.products.filter(
            (singleProduct) => singleProduct.id === cartItem.id,
            props.setCartItems(),
          );

          return (
            <div key={`cart-${cartItem.id}`}>
              <div>{product[0].title}</div>
              <Link href={`/products/${product[0].id}`}>
                <a>
                  <Image
                    src={`/${product[0].id}-${product[0].title}.jpeg`}
                    alt=""
                    width="150"
                    height="150"
                  />
                </a>
              </Link>
              <span>Price € {product[0].price * cartItem.cart},-</span>

              <span>Qty</span>
              <button>+</button>
              <span>{cartItem.cart}</span>
              <button>-</button>
              <button
                onClick={() => {
                  const newCookieValue = currentCookieValue.filter(
                    (item) => item.id !== cartItem.id,
                  );
                  setStringifiedCookie('cart', newCookieValue);

                  if (!newCookieValue[0]) {
                    props.setCartItems('Your Cart is empty!');
                    props.setCartTotal(0);
                    props.setTotalPrice(0);
                  }
                }}
              >
                Remove
              </button>
            </div>
          );
        })
      )}

      <button
        onClick={() => {
          removeCookie('cart');
          props.setCartItems('Your Cart is empty!');
          props.setCartTotal(0);
          props.setTotalPrice(0);
        }}
      >
        Remove all
      </button>
      <span>Total: {props.totalPrice}€</span>
      <Link href="/checkout">
        <button>Checkout</button>
      </Link>
    </>
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
