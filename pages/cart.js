import { css } from '@emotion/react';
import Head from 'next/head';

// import { getProductById, getProducts } from '../database/products';
// import { getParsedCookie, setStringifiedCookie } from '../utils/cookies';

export default function Cart(props) {
  return (
    <>
      <Head>
        <title>Cart</title>
        <meta name="description" content="cart" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>Cart page</h1>
    </>
  );
}

export async function getServerSideProps(context) {
  const productId = parseInt(context.query.productId);

  const foundProduct = await getProductById(productId);

  return {
    props: {
      product: foundProduct,
    },
  };
}
