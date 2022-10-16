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

const counterContainerStyles = css`
  padding: 10px 5px;
  width: 100px;
  text-align: center;
  display: flex;
  justify-content: space-around;
`;

const countButtonStyles = css`
  border: none;
  font-size: 18px;
  text-decoration: none;
  background-color: #fff;
`;

const countNumberStyles = css`
  font-weight: 300;
  padding: 7px 7px;
  width: 20px;
  background-color: #ffe9ba;
  border-radius: 20px;
`;

const removeItemStyles = css`
  background: #fff;
  border: 1px solid #343434;
  box-shadow: rgba(0, 0, 0, 0.1) 1px 2px 4px;
  box-sizing: border-box;
  color: #343434;
  cursor: pointer;
  display: inline-block;
  font-size: 16px;
  font-weight: 800;
  text-align: center;
  vertical-align: middle;
  width: 30px;
  height: 30px;

  &:hover,
  &:active {
    background-color: #aca9e7;
    border: 1px solid #aca9e7;
    background-position: 0 0;
    color: #fff;
  }
`;

const buttonStyles = css`
  background: #aca9e7;
  backface-visibility: hidden;
  border-radius: 0.375rem;
  border-style: solid;
  border-width: 0.125rem;
  box-sizing: border-box;
  color: #212121;
  cursor: pointer;
  display: inline-block;
  font-family: Circular, Helvetica, sans-serif;
  font-size: 1.125rem;
  font-weight: 700;
  letter-spacing: -0.01em;
  line-height: 1;
  padding: 0.875rem 1.125rem;
  position: relative;
  text-align: left;
  text-decoration: none;
  transform: translateZ(0) scale(1);
  transition: transform 0.2s;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;

  &:not(:disabled):hover {
    transform: scale(1.05);
  }
`;

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

              <span css={counterContainerStyles}>
                <button
                  css={countButtonStyles}
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
                <span css={countNumberStyles}>{cartItem.cart}</span>
                <button
                  css={countButtonStyles}
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
              </span>

              <button
                css={removeItemStyles}
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
                x
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
        <button css={buttonStyles}>Checkout</button>
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
