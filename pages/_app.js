import { css, Global } from '@emotion/react';
import { useEffect, useState } from 'react';
import CookieBanner from '../components/CookieBanner';
import Layout from '../components/Layout';
import { getParsedCookie } from '../utils/cookies';

function MyApp({ Component, pageProps }) {
  const [cartTotal, setCartTotal] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const currentCookieValue = getParsedCookie('cart');
    if (!currentCookieValue[0]) {
      setCartItems('Your Cart is empty!');
      return;
    }

    const cookieCartNumber = currentCookieValue.map(
      (cookieValue) => cookieValue.cart,
    );

    setCartTotal(
      JSON.stringify(
        cookieCartNumber.reduce(
          (previousValue, currentValue) => previousValue + currentValue,
        ),
      ),
    );
  }, [cartItems, totalPrice]);

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
          setTotalPrice={setTotalPrice}
          totalPrice={totalPrice}
        />
      </Layout>
    </>
  );
}

export default MyApp;
