export function setCookie(name: string, value: string, days = 1) {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = `expires=${date.toUTCString()}`;
  const secure = window.location.protocol === 'https:' ? '; Secure' : '';
  document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}; ${expires}; Path=/; SameSite=Lax${secure}`;
}

export function deleteCookie(name: string) {
  const past = new Date(0).toUTCString();
  document.cookie = `${encodeURIComponent(name)}=; expires=${past}; Path=/; SameSite=Lax`;
}

export function getCookie(name: string): string | null {
  const nameEQ = encodeURIComponent(name) + '=';
  const parts = document.cookie.split(';');
  for (let i = 0; i < parts.length; i++) {
    const c = parts[i].trim();
    if (c.indexOf(nameEQ) === 0) {
      return decodeURIComponent(c.substring(nameEQ.length));
    }
  }
  return null;
}
