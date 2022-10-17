import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';

const mainBodyStyles = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 65px;
`;
const imageStyles = css`
  border: 2px solid #343434;
  margin-top: 30px;
  padding: 30px;
`;

export default function SizeInfo() {
  return (
    <>
      <Head>
        <title>Size chart</title>
        <meta name="description" content="Sizing information for your dog" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div css={mainBodyStyles}>
        <h1>How to choose the right size?</h1>
        <div css={imageStyles}>
          <Image src="/sizes.png" alt="" width="700" height="800" />
        </div>
      </div>
    </>
  );
}
