import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { getProductById } from '../../database/products';
import { getParsedCookie, setStringifiedCookie } from '../../utils/cookies';

export default function Product(props) {
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
          // getting the value of the cookie stars
          const currentCookieValue = getParsedCookie('cart');

          // if there is no cookie we initialize the value with a 1
          if (!currentCookieValue) {
            setStringifiedCookie('cart', [
              { id: props.foundProduct.id, cart: 1 },
            ]);
            return;
          }

          // find the object that match the id of the page
          const foundCookie = currentCookieValue.find(
            (cookieFruitObject) =>
              cookieFruitObject.id === props.foundProduct.id,
          );

          // if a object is not found i add a new object
          if (!foundCookie) {
            currentCookieValue.push({ id: props.foundProduct.id, stars: 1 });
          } else {
            // if a object is found i update the stars
            foundCookie.stars++;
          }
          // set the new value of the cookie
          setStringifiedCookie('cart', currentCookieValue);
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
