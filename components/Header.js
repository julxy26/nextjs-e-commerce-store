import { css } from '@emotion/react';
import Image from 'next/image';
import Link from 'next/link';
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
  return (
    <header>
      <nav css={headerNavStyles}>
        <span css={headerLinkStyles}>
          <Link href="/">Home</Link>
          <Link href="/shop">Shop</Link>
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
          <Link href="/cart">
            <a>
              <Image alt="" src={bag} width="25px" height="25px" />
            </a>
          </Link>
        </span>
      </nav>
      <hr />
    </header>
  );
}
