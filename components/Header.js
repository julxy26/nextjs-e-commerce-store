import { css } from '@emotion/react';
import Image from 'next/image';
import Link from 'next/link';
import basket from '../public/basket.png';
import inuLogo from '../public/inu-logo-icon-dark.png';

const headerStyles = css`
  background-color: #fff;
  margin: -9px -8px;
  padding: 0;
  width: 100vw;
  border: none;
  height: 75px;
  z-index: 1;
  position: sticky;
  top: 0;
  border-bottom: 1px solid #343434;
`;

const headerNavStyles = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100vw;
  height: 80px;
`;

const headerLinkStyles = css`
  margin-left: 70px;
  margin-right: 100px;

  a {
    color: #000;
    position: relative;
    text-decoration: none;
    font-size: 17px;
    font-weight: 400;
  }

  a + a {
    margin-left: 60px;
  }

  a::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 2px;
    border-radius: 5px;
    background-color: #aca9e7;
    bottom: -2px;
    left: 0;
    transform-origin: right;
    transform: scaleX(0);
    transition: transform 0.3s ease-in-out;
  }

  a:hover {
    color: #aca9e7;
  }

  a:hover::before {
    transform-origin: left;
    transform: scaleX(1);
  }
`;

const dogLogo = css`
  margin-right: 230px;
`;

const cartTotalStyles = css`
  background-color: #ffe9ba;
  text-align: center;
  font-size: 14px;
  line-height: 23px;
  margin-top: 12px;
  position: absolute;
  border-radius: 23px;
  height: 23px;
  width: 23px;

  &:hover {
    color: #343434;
  }
`;
export default function Header(props) {
  return (
    <header css={headerStyles}>
      <nav css={headerNavStyles}>
        <span className="navText" css={headerLinkStyles}>
          <Link href="/">Home</Link>
          <Link href="/products">Shop</Link>
          <Link href="/size-info">Size info</Link>
        </span>

        <span css={dogLogo}>
          <Link href="/">
            <a>
              <Image alt="" src={inuLogo} width="50px" height="40px" />
            </a>
          </Link>
        </span>

        <span css={headerLinkStyles}>
          <Link href="/cart" data-test-id="cart-link">
            <a>
              <Image alt="" src={basket} width="32px" height="32px" />
              <span css={cartTotalStyles}>{props.cartTotal}</span>
            </a>
          </Link>
        </span>
      </nav>
    </header>
  );
}
