import { css, Global } from '@emotion/react';
import { useEffect, useState } from 'react';
import CookieBanner from '../components/CookieBanner';
import Layout from '../components/Layout';
import { getProducts } from '../database/products';
import { getParsedCookie } from '../utils/cookies';

function MyApp({ Component, pageProps }) {
  const [cartTotal, setCartTotal] = useState(0);
  const [cartItems, setCartItems] = useState([]);

  // useEffect(() => {
  //   const currentCookieValue = getParsedCookie('cart');

  //   if (!currentCookieValue) {
  //     setCartItems('Your cart is empty');
  //   } else {
  //     setCartItems(JSON.stringify(currentCookieValue));
  //   }
  // }, [cartTotal]);

  return (
    <>
      <Global
        styles={css`
          * {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
              Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue',
              sans-serif;
          }
          a,
          a:visited {
            text-decoration: none;
            cursor: pointer;
            color: darkgray;
          }
        `}
      />
      <CookieBanner />
      <Layout cartTotal={cartTotal}>
        <Component
          {...pageProps}
          setCartTotal={setCartTotal}
          cartTotal={cartTotal}
          setCartItems={setCartItems}
          cartItems={cartItems}
        />
      </Layout>
    </>
  );
}

export default MyApp;

export async function getServerSideProps() {
  const products = await getProducts();
  return {
    props: {
      products: products,
    },
  };
}
