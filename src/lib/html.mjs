export function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, character => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  })[character]);
}

export function normalizeBasePath(basePath = '/') {
  if (!/^\/(?:[a-zA-Z0-9_-]+\/)*$/.test(basePath)) {
    throw new Error('BASE_PATH must start and end with /, for example / or /about/');
  }
  return basePath;
}

export function routeUrl(basePath, route) {
  if (!route.startsWith('/') || route.startsWith('//')) throw new Error(`Expected a local route: ${route}`);
  return `${basePath}${route.slice(1)}`;
}
