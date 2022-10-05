import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { getProductById } from '../../database/products';
import { getParsedCookie, setStringifiedCookie } from '../../utils/cookies';

export default function Product(props) {
  const [cartTotal, setCartTotal] = useState(0);
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
      <span>total: ({cartTotal})</span>
      <h2>{props.product.title}</h2>
      <Image
        src={`/${props.product.id}-${props.product.title}.jpeg`}
        alt=""
        width="500"
        height="500"
      />
      <div>Price: {props.product.price}€</div>

      <button
        data-test-id="product-add-to-cart"
        onClick={() => {
          const currentCookieValue = getParsedCookie('cart');

          if (!currentCookieValue) {
            setStringifiedCookie('cart', [{ id: props.product.id, cart: 1 }]);
            return setCartTotal(1);
          }

          const allCookie = currentCookieValue.find(
            (cookieProductObject) =>
              cookieProductObject.id === props.cookieProductObject.id,
          );

          if (!allCookie) {
            currentCookieValue.push({
              id: props.product.id,
              cart: 1,
            });
          } else {
            allCookie.cart++;
          }
          setStringifiedCookie('cart', currentCookieValue);
          setCartTotal(allCookie.cart);
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
