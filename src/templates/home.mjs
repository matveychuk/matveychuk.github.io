import { escapeHtml as e, routeUrl } from '../lib/html.mjs';
import { heading, externalLink, arrow } from './components.mjs';

function workCardContent({ slug, title, eyebrow, summary, contribution, focus }, basePath) {
  const url = e(routeUrl(basePath, `/work/${slug}/`));
  return `<div class="work-case-summary"><span class="eyebrow">${e(eyebrow)}</span><h3 id="${e(slug)}-card-heading"><a href="${url}">${e(title)}</a></h3><p>${e(summary)}</p></div>${contribution ? `<div class="work-case-details"><span class="eyebrow">My contribution</span><p>${e(contribution)}</p>${focus ? `<span class="eyebrow">Technical focus</span><p>${e(focus)}</p>` : ''}</div>` : ''}<a class="link" href="${url}" aria-label="Explore ${e(title)}">Explore the case ${arrow('up-right')}</a>`;
}

function currentWorkSection(work, basePath) {
  return `<article class="current-work" id="trustpoint" aria-labelledby="trustpoint-heading">
    <header class="current-work-header"><div><span class="eyebrow">${e(work.eyebrow)}</span><h2 id="trustpoint-heading">${externalLink(work.url, work.company, 'company-link')}</h2></div><p>${e(work.domain)}</p></header>
    <div class="current-work-intro"><p class="body-copy">${e(work.summary)}</p><p class="body-copy">${e(work.ownership)}</p></div>
    <div class="expertise-list">${work.areas.map((area, index) => `<section class="expertise-row" aria-labelledby="expertise-${index + 1}"><div><span class="expertise-number" aria-hidden="true">${String(index + 1).padStart(2, '0')}</span><h3 id="expertise-${index + 1}">${e(area.title)}</h3></div><div class="expertise-copy"><p>${e(area.text)}</p>${area.caseSlug ? `<a class="link" href="${e(routeUrl(basePath, `/work/${area.caseSlug}/`))}">Read the case study ${arrow('up-right')}</a>` : ''}</div><p class="expertise-label">${e(area.expertise)}</p></section>`).join('')}</div>
  </article>`;
}

export function homePage({ home, cases }, basePath) {
  const personal = cases.find(item => item.slug === home.featuredCase);
  const caseStudies = home.caseStudies.map(slug => cases.find(item => item.slug === slug));
  const background = home.background;
  const approach = home.approach;
  return `
  <section class="hero pad" aria-labelledby="profile-heading">
    <div>
      <span class="eyebrow">${e(home.eyebrow)}</span>
      <h1 id="profile-heading">${heading(home.heading)}</h1>
      <p class="intro">${e(home.intro)}</p>
      <div class="hero-actions">
        <a class="solid" href="#work">Explore my work ${arrow('down-right')}</a>
        <a class="link" href="#experience">My experience ${arrow('down')}</a>
      </div>
    </div>
    <div class="hero-profile">
      <figure class="hero-portrait">
        <img src="${e(routeUrl(basePath, '/assets/images/profile/portrait.jpg'))}" width="300" height="450" alt="Sasha speaking and gesturing during a group discussion" fetchpriority="high">
      </figure>
      <aside class="hero-note" aria-label="Current focus">
      ${home.focus.map(item => `<div class="note-row"><span class="eyebrow">${e(item.label)}</span><strong>${item.url ? externalLink(item.url, item.value, 'company-link') : e(item.value)}</strong></div>`).join('\n')}
      </aside>
    </div>
  </section>
  <section class="pad" id="work" aria-labelledby="work-heading">
    <div class="section-top"><h2 class="eyebrow" id="work-heading">Selected contributions</h2><span class="small">Product development & process ownership</span></div>
    <div class="work-cases">${caseStudies.map(item => `<article class="work-case" aria-labelledby="${e(item.slug)}-card-heading">${workCardContent({ slug: item.slug, ...item.card }, basePath)}</article>`).join('')}</div>
    <article class="work-case personal-project" aria-labelledby="bake-again-card-heading">
      ${workCardContent({ slug: personal.slug, title: personal.title, ...home.personalProject, focus: home.personalProject.footer }, basePath)}
    </article>
  </section>
  <section class="experience pad" id="experience" aria-labelledby="trustpoint-heading">
    ${currentWorkSection(background.currentWork, basePath)}
    <div class="earlier-experience"><span class="eyebrow">Earlier experience</span>
      <div class="background-list">${background.history.map(item => `<div class="background-row"><span class="period">${e(item.period)}</span><div><h3>${item.url ? externalLink(item.url, item.title, 'company-link') : e(item.title)}</h3><p>${e(item.text)}</p></div></div>`).join('\n')}</div>
    </div>
  </section>
  <section class="approach pad" id="approach" aria-labelledby="approach-heading">
    <h2 id="approach-heading">${e(approach.eyebrow)}</h2>
    <div class="approach-list">${approach.steps.map(item => `<div class="approach-item"><h3>${e(item.title)}</h3><p>${e(item.text)}</p></div>`).join('\n')}</div>
  </section>`;
}
