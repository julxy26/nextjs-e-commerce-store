import { css } from '@emotion/react';
import Head from 'next/head';

export default function ThankYou() {
  return (
    <>
      <Head>
        <title>Thank you for your order!</title>
        <meta name="description" content="Thank you for your purchase" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>Thank you for your purchase!</h1>
    </>
  );
}
