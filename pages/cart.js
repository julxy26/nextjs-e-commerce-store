import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getProducts } from '../database/products';
import { getParsedCookie, removeCookie } from '../utils/cookies';

// import { getProductById, getProducts } from '../database/products';
// import { getParsedCookie, setStringifiedCookie } from '../utils/cookies';

// return {
//   id: cartItem.id,
//   name: item[0].title,
//   price: item[0].price,
//   qty: cartItem.cart,
// };

export default function Cart(props) {
  const [totalPrice, setTotalPrice] = useState(0);
  useEffect(() => {
    const currentCookieValue = getParsedCookie('cart');

    if (!currentCookieValue) {
      props.setCartItems('Your Cart is empty!');
      return;
    }

    const cartItemsFound = currentCookieValue.map((cartItem) => {
      const product = props.products.filter(
        (singleProduct) => singleProduct.id === cartItem.id,
      );

      return (
        <div key={`cart-${cartItem.id}`}>
          <div>{product[0].title}</div>
          <Link href={`/products/${product[0].id}`}>
            <Image
              src={`/${product[0].id}-${product[0].title}.jpeg`}
              alt=""
              width="150"
              height="150"
            />
          </Link>
          <span>Price € {product[0].price},-</span>

          <span>Qty</span>
          <button>+</button>
          <span>{cartItem.cart}</span>
          <button>-</button>
        </div>
      );
    });
    props.setCartItems(cartItemsFound);
  }, []);

  return (
    <>
      <Head>
        <title>Cart</title>
        <meta name="description" content="cart" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>Cart page</h1>
      <span>{props.cartItems}</span>
      <button
        onClick={() => {
          removeCookie('cart');
          props.setCartItems('Your Cart is empty!');
          props.setCartTotal(0);
        }}
      >
        Clear all
      </button>
      <span>Total: {totalPrice}</span>
      <Link href="/checkout">
        <button>Checkout</button>
      </Link>
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
