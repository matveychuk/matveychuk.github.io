import { readFile, readdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

export const contentDirectory = fileURLToPath(new URL('../content/', import.meta.url));
function requiredText(value, path) {
  if (typeof value !== 'string' || !value.trim()) throw new Error(`${path}: expected non-empty text`);
}
export function validateContent(content) {
  const { site, home, cases } = content;
  for (const key of ['language', 'name', 'description', 'footer']) requiredText(site[key], `site.${key}`);
  if (!/^[a-z]{2}(?:-[A-Z]{2})?$/.test(site.language)) throw new Error('Invalid language');
  if (!Array.isArray(cases) || !cases.length) throw new Error('At least one case is required');
  const slugs = new Set();
  for (const item of cases) {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(item.slug) || slugs.has(item.slug)) throw new Error('Invalid or duplicate case slug');
    slugs.add(item.slug);
    for (const key of ['title', 'description', 'subtitle', 'summary']) requiredText(item[key], `${item.slug}.${key}`);
    if (item.kind === 'workflow') {
      for (const section of ['card', 'details', 'outcome', 'technical']) {
        if (!item[section]) throw new Error(`${item.slug}: missing ${section}`);
      }
      if (item.slug === 'incident-management') {
        if (!Array.isArray(item.flow?.steps) || item.flow.steps.length < 2) throw new Error('Incident workflow needs at least two steps');
        for (const step of item.flow.steps) for (const key of ['title', 'text', 'label']) requiredText(step[key], `${item.slug}.flow.${key}`);
      }
      if (!Array.isArray(item.facts) || !item.facts.length || !Array.isArray(item.details.items) || !item.details.items.length) throw new Error('Workflow needs facts and implementation details');
      if (item.routing && (!Array.isArray(item.routing.branches) || item.routing.branches.length !== 3)) throw new Error('Expected three triage branches');
    } else {
      if (item.kind && item.kind !== 'product') throw new Error('Unknown case kind');
      const decisions = item.decisions.map(decision => decision.id);
      if (decisions.length !== 3 || new Set(decisions).size !== 3 || decisions.some(id => !['model', 'cooking', 'assistant'].includes(id))) throw new Error('Expected three distinct product decisions');
    }
  }
  if (!slugs.has(home.featuredCase)) throw new Error('Unknown featured case');
  if (!Array.isArray(home.caseStudies) || new Set(home.caseStudies).size !== home.caseStudies.length || home.caseStudies.some(slug => !cases.some(item => item.slug === slug && item.card))) throw new Error('Unknown or duplicate selected case');
  for (const area of home.background.currentWork.areas) {
    if (area.caseSlug && !slugs.has(area.caseSlug)) throw new Error('Unknown contribution case');
  }
  for (const item of cases) {
    if (!slugs.has(item.relatedCase) || item.relatedCase === item.slug) throw new Error('Unknown or self-referencing related case');
  }
  const visit = value => {
    if (!value || typeof value !== 'object') return;
    for (const [key, item] of Object.entries(value)) {
      if (key === 'url' || key === 'liveUrl') {
        if (!/^https:\/\//.test(item)) throw new Error('External links must use HTTPS');
      }
      if (key === 'image') {
        if (!/^\/assets\/images\/[a-z0-9/.-]+$/.test(item.src) || item.src.includes('..')) throw new Error('Invalid image path');
        requiredText(item.alt, 'image.alt');
        if (!(item.width > 0 && item.height > 0)) throw new Error('Images need dimensions');
      }
      visit(item);
    }
  };
  visit(content);
  return content;
}
export async function loadContent() {
  const read = async path => JSON.parse(await readFile(`${contentDirectory}/${path}`, 'utf8'));
  const filenames = (await readdir(`${contentDirectory}/cases`)).filter(name => name.endsWith('.json')).sort();
  const [site, home, cases] = await Promise.all([read('site.json'), read('home.json'), Promise.all(filenames.map(name => read(`cases/${name}`)))]);
  return validateContent({ site, home, cases });
}
