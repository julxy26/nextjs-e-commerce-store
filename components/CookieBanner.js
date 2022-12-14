import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import { getLocalStorage, setLocalStorage } from '../utils/localStorage';

const bannerStyles = (isOpen) => css`
  padding: 10px;
  z-index: 1;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #fff;
  border-top: 1px solid #ddd;

  ${!isOpen &&
  css`
    display: none;
  `};
`;

export default function CookieBanner() {
  const [isBannerOpen, setIsBannerOpen] = useState(false);

  useEffect(() => {
    const initialValue = getLocalStorage('isBannerOpen');
    if (initialValue === null) {
      setIsBannerOpen(true);
    }
  }, []);

  return (
    <div css={bannerStyles(isBannerOpen)}>
      <span>Please accept our cookie policy</span>{' '}
      <button
        onClick={() => {
          setIsBannerOpen(false);
          setLocalStorage('isBannerOpen', false);
        }}
      >
        OK!
      </button>
    </div>
  );
}
