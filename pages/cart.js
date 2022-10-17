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

const mainBodyStyles = css`
  width: 950px;
  display: block;
  margin: 0 auto 100px auto;
`;
const h1Styles = css`
  text-align: start;
  margin-top: 60px;
  margin-bottom: 40px;
  text-decoration: underline;
  text-underline-offset: 6px;
`;

const cartItemStyles = css`
  border: 1px solid #343434;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 15px;
  margin-bottom: 10px;
`;

const productNameStyles = css`
  width: 400px;
  margin-left: 30px;
  font-weight: 300;
`;

const priceAndQtyContainerStyles = css`
  width: 400px;
`;

const priceStyles = css`
  width: 150px;
  display: inline-flex;
  justify-content: flex-start;
  margin-left: 80px;
`;
const quantityStyles = css`
  background-color: #fff;
  display: inline-flex;
  align-items: center;
  font-weight: 200;
`;

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
  border: 1px solid grey;
  box-sizing: border-box;
  color: grey;
  cursor: pointer;
  display: inline-block;
  font-size: 16px;
  font-weight: 800;
  text-align: center;
  vertical-align: middle;
  width: 30px;
  height: 30px;
  transition: all 0.2s ease-in-out;

  &:hover,
  &:active {
    background-color: #aca9e7;
    border: 1px solid #343434;
    background-position: 0 0;
    color: #343434;
  }
`;

const buttonStyles = css`
  background: #aca9e7;
  border-radius: 0.375rem;
  border-style: solid;
  border-width: 0.125rem;
  color: #212121;
  cursor: pointer;
  display: inline-block;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: -0.01em;
  line-height: 1;
  padding: 12px 12px;
  position: relative;
  text-align: left;
  text-decoration: none;
  transform: translateZ(0) scale(1);
  transition: transform 0.2s;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  margin-right: 10px;

  &:not(:disabled):hover {
    transform: scale(1.05);
  }

  &:disabled {
    background-color: #fff;
    cursor: default;
  }
`;

const clearButtonStyles = css`
  background: #fff;
  border: 1px solid grey;
  box-sizing: border-box;
  color: grey;
  cursor: pointer;
  display: inline-block;
  font-size: 14px;
  font-weight: 700;
  text-align: center;
  vertical-align: middle;
  transition: all 0.2s ease-in-out;
  border-radius: 0.375rem;
  padding: 12px 14px;

  &:hover,
  &:active {
    background-color: #aca9e7;
    border: 1px solid #343434;
    background-position: 0 0;
    color: #343434;
  }
`;

const totalAndCheckoutContainerStyles = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  width: 917px;
  margin: 30px 0;
`;

const totalStyles = css`
  font-weight: 600;
  letter-spacing: 0.8px;
  text-decoration: underline;
  text-underline-offset: 4px;
  font-size: 16px;
  width: 100px;
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

      <div css={mainBodyStyles}>
        <h1 css={h1Styles}>My Cart</h1>

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
              <div key={`cart-${cartItem.id}`} css={cartItemStyles}>
                <div>
                  <Link href={`/products/${product.id}`}>
                    <a>
                      <Image
                        src={`/${product.id}-${product.title}.jpeg`}
                        alt=""
                        width="130"
                        height="130"
                      />
                    </a>
                  </Link>
                </div>
                <div css={productNameStyles}>{product.title}</div>

                <div css={priceAndQtyContainerStyles}>
                  <div css={quantityStyles}>
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
                        –
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

                  <div css={priceStyles}>
                    Price € {product.price * cartItem.cart}
                    ,-
                  </div>
                </div>
              </div>
            );
          })
        )}

        <div css={totalAndCheckoutContainerStyles}>
          <button
            css={clearButtonStyles}
            onClick={() => {
              removeCookie('cart');
              props.setCartItems('Your Cart is empty!');
              props.setCartTotal(0);
              props.setTotalPrice(0);
            }}
          >
            Clear cart
          </button>
          <div>
            <a>
              <Link href="/products">
                <button css={buttonStyles}>Continue shopping</button>
              </Link>
            </a>
            <a>
              <Link href="/checkout">
                <button
                  css={buttonStyles}
                  disabled={!props.cartTotal ? true : false}
                  data-test-id="cart-checkout"
                >
                  Proceed to checkout
                </button>
              </Link>
            </a>
          </div>

          <span css={totalStyles}>Total: {props.totalPrice}€</span>
        </div>
      </div>
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
