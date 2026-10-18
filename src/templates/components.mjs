import { escapeHtml as e, routeUrl } from '../lib/html.mjs';

export function arrow(direction = 'up-right') {
  const rotation = { up: 0, 'up-right': 45, 'down-right': 135, down: 180, left: 270 }[direction];
  return `<svg class="arrow-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M12 20V4m-6 6 6-6 6 6" transform="rotate(${rotation} 12 12)"/></svg>`;
}

export function heading(value) {
  const lines = text => e(text).replaceAll('\n', '<br>');
  return `${lines(value.plain)}${value.accent ? `${value.plain ? '<br>' : ''}<em>${lines(value.accent)}</em>` : ''}`;
}
export function image(item, basePath, { eager = false, className = '' } = {}) {
  return `<img${className ? ` class="${e(className)}"` : ''} src="${e(routeUrl(basePath, item.src))}" width="${item.width}" height="${item.height}" alt="${e(item.alt)}" loading="${eager ? 'eager' : 'lazy'}" decoding="async">`;
}
export function externalLink(url, label, className = 'link') {
  return `<a class="${e(className)}" href="${e(url)}" target="_blank" rel="noopener noreferrer">${e(label)} ${arrow()}</a>`;
}

export function caseNavigation(related, basePath) {
  return `<nav class="case-next pad" aria-label="More contributions"><a class="link" href="${e(routeUrl(basePath, '/#work'))}">${arrow('left')} All contributions</a><a class="next-case" href="${e(routeUrl(basePath, `/work/${related.slug}/`))}"><span class="eyebrow">Next case</span><span>${e(related.title)} ${arrow()}</span></a></nav>`;
}
