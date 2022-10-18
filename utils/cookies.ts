import Cookies from 'js-cookie';

export function getParsedCookie(key: string) {
  const cookieValue = Cookies.get(key);
  if (!cookieValue) {
    return undefined;
  }

  try {
    return JSON.parse(cookieValue);
  } catch (err) {
    return undefined;
  }
}

type CartCookieItem = {
  id: string;
  cart: number;
};

export function stringifyCookieValue(value: CartCookieItem[]) {
  return JSON.stringify(value);
}

export function setStringifiedCookie(key: string, value: CartCookieItem[]) {
  Cookies.set(key, JSON.stringify(value));
}

export function removeCookie(key: string) {
  Cookies.remove(key);
}
