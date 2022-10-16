import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

const bodyDivStyles = css`
  display: block;
  text-align: center;
  margin-top: 110px;
  width: 100vw;
  margin-left: -5px;
`;
const sectionDivStyles = css`
  background-image: url('/background-image.webp');
  border-bottom: 1px solid #343434;
  height: 700px;
  margin-top: -110px;
  margin-left: -8px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const sectionContentStyles = css`
  background-color: #fff;
  border: 2px solid #343434;
  margin-top: -40px;
  width: 900px;
  height: 580px;
  box-shadow: 20px 20px #aca9e7;
`;

const h1Styles = css`
  display: block;
  text-align: center;
  width: 250px;
  margin: 70px 0px 40px 130px;
  font-size: 45px;
  color: #343434;
  font-weight: 100;
  text-decoration: underline;
  text-underline-offset: 8px;
  text-decoration-thickness: 1px;
  font-style: italic;
  background-color: #ffe9ba;
  padding: 0 14px 10px 14px;
`;

const textStyles = css`
  margin-left: auto;
  margin-right: auto;
  margin-top: 30px;
  font-size: 18px;
  width: 600px;
  padding: 14px 10px;
  font-weight: 300;
  letter-spacing: 0.6px;
  line-height: 27px;
`;
const buttonStyles = css`
  margin-top: 10px;
  background: #aca9e7;
  backface-visibility: hidden;
  border-radius: 0.375rem;
  border-style: solid;
  border-width: 0.125rem;
  box-sizing: border-box;
  color: #212121;
  cursor: pointer;
  display: inline-block;
  font-family: Circular, Helvetica, sans-serif;
  font-size: 1.125rem;
  font-weight: 700;
  letter-spacing: -0.01em;
  line-height: 1;
  padding: 0.875rem 1.125rem;
  position: relative;
  text-align: left;
  text-decoration: none;
  transform: translateZ(0) scale(1);
  transition: transform 0.2s;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;

  &:not(:disabled):hover {
    transform: scale(1.05);
  }
`;

const h2Styles = css`
  margin-top: 80px;
  color: #343434;
`;

const hrStyles = css`
  width: 400px;
  margin-top: -5px;
`;

const bestsellerImagesStyles = css`
  display: inline-flex;
  margin: 35px 25px 70px 25px;
  transition: all 0.3s ease-in-out;
  border-right: 3px solid #fff;
  opacity: 0.7;

  &:hover {
    box-shadow: 12px 12px #aca9e7;
    opacity: 1;
  }
`;

export default function Home() {
  return (
    <>
      <Head>
        <title>Welcome to inu </title>
        <meta name="description" content="Cosplay for your dog" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div css={bodyDivStyles}>
        <div css={sectionDivStyles}>
          <div css={sectionContentStyles}>
            <h1 css={h1Styles}>Welcome to</h1>
            <Image
              src="/inu-logo-dark.png"
              width="556"
              height="150"
              alt="logo of inu"
            />

            <p css={textStyles}>
              Ever wanted to cosplay with your best companion? Cosplaying is not
              just for humans! Visit our shop to see awesome cosplays for your
              dog.
            </p>
            <a>
              <Link href="/products">
                <button css={buttonStyles}>Go to shop</button>
              </Link>
            </a>
          </div>
        </div>

        <h2 css={h2Styles}>Bestsellers</h2>

        <hr css={hrStyles} />

        <div css={bestsellerImagesStyles}>
          <a>
            <Link href="/products/1">
              <Image
                src="/1-pokemon cosplay with hoodie.jpeg"
                width="200"
                height="200"
                alt=""
              />
            </Link>
          </a>
        </div>

        <div css={bestsellerImagesStyles}>
          <a>
            <Link href="/products/3">
              <Image
                src="/3-sherlock holmes cape dog cosplay.jpeg"
                width="200"
                height="200"
                alt=""
              />
            </Link>
          </a>
        </div>

        <div css={bestsellerImagesStyles}>
          <a>
            <Link href="/products/4">
              <Image
                src="/4-japanese kimono dog costume in floral print.jpeg"
                width="200"
                height="200"
                alt=""
              />
            </Link>
          </a>
        </div>
      </div>
    </>
  );
}
