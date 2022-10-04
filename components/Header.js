import { css } from '@emotion/react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { getProductById } from '../database/products';
import profile from '../public/avatar.png';
import chicken from '../public/chicken.png';
import search from '../public/magnifying-glass.png';
import bag from '../public/shopping-bag.png';

const headerNavStyles = css`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100vw;
`;

const headerLinkStyles = css`
  padding: 0px;

  a + a {
    margin-left: 20px;
  }
`;

export default function Header() {
  const [cartTotal, setCartTotal] = useState(0);
  return (
    <header>
      <nav css={headerNavStyles}>
        <span css={headerLinkStyles}>
          <Link href="/">Home</Link>
          <Link href="/products">Shop</Link>
          <Link href="/size-info">Size info</Link>
        </span>

        <span>
          <Link href="/">
            <a>
              <Image alt="" src={chicken} width="110px" height="110px" />
            </a>
          </Link>
        </span>

        <span css={headerLinkStyles}>
          <Link href="/">
            <a>
              <Image alt="" src={search} width="25px" height="25px" />
            </a>
          </Link>

          <Link href="/">
            <a>
              <Image alt="" src={profile} width="25px" height="25px" />
            </a>
          </Link>

          <Link href="/cart" data-test-id="cart-link">
            <a>
              <Image alt="" src={bag} width="25px" height="25px" />
              <span>({cartTotal})</span>
            </a>
          </Link>
        </span>
      </nav>
      <hr />
    </header>
  );
}
