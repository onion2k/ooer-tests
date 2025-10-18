export function buildUrl(baseURL: string | undefined, path = ''): string {
  const base = baseURL ?? 'https://ooer.com';
  const normalizedBase = base.endsWith('/') ? base.slice(0, -1) : base;

  if (!path || path === '/') {
    return normalizedBase;
  }

  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${normalizedBase}${normalizedPath}`;
}
