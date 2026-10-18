import { escapeHtml as e, routeUrl } from '../lib/html.mjs';
import { caseNavigation, arrow, heading, externalLink } from './components.mjs';

function adoptionExample(example) {
  return `<aside class="product-use-example" aria-labelledby="navigation-example-heading"><span class="eyebrow">In practice · Navigation change</span><h3 id="navigation-example-heading">${e(example.title)}</h3><p class="body-copy">${e(example.intro)}</p><dl>${example.steps.map(step=>`<div><dt>${e(step.title)}</dt><dd>${e(step.text)}</dd></div>`).join('')}</dl></aside>`;
}
function routingDiagram(routing) {
  return `<div class="product-use-routing" aria-label="Three paths for analyzed frustration signals"><p class="routing-entry">Analyzed findings</p><ol class="workflow-steps">${routing.branches.map(branch=>`<li><span class="eyebrow">${e(branch.label)}</span><h3>${e(branch.title)}</h3><p>${e(branch.text)}</p><span class="flow-label">${e(branch.outcome)}</span></li>`).join('')}</ol></div>`;
}
export function productUseCasePage(item, related, basePath) {
  const [adoption,friction,followUp]=item.details.items;
  return `<div class="product-use-case">
    <div class="breadcrumb pad"><a href="${e(routeUrl(basePath,'/#work'))}">${arrow('left')} Selected contributions</a></div>
    <section class="product-use-intro pad" aria-labelledby="case-heading"><span class="eyebrow">${e(item.eyebrow)}</span><h1 id="case-heading">${e(item.title)}</h1><p class="case-subtitle">${e(item.subtitle)}</p><p class="body-copy">${e(item.summary)}</p><dl class="case-facts">${item.facts.map(fact=>`<div><dt class="eyebrow">${e(fact.label)}</dt><dd>${e(fact.text)}</dd></div>`).join('')}</dl></section>
    <section class="product-use-block pad" aria-labelledby="adoption-heading"><div class="product-use-block-copy"><span class="eyebrow">${e(adoption.eyebrow)}</span><h2 id="adoption-heading">${e(adoption.title)}</h2><p class="body-copy">${e(adoption.text)}</p></div>${adoptionExample(adoption.example)}</section>
    <section class="product-use-block product-use-friction pad" aria-labelledby="friction-heading"><div class="product-use-block-copy"><span class="eyebrow">${e(friction.eyebrow)}</span><h2 id="friction-heading">${e(friction.title)}</h2><p class="body-copy">${e(friction.text)}</p>${friction.supporting ? `<p class="body-copy">${e(friction.supporting)}</p>` : ''}<p class="small product-use-signal-note">${e(item.signals.note)}</p>${externalLink(item.signals.url,'About Datadog signals')}</div>${routingDiagram(item.routing)}</section>
    <section class="product-use-follow-up pad" aria-labelledby="follow-up-heading"><div><span class="eyebrow">${e(followUp.eyebrow)}</span><h2 id="follow-up-heading">${e(followUp.title)}</h2></div><div><p class="body-copy">${e(followUp.text)}</p><p class="body-copy">${e(followUp.supporting)}</p></div></section>
    <section class="product-use-outcome pad" aria-labelledby="outcome-heading"><div><span class="eyebrow">${e(item.outcome.eyebrow)}</span><h2 id="outcome-heading">${heading(item.outcome.heading)}</h2></div><p class="body-copy">${e(item.outcome.text)}</p></section>
    <section class="product-use-technical pad" aria-labelledby="technical-heading"><h2 id="technical-heading">${e(item.technical.title)}</h2><p class="body-copy">${e(item.technical.text)}</p><p class="small">${e(item.technical.stack)}</p></section>
    ${caseNavigation(related, basePath)}
  </div>`;
}
