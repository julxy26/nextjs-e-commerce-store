import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';

export default function SizeInfo() {
  return (
    <>
      <Head>
        <title>How to choose the correct size?</title>
        <meta name="description" content="Sizing information for your dog" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>How to choose the right size?</h1>

      <Image src="/sizes.png" alt="" width="500" height="600" />
    </>
  );
}
