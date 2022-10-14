import { css } from '@emotion/react';
import Image from 'next/image';
import Link from 'next/link';

const footerStyles = css`
  padding-top: 40px;
  background-color: #ffffff;
  color: #4b4c4d;

  ul {
    list-style: none;
    text-align: center;
    font-size: 16px;
    line-height: 1.6;
    margin-bottom: 0;
    width: 100vw;
    display: inline-flex;
    flex-direction: row;
    justify-content: center;
    padding: 0;
  }

  li {
    padding: 0 10px;
  }

  ul a {
    color: inherit;
    text-decoration: none;
    opacity: 0.8;
  }

  ul a:hover {
    opacity: 1;
  }

  .social {
    margin-top: 30px;
    display: flex;
    justify-content: center;

    a {
      margin-left: 25px;
    }
  }

  .copyright {
    margin-top: 15px;
    text-align: center;
    font-size: 13px;
    color: #aaa;
    margin-bottom: 0;
  }
`;

export default function Footer() {
  return (
    <div css={footerStyles}>
      <hr />
      <div className="social">
        <a>
          {' '}
          <Link href="/">
            <Image src="/fb-icon.png" alt="" width="50" height="50" />
          </Link>
        </a>
        <a>
          <Link href="/">
            <Image src="/ig-icon.png" alt="" width="50" height="50" />
          </Link>
        </a>
        <a>
          <Link href="/">
            <Image src="/twitter-icon.png" alt="" width="50" height="50" />
          </Link>
        </a>
        <a>
          <Link href="/">
            <Image src="/yt-icon.png" alt="" width="50" height="50" />
          </Link>
        </a>
      </div>
      <ul className="list-inline">
        <li className="list-inline-item">
          <a>
            {' '}
            <Link href="/">Home</Link>
          </a>
        </li>
        <li className="list-inline-item">
          <a>Services</a>
        </li>
        <li className="list-inline-item">
          <a>About</a>
        </li>
        <li className="list-inline-item">
          <a>Terms</a>
        </li>
        <li className="list-inline-item">
          <a>Privacy Policy</a>
        </li>
      </ul>
      <p className="copyright">INU GmbH © 2022</p>
    </div>
  );
}
