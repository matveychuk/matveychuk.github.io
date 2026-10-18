import { mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadContent } from '../src/lib/content.mjs';
import { escapeHtml as e, normalizeBasePath } from '../src/lib/html.mjs';
import { layout } from '../src/templates/layout.mjs';
import { homePage } from '../src/templates/home.mjs';
import { casePage } from '../src/templates/case.mjs';
import { incidentCasePage } from '../src/templates/incident-case.mjs';
import { productUseCasePage } from '../src/templates/product-use-case.mjs';
import { routeUrl } from '../src/lib/html.mjs';

export const projectDirectory = fileURLToPath(new URL('../', import.meta.url));
export const defaultOutput = resolve(projectDirectory, 'dist');

export async function buildSite({ basePath = '/', outputDirectory = defaultOutput } = {}) {
  normalizeBasePath(basePath);
  const content = await loadContent();
  const { site, home, cases } = content;
  const caseRenderers = { 'bake-again': casePage, 'incident-management': incidentCasePage, 'frustration-signals': productUseCasePage };
  const pages = [
    { route: '/', file: 'index.html', title: home.title, description: home.description, body: homePage(content, basePath) },
    ...cases.map(item => ({ route: `/work/${item.slug}/`, file: `work/${item.slug}/index.html`, title: `${item.title} · ${site.name}`, description: item.description, body: caseRenderers[item.slug](item, cases.find(candidate => candidate.slug === item.relatedCase), basePath) })),
    { route: '/404.html', file: '404.html', title: site.notFound.title, body: `<section class="not-found pad"><span class="eyebrow">404</span><h1>${e(site.notFound.title)}</h1><p class="intro">${e(site.notFound.text)}</p><a class="link" href="${e(routeUrl(basePath, '/'))}">${e(site.notFound.linkLabel)} ↗</a></section>` },
  ];
  const files = new Map(pages.map(page => [page.file, layout({ ...page, site, basePath })]));
  for (const name of ['fonts.css', 'theme.css', 'site.css', 'profile.css']) {
    files.set(`assets/${name}`, await readFile(resolve(projectDirectory, 'src/styles', name), 'utf8'));
  }
  async function collectAssets(directory, prefix = 'assets') {
    for (const entry of await readdir(directory, { withFileTypes: true })) {
      const path = resolve(directory, entry.name);
      if (entry.isDirectory()) await collectAssets(path, `${prefix}/${entry.name}`);
      else files.set(`${prefix}/${entry.name}`, await readFile(path));
    }
  }
  await collectAssets(resolve(projectDirectory, 'src/assets'));
  files.set('.nojekyll', '');
  files.set('robots.txt', `User-agent: *\nAllow: /\nSitemap: ${site.url}sitemap.xml\n`);
  files.set('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${pages.filter(page => page.route !== '/404.html').map(page => `<url><loc>${e(new URL(page.route.slice(1), site.url).href)}</loc></url>`).join('')}</urlset>\n`);
  // Read, validate and render before replacing output, so content errors preserve the previous preview.
  await rm(outputDirectory, { recursive: true, force: true });
  for (const [filename, source] of files) {
    const path = resolve(outputDirectory, filename);
    await mkdir(dirname(path), { recursive: true });
    await writeFile(path, source);
  }
  return { pages: pages.map(({ route, file }) => ({ route, file })), outputDirectory, basePath };
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const result = await buildSite({ basePath: process.env.BASE_PATH || '/' });
  console.log(`Built ${result.pages.length} HTML pages in ${result.outputDirectory} (base ${result.basePath})`);
}
