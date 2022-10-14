import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { getProductById } from '../../database/products';
import { getParsedCookie, setStringifiedCookie } from '../../utils/cookies';

const countButtonStyles = css`
  border: 1px solid #a7a7a7;
  font-size: 18px;
  margin: 10px;
`;

const countNumberStyles = css``;

const buttonStyles = css`
  background: #fff;
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

  &:not(:disabled):hover:active {
    transform: scale(1.05) translateY(0.125rem);
  }

  &:focus {
    outline: 0 solid transparent;
  }

  &:focus:before {
    content: '';
    left: calc(-1 * 0.375rem);
    pointer-events: none;
    position: absolute;
    top: calc(-1 * 0.375rem);
    transition: border-radius;
    user-select: none;
  }

  &:focus:not(:focus-visible) {
    outline: 0 solid transparent;
  }

  &:focus:not(:focus-visible):before {
    border-width: 0;
  }

  &:not(:disabled):active {
    transform: translateY(0.125rem);
  }
`;

export default function Product(props) {
  const [productCount, setProductCount] = useState(1);
  const currentCookieValue = getParsedCookie('cart');

  if (props.error) {
    return (
      <div>
        <Head>
          <title>Product not found</title>
          <meta name="description" content="Product not found" />
        </Head>
        <h1>{props.error}</h1>
        Sorry, try the <Link href="/shop">products page</Link>
      </div>
    );
  }

  return (
    <div>
      <Head>
        <title>{props.product.title}</title>
        <meta name="description" content={props.product.title} />
      </Head>

      <Link href="/products"> Back to all products </Link>

      <h2>{props.product.title}</h2>
      <Image
        src={`/${props.product.id}-${props.product.title}.jpeg`}
        alt=""
        width="500"
        height="500"
      />
      <div>description</div>

      <div>Price: {props.product.price}€</div>

      <button
        css={countButtonStyles}
        onClick={() => {
          setProductCount(productCount + 1);
        }}
      >
        +
      </button>

      <span css={countNumberStyles}>{productCount}</span>

      <button
        css={countButtonStyles}
        onClick={() => {
          setProductCount(productCount - 1);
        }}
      >
        -
      </button>

      <button
        css={buttonStyles}
        data-test-id="product-add-to-cart"
        onClick={() => {
          if (!currentCookieValue) {
            return setStringifiedCookie('cart', [
              { id: props.product.id, cart: productCount },
            ]);
          }

          const foundCookie = currentCookieValue.find(
            (cookie) => props.product.id === cookie.id,
          );

          if (!foundCookie) {
            currentCookieValue.push({
              id: props.product.id,
              cart: productCount,
            });
          } else {
            foundCookie.cart = foundCookie.cart + productCount;
          }

          const cookieCartNumber = currentCookieValue.map(
            (cookieValue) => cookieValue.cart,
          );
          setStringifiedCookie('cart', currentCookieValue);
          props.setCartTotal(
            JSON.stringify(
              cookieCartNumber.reduce(
                (previousValue, currentValue) => previousValue + currentValue,
              ),
            ),
          );
        }}
      >
        Add to cart
      </button>
    </div>
  );
}

export async function getServerSideProps(context) {
  // Retrieve the product ID from the URL
  const productId = parseInt(context.query.productId);

  const foundProduct = await getProductById(productId);

  if (typeof foundProduct === 'undefined') {
    context.res.statusCode = 404;
    return {
      props: {
        error: 'Product not found',
      },
    };
  }

  return {
    props: {
      product: foundProduct,
    },
  };
}
