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
        data-test-id="product-add-to-cart"
        onClick={() => {
          const currentCookieValue = getParsedCookie('cart');

          if (!currentCookieValue) {
            setStringifiedCookie('cart', [{ id: props.product.id, cart: 1 }]);
            return props.setCartTotal(1);
          }

          const foundCookie = currentCookieValue.find(
            (cookieProductObject) =>
              cookieProductObject.id === props.product.id,
          );

          if (!foundCookie) {
            currentCookieValue.push({
              id: props.product.id,
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
