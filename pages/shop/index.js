import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { getProducts } from '../../database/products';

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
          <div key={`product-${product.id}`}>
            <h2>
              <Link href={`/products/${product.id}`}>{product.title}</Link>
            </h2>

            <Link href={`/products/${product.id}`}>
              <a>
                <Image
                  src={`/${product.id}-${product.title.toLowerCase()}.jpeg`}
                  alt=""
                  width="150"
                  height="150"
                />
              </a>
            </Link>

            <div>Title: {product.title}</div>
            <div>Price: {product.price}€</div>
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
