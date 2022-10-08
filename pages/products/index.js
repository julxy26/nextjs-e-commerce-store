import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { getProducts } from '../../database/products';
import { getParsedCookie, setStringifiedCookie } from '../../utils/cookies';

export default function Products(props) {
  return (
    <>
      <Head>
        <title>Our Products</title>
        <meta name="description" content="A list of our products" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>Products page</h1>

      {props.products.map((product) => {
        return (
          <div
            key={`products-${product.id}`}
            data-test-id="product-<product id>"
          >
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
