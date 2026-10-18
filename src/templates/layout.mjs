import { escapeHtml as e, routeUrl } from '../lib/html.mjs';

import { arrow } from './components.mjs';

export function layout({ site, title, description = site.description, basePath, body, route }) {
  return `<!doctype html>
<html lang="${e(site.language)}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="${e(description)}">
  ${route === '/404.html' ? '<meta name="robots" content="noindex, follow">' : '<meta name="robots" content="index, follow">'}
  <link rel="canonical" href="${e(new URL(route.slice(1), site.url).href)}">
  <meta name="color-scheme" content="dark">
  <meta name="theme-color" content="#1d232d">
  <meta property="og:title" content="${e(title)}">
  <meta property="og:description" content="${e(description)}">
  <meta property="og:type" content="website">
  <title>${e(title)}</title>
  <link rel="icon" type="image/svg+xml" href="${e(routeUrl(basePath, '/assets/favicon.svg'))}">
  <link rel="stylesheet" href="${e(routeUrl(basePath, '/assets/fonts.css'))}">
  <link rel="stylesheet" href="${e(routeUrl(basePath, '/assets/theme.css'))}">
  <link rel="stylesheet" href="${e(routeUrl(basePath, '/assets/site.css'))}">
  ${route === '/' || route === '/work/bake-again/' ? `<link rel="stylesheet" href="${e(routeUrl(basePath, '/assets/profile.css'))}">` : ''}
</head>
<body>
  <a class="skip-link" href="#main">Skip to content</a>
  <div class="profile" id="top">
    <header class="topbar">
      <a class="wordmark" href="${e(basePath)}">${e(site.name)}</a>
      <nav class="navlinks" aria-label="Main navigation">${site.navigation.map(link => `<a href="${e(routeUrl(basePath, link.path))}">${e(link.label)}${link.arrow ? ` ${arrow(link.arrow)}` : ''}</a>`).join('\n')}</nav>
    </header>
    <main id="main" tabindex="-1">${body}</main>
    <footer class="footer" id="connect">
      <div><p class="footer-name">${e(site.name)}</p><p class="small">${e(site.footer)}</p></div>
      <div class="footer-links">${site.socials.map(link => `<a href="${e(link.url)}" target="_blank" rel="noopener noreferrer">${e(link.label)} ${arrow()}</a>`).join('')}<a class="link" href="#top">Back to top ${arrow('up')}</a></div>
    </footer>
  </div>
</body>
</html>`;
}
