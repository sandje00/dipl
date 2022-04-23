export function getCookieValue(key) {
  const cookies = parseCookies();
  return cookies[key];
}

export function parseCookies() {
  return document.cookie
    .split(';')
    .map(it => it.split('='))
    .reduce((r, d) => {
      r[decodeURIComponent(d[0].trim())] = decodeURIComponent(d[1].trim());
      return r;
    }, {});
}
