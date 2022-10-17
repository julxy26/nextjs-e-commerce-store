import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { getProductById } from '../../database/products';
import { getParsedCookie, setStringifiedCookie } from '../../utils/cookies';

const mainBodyStyles = css`
  margin: 65px 130px 100px 130px;
  width: 90%;
  display: flex;
  flex-wrap: wrap;
`;

const linkToShopStyles = css`
  margin-bottom: 25px;
  text-decoration: underline;
  text-underline-offset: 4px;
  font-weight: 200;
`;

const imageDivStyles = css`
  width: 575px;
  height: 575px;
  border: 2px solid #343434;
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const h2Styles = css`
  margin-top: 130px;
  color: #343434;
  text-align: center;
  width: 100%;
`;

const hrStyles = css`
  width: 400px;
  margin-top: -5px;
`;

const imageDivStyles2 = css`
  margin-top: 50px;
  display: flex;
  flex-wrap: wrap;
`;

const textContainerStyles = css`
  background-color: #aca9e7;
  border: 2px solid #aca9e7;
  height: 575px;
  width: 575px;
  margin-top: 43px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const h1Styles = css`
  margin: 50px 40px;
  text-decoration: underline;
  text-underline-offset: 7px;
  line-height: 45px;
  letter-spacing: 0.7px;
`;

const descriptionStyles = css`
  font-weight: 300;
  letter-spacing: 0.6px;
  line-height: 27px;
  margin: 0px 40px 30px 40px;
`;

const priceAndButtonDivStyles = css`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin: 50px 40px;
`;
const priceStyles = css`
  font-size: 27px;
  font-weight: 300;
  width: 250px;
  justify-self: flex-start;
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
  background-color: #aca9e7;
`;

const countNumberStyles = css`
  font-weight: 300;
  padding: 7px 7px;
  width: 20px;
  background-color: #ffe9ba;
  border-radius: 20px;
`;

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

      <main css={mainBodyStyles}>
        <div>
          <div css={linkToShopStyles}>
            <a>
              <Link href="/products"> Back to all products </Link>
            </a>
          </div>

          <div css={imageDivStyles}>
            <Image
              src={`/${props.product.id}-${props.product.title}.jpeg`}
              alt=""
              width="500"
              height="500"
            />
          </div>
        </div>
        <div css={textContainerStyles}>
          <h1 css={h1Styles}>{props.product.title}</h1>
          <p css={descriptionStyles}>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
            et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
            Lorem ipsum dolor sit amet.{' '}
          </p>
          <div css={priceAndButtonDivStyles}>
            <span css={priceStyles}>{props.product.price}€</span>
            <div css={counterContainerStyles}>
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
                  setProductCount(productCount ? productCount - 1 : 0);
                }}
              >
                –
              </button>
            </div>

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
                      (previousValue, currentValue) =>
                        previousValue + currentValue,
                    ),
                  ),
                );
              }}
            >
              Add to cart
            </button>
          </div>
        </div>

        <h2 css={h2Styles}>Scroll for more</h2>

        <hr css={hrStyles} />

        <div css={imageDivStyles2}>
          <div css={imageDivStyles}>
            <a>
              <Link href="/size-info">
                <Image src="/sizes.png" alt="" width="470" height="500" />
              </Link>
            </a>
          </div>

          <div css={imageDivStyles}>
            <Image
              src={`/${props.product.id}-${props.product.title}2.jpeg`}
              alt=""
              width="500"
              height="500"
            />
          </div>
          <div css={imageDivStyles}>
            <Image
              src={`/${props.product.id}-${props.product.title}3.jpeg`}
              alt=""
              width="500"
              height="500"
            />
          </div>
          <div css={imageDivStyles}>
            <Image
              src={`/${props.product.id}-${props.product.title}4.jpeg`}
              alt=""
              width="500"
              height="500"
            />
          </div>
        </div>
      </main>
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
