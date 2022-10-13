import { css } from '@emotion/react';
import Image from 'next/image';
import Link from 'next/link';
import profile from '../public/avatar.png';
import dog from '../public/dog-logo.png';
import search from '../public/magnifying-glass.png';
import bag from '../public/shopping-bag.png';

const headerNavStyles = css`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100vw;
  height: 97px;
  border-bottom: 1px solid #000;
  margin-bottom: 40px;
`;

const headerLinkStyles = css`
  padding: 0px;

  a + a {
    margin-left: 35px;
  }
`;

const dogLogo = css`
  margin-top: -20px;
`;

export default function Header(props) {
  return (
    <header>
      <nav css={headerNavStyles}>
        <span css={headerLinkStyles}>
          <Link href="/">Home</Link>
          <Link href="/products">Shop</Link>
          <Link href="/size-info">Size info</Link>
        </span>

        <span css={dogLogo}>
          <Link href="/">
            <a>
              <Image alt="" src={dog} width="160px" height="120px" />
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
              <span>({props.cartTotal})</span>
            </a>
          </Link>
        </span>
      </nav>
    </header>
  );
}
