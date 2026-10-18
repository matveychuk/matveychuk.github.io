import { escapeHtml as e, routeUrl } from '../lib/html.mjs';
import { image, externalLink, arrow, caseNavigation } from './components.mjs';

function screenshot(item, basePath, className = '') {
  const wide = item.width > item.height;
  return `<figure class="bake-shot ${wide ? 'bake-shot-wide' : ''} ${e(className)}"><div class="bake-shot-frame"${wide ? ' tabindex="0" role="region" aria-label="Product screenshot; scroll horizontally on a narrow screen"' : ''}>${image(item, basePath)}</div><figcaption>${e(item.caption)}${wide ? '<span class="bake-shot-hint">Swipe to explore the screenshot.</span>' : ''}</figcaption></figure>`;
}

export function casePage(item, related, basePath) {
  return `
  <div class="breadcrumb pad"><a href="${e(routeUrl(basePath, '/#work'))}">${arrow('left')} Selected contributions</a></div>
  <section class="bake-intro pad" aria-labelledby="case-heading">
    <div class="bake-intro-copy"><span class="eyebrow">${e(item.eyebrow)}</span><h1 id="case-heading">${e(item.title)}</h1><p class="bake-subtitle">${e(item.subtitle)}</p><p class="body-copy">${e(item.summary)}</p>
    ${externalLink(item.liveUrl, 'Explore Bake Again', 'link')}</div>
    <div class="bake-role"><h2>${e(item.role.title)}</h2><p class="body-copy">${e(item.role.text)}</p></div>
  </section>
  ${item.decisions.map((section,index) => `<section class="bake-feature pad ${section.id === 'assistant' ? 'bake-help' : section.id === 'cooking' ? 'bake-feature-reverse' : ''}" id="decision-${e(section.id)}" aria-labelledby="${e(section.id)}-heading">
    <div class="bake-feature-copy"><span class="eyebrow">${index === 0 ? 'Recipe model' : index === 1 ? 'Cook Mode' : 'Recipe guidance & AI'}</span><h2 id="${e(section.id)}-heading">${e(section.title)}</h2><p class="body-copy">${e(section.text)}</p>
    ${section.example ? `<p class="body-copy bake-example">${e(section.example)}</p>` : ''}
    ${section.details ? `<div class="bake-feature-details">${section.details.map(detail=>`<div><h3>${e(detail.title)}</h3><p class="body-copy">${e(detail.text)}</p></div>`).join('')}</div>` : ''}
    ${section.states ? `<dl class="bake-states">${section.states.map(state=>`<div><dt>${e(state.title)}</dt><dd>${e(state.text)}</dd></div>`).join('')}</dl>` : ''}
    ${section.paths ? `<div class="bake-help-paths">${section.paths.map(path=>`<div><h3>${e(path.title)}</h3><p class="body-copy">${e(path.text)}</p></div>`).join('')}</div><p class="small bake-note">${e(section.note)}</p>` : ''}</div>
    ${screenshot(section.image, basePath)}
  </section>`).join('')}
  <section class="bake-review pad" aria-labelledby="bake-review-heading"><h2 id="bake-review-heading">${e(item.review.title)}</h2><p class="body-copy">${e(item.review.text)}</p></section>
  <section class="bake-outcome pad" aria-labelledby="bake-outcome-heading"><div><span class="eyebrow">${e(item.outcome.title)}</span><h2 id="bake-outcome-heading">Tested recipes.<br><em>Practical guidance.</em></h2></div><div><p class="body-copy">${e(item.outcome.text)}</p>${externalLink(item.liveUrl,'Explore Bake Again','link')}</div></section>
  <section class="bake-technical pad" id="technical-details" aria-labelledby="technical-details-heading"><div class="bake-technical-content"><h2 id="technical-details-heading">${e(item.technical.title)}</h2><p class="body-copy">${e(item.technical.text)}</p><p class="body-copy">${e(item.technical.controls)}</p><p class="small">${e(item.technical.verification)}</p><dl class="stack-list">${item.technical.stack.map(layer=>`<div><dt>${e(layer.label)}</dt><dd>${e(layer.text)}</dd></div>`).join('')}</dl></div></section>
  ${caseNavigation(related, basePath)}`;
}
