import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { getProducts } from '../../database/products';
import { getParsedCookie, setStringifiedCookie } from '../../utils/cookies';

const h1Styles = css`
  text-align: start;
  margin-top: 60px;
  margin-left: 130px;
  text-decoration: underline;
  text-underline-offset: 5px;
`;

const bodyDivStyles = css`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 70px;
  margin-bottom: 100px;
`;

const productDivStyles = css`
  background-color: #fff;
  border: 2px solid #343434;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 10px 0 -10px 0;
  width: 540px;
  height: 640px;
  transition: all 0.4s ease-in-out;
  box-shadow: 18px 18px #aca9e7;
  background-image: url('/background-image-shop-page.jpg');
  background-position: center;

  &:hover {
    background-image: url('');
    background-color: #aca9e7;
    box-shadow: 0px 0px #aca9e7;
  }

  &:hover .image {
    background-color: #fff;
    width: 375px;
    height: 375px;
  }
`;

const imageDivStyles = css`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  transition: all 0.4s ease-in-out;
  background-color: #fff;
  border: 1px solid #343434;
  width: 375px;
  height: 375px;
`;
const paragraphStyle = css`
  background-color: #fff;
  border: 1px solid #343434;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  padding: 16px 20px;
  width: 335px;
`;

const h2Styles = css`
  text-align: center;
  padding: 7px 18px;
  font-size: 23px;
  margin-top: 0;
  color: #343434;

  a:visited {
    color: #343434;
  }
`;
const descriptionStyles = css`
  margin-top: -10px;
  font-size: 16px;
  font-weight: 300;
`;
const priceAndButtonDivStyles = css`
  display: inline-flex;
  align-items: center;
  justify-content: flex-end;
  width: 340px;
`;
const buttonStyles = css`
  background: #ffe9ba;
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
`;

const priceStyles = css`
  margin-right: 21px;
  font-size: 20px;
  background-color: #ffe9ba;
  width: 50px;
  height: 50px;
  border-radius: 50px;
  text-align: center;
  line-height: 50px;
  font-weight: 400;
`;

export default function Products(props) {
  return (
    <>
      <Head>
        <title>Products</title>
        <meta name="description" content="A list of our products" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 css={h1Styles}>Our Products</h1>
      <div css={bodyDivStyles}>
        {props.products.map((product) => {
          return (
            <div
              css={productDivStyles}
              key={`products-${product.id}`}
              data-test-id="product-<product id>"
            >
              <div className="image" css={imageDivStyles}>
                <Link href={`/products/${product.id}`}>
                  <a>
                    <Image
                      src={`/${product.id}-${product.title}.jpeg`}
                      alt=""
                      width="340"
                      height="340"
                    />
                  </a>
                </Link>
              </div>
              <div className="paragraph" css={paragraphStyle}>
                <h2 css={h2Styles}>
                  <a>
                    <Link href={`/products/${product.id}`}>
                      {product.title}
                    </Link>
                  </a>
                </h2>

                <p css={descriptionStyles}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                  sed...{' '}
                  <i>
                    <u>view more</u>
                  </i>
                </p>

                <div css={priceAndButtonDivStyles}>
                  <span css={priceStyles}>{product.price}€</span>

                  <button
                    css={buttonStyles}
                    data-test-id="product-add-to-cart"
                    onClick={() => {
                      const currentCookieValue = getParsedCookie('cart');

                      if (!currentCookieValue) {
                        setStringifiedCookie('cart', [
                          { id: product.id, cart: 1 },
                        ]);
                        return props.setCartTotal(1);
                      }

                      const foundCookie = currentCookieValue.find(
                        (cookieProductObject) =>
                          cookieProductObject.id === product.id,
                      );

                      if (!foundCookie) {
                        currentCookieValue.push({
                          id: product.id,
                          cart: 1,
                        });
                      } else {
                        foundCookie.cart++;
                      }
                      const cookieCartNumber = currentCookieValue.map(
                        (cookieValue) => cookieValue.cart,
                      );

                      const reducedCookieCartNumber = cookieCartNumber.reduce(
                        (previousValue, currentValue) =>
                          previousValue + currentValue,
                      );

                      props.setCartTotal(reducedCookieCartNumber);
                      props.setTotalPrice(product.price * cookieCartNumber);

                      setStringifiedCookie('cart', currentCookieValue);
                    }}
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            </div>
          );
        })}
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
