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

export default function Cart(props) {
  const currentCookieValue = getParsedCookie('cart');
  const priceArray = [];

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
          const product = props.products.find(
            (singleProduct) => singleProduct.id === cartItem.id,
          );

          priceArray.push(product.price * cartItem.cart);

          props.setTotalPrice(
            priceArray.reduce(
              (previousValue, currentValue) => previousValue + currentValue,
            ),
          );

          return (
            <div key={`cart-${cartItem.id}`}>
              <div>{product.title}</div>
              <Link href={`/products/${product.id}`}>
                <a>
                  <Image
                    src={`/${product.id}-${product.title}.jpeg`}
                    alt=""
                    width="150"
                    height="150"
                  />
                </a>
              </Link>
              <span>
                Price €{product.price * cartItem.cart}
                ,-
              </span>

              <span>Qty</span>
              <button
                onClick={() => {
                  props.setCartTotal(parseInt(props.cartTotal) + 1);

                  const foundCookie = currentCookieValue.find(
                    (cookie) => product.id === cookie.id,
                  );

                  foundCookie.cart++;
                  setStringifiedCookie('cart', currentCookieValue);
                }}
              >
                +
              </button>
              <span>{cartItem.cart}</span>
              <button
                onClick={() => {
                  props.setCartTotal(props.cartTotal - 1);

                  const foundCookie = currentCookieValue.find(
                    (cookie) => product.id === cookie.id,
                  );

                  if (foundCookie.cart <= 1) {
                    const newCookieValue = currentCookieValue.filter(
                      (cookie) => cookie.id !== cartItem.id,
                    );
                    setStringifiedCookie('cart', newCookieValue);
                    props.setTotalPrice(0);
                  } else {
                    foundCookie.cart--;
                    setStringifiedCookie('cart', currentCookieValue);
                  }
                }}
              >
                -
              </button>
              <button
                onClick={() => {
                  const newCookieValue = currentCookieValue.filter(
                    (cookie) => cookie.id !== cartItem.id,
                  );

                  if (!newCookieValue[0]) {
                    removeCookie('cart');
                    props.setCartItems('Your Cart is empty!');
                    props.setCartTotal(0);
                    props.setTotalPrice(0);
                  } else {
                    setStringifiedCookie('cart', newCookieValue);
                    props.setCartItems(newCookieValue);
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
