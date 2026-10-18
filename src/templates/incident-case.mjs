import { escapeHtml as e, routeUrl } from '../lib/html.mjs';
import { caseNavigation, arrow, heading } from './components.mjs';

export function incidentCasePage(item, related, basePath) {
  const { flow, details, outcome, technical } = item;
  return `
  <div class="incident-case">
    <div class="breadcrumb pad"><a href="${e(routeUrl(basePath, '/#work'))}">${arrow('left')} Selected contributions</a></div>
    <section class="incident-intro pad" aria-labelledby="case-heading">
      <span class="eyebrow">${e(item.eyebrow)}</span><h1 id="case-heading">${e(item.title)}</h1><p class="case-subtitle">${e(item.subtitle)}</p>
      <div class="incident-intro-copy"><p class="body-copy">${e(item.summary)}</p><p class="body-copy">${e(item.startingPoint.text)}</p></div>
      <dl class="case-facts">${item.facts.map(fact=>`<div><dt class="eyebrow">${e(fact.label)}</dt><dd>${e(fact.text)}</dd></div>`).join('')}</dl>
    </section>
    <section class="incident-process pad" aria-labelledby="flow-heading"><div class="incident-process-inner">
      <span class="eyebrow">${e(flow.eyebrow)}</span><h2 id="flow-heading">${e(flow.title)}</h2>
      <div class="incident-flow"><div class="incident-flow-node"><h3>${e(flow.entry.title)}</h3><p>${e(flow.entry.text)}</p></div><div class="incident-flow-node"><h3>${e(flow.triage.title)}</h3><p>${e(flow.triage.text)}</p></div><ol class="workflow-steps">${flow.steps.map(step=>`<li><h3>${e(step.title)}</h3><p>${e(step.text)}</p><span class="flow-label">${e(step.label)}</span></li>`).join('')}</ol></div>
      <p class="small incident-flow-note">${e(flow.footnote)}</p>
    </div></section>
    <section class="incident-details pad" aria-label="What I built">${details.items.map((detail,index)=>`<article class="incident-detail"><div><span class="eyebrow">${['Request handling','On-call coordination','Incident follow-up'][index]}</span><h2>${e(detail.title)}</h2></div><div><p class="body-copy">${e(detail.text)}</p>${detail.supporting ? `<p class="body-copy">${e(detail.supporting)}</p>` : ''}</div></article>`).join('')}</section>
    <section class="incident-outcome pad" aria-labelledby="outcome-heading"><div><span class="eyebrow">${e(outcome.eyebrow)}</span><h2 id="outcome-heading">${heading(outcome.heading)}</h2></div><p class="body-copy">${e(outcome.text)}</p></section>
    <section class="incident-technical pad" aria-labelledby="technical-heading"><h2 id="technical-heading">${e(technical.title)}</h2><p class="body-copy">${e(technical.text)}</p><p class="small">${e(technical.stack)}</p></section>
    ${caseNavigation(related, basePath)}
  </div>`;
}
