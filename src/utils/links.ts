export function withBase(path: string): string {
  const rawBase = import.meta.env.BASE_URL;
  const base = rawBase.endsWith('/') ? rawBase : `${rawBase}/`;
  const normalized = path.replace(/^\/+/, '');
  return normalized ? `${base}${normalized}` : base;
}
