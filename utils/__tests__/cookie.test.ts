import {
  getParsedCookie,
  removeCookie,
  setStringifiedCookie,
  stringifyCookieValue,
} from '../cookies';

test('stringify a cookie value', () => {
  expect(stringifyCookieValue([{ id: '1', cart: 2 }])).toBe(
    '[{"id":"1","cart":2}]',
  );
});

test('set, gets and delete a cookie', () => {
  const cookieKey = 'cart';
  const cookieValue = [{ id: '1', cart: 2 }];

  expect(getParsedCookie(cookieKey)).toBe(undefined);
  expect(() => setStringifiedCookie(cookieKey, cookieValue)).not.toThrow();

  expect(getParsedCookie(cookieKey)).toStrictEqual(cookieValue);

  expect(removeCookie(cookieKey)).toBe(undefined);

  expect(getParsedCookie(cookieKey)).toBe(undefined);
});
