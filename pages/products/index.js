import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { getProducts } from '../../database/products';
import { getParsedCookie, setStringifiedCookie } from '../../utils/cookies';

export default function Products(props) {
  const [cartTotal, setCartTotal] = useState(0);
  return (
    <>
      <Head>
        <title>Our Products</title>
        <meta name="description" content="A list of our products" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <span>total: ({cartTotal})</span>
      <h1>Products page</h1>

      {props.products.map((product) => {
        return (
          <div key={`products-${product.id}`}>
            <a data-test-id="product-<product id>">
              <h2>
                <Link href={`/products/${product.id}`}>{product.title}</Link>
              </h2>
              <Link href={`/products/${product.id}`}>
                <Image
                  src={`/${product.id}-${product.title}.jpeg`}
                  alt=""
                  width="300"
                  height="300"
                />
              </Link>

              <div>description</div>
              <div>Price: {product.price}€</div>

              <button
                data-test-id="product-add-to-cart"
                onClick={() => {
                  const currentCookieValue = getParsedCookie('cart');

                  if (!currentCookieValue) {
                    setStringifiedCookie('cart', [{ id: product.id, cart: 1 }]);
                    return setCartTotal(1);
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
                  setStringifiedCookie('cart', currentCookieValue);
                  setCartTotal(cartTotal + 1);
                }}
              >
                Add to cart
              </button>
            </a>
          </div>
        );
      })}
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
