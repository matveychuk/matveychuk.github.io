import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import { resolve } from 'node:path';
import { tmpdir } from 'node:os';
import { once } from 'node:events';
import { buildSite } from './build.mjs';
import { createPreviewServer } from './preview.mjs';
import { loadContent, validateContent } from '../src/lib/content.mjs';
import { escapeHtml, normalizeBasePath } from '../src/lib/html.mjs';

for (const basePath of ['/', '/about/']) {
  test(`static pages, assets, navigation and HTTP preview under ${basePath}`, async () => {
    const outputDirectory = await mkdtemp(resolve(tmpdir(), 'profile-check-'));
    let server;
    try {
      const build = await buildSite({ basePath, outputDirectory });
      assert.equal(await readFile(resolve(outputDirectory, '.nojekyll'), 'utf8'), '');
      const documents = new Map();
      for (const page of build.pages) {
        const html = await readFile(resolve(outputDirectory, page.file), 'utf8');
        const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
        assert.equal(ids.length, new Set(ids).size, `duplicate IDs in ${page.file}`);
        assert.equal((html.match(/<h1[ >]/g) || []).length, 1, `one h1 in ${page.file}`);
        assert.match(html, /<html lang="en">/);
        assert.match(html, /<main id="main"[^>]*tabindex="-1">/);
        assert.match(html, /<a class="skip-link" href="#main">/);
        assert.match(html, /<meta name="viewport"/);
        assert.match(html, page.route === '/404.html' ? /<meta name="robots" content="noindex, follow">/ : /<meta name="robots" content="index, follow">/);
        assert.doesNotMatch(html, /evidenceRefs|content\/drafts|docs\/research/);
        assert.doesNotMatch(html, /<(form|iframe)\b|window\.openai|widgetState/i);
        assert.match(html, /<meta name="color-scheme" content="dark">/);

        documents.set(page.file, { html, ids });
      }
      for (const [filename, document] of documents) {
        const currentUrl = new URL(`${basePath}${filename}`, 'http://local.test');
        for (const [, attribute] of document.html.matchAll(/(?:href|src)="([^"]+)"/g)) {
          const target = new URL(attribute.replaceAll('&amp;', '&'), currentUrl);
          if (target.origin !== currentUrl.origin) { assert.equal(target.protocol, 'https:'); continue; }
          assert.ok(target.pathname.startsWith(basePath), `${attribute} must retain ${basePath}`);
          const relative = target.pathname.slice(basePath.length);
          const targetFile = relative.endsWith('/') || relative === '' ? `${relative}index.html` : relative;
          const body = await readFile(resolve(outputDirectory, targetFile), 'utf8');
          assert.ok(body.length, `${targetFile} must exist and contain content`);
          if (target.hash) assert.ok(documents.get(targetFile)?.ids.includes(target.hash.slice(1)), `missing anchor ${attribute} in ${filename}`);
        }
      }
      const fontCss = await readFile(resolve(outputDirectory, 'assets/fonts.css'), 'utf8');
      for (const [, fontPath] of fontCss.matchAll(/url\(([^)]+)\)/g)) {
        assert.ok(fontPath.startsWith('./fonts/'), 'fonts must be self-hosted');
        assert.ok((await readFile(resolve(outputDirectory, 'assets', fontPath))).byteLength > 0);
      }

      server = createPreviewServer({ basePath, outputDirectory });
      server.listen(0, '127.0.0.1');
      await once(server, 'listening');
      const origin = `http://127.0.0.1:${server.address().port}`;
      for (const page of build.pages) {
        const response = await fetch(`${origin}${basePath}${page.route.slice(1)}`);
        assert.equal(response.status, 200);
        assert.match(response.headers.get('content-type'), /^text\/html/);
        assert.match(await response.text(), /Sasha Matveychuk/);
      }
      const css = await fetch(`${origin}${basePath}assets/theme.css`);
      assert.equal(css.status, 200);
      assert.match(css.headers.get('content-type'), /^text\/css/);
      await css.text();
      for (const [asset, mime] of [['assets/images/profile/portrait.jpg', 'image/jpeg'], ['assets/images/bake-again/step-questions-en.png', 'image/png'], ['assets/fonts/editorial-1.woff2', 'font/woff2'], ['assets/favicon.svg', 'image/svg+xml']]) {
        const response = await fetch(`${origin}${basePath}${asset}`);
        assert.equal(response.status, 200, asset);
        assert.ok(response.headers.get('content-type').startsWith(mime), asset);
        assert.ok((await response.arrayBuffer()).byteLength > 0, asset);
      }
      assert.match(await readFile(resolve(outputDirectory, 'robots.txt'), 'utf8'), /Sitemap: https:\/\/matveychuk.github.io\/sitemap.xml/);
      const sitemap = await readFile(resolve(outputDirectory, 'sitemap.xml'), 'utf8');
      for (const route of ['work/bake-again/', 'work/incident-management/', 'work/frustration-signals/']) assert.ok(sitemap.includes(`https://matveychuk.github.io/${route}`));
      for (const path of ['docs/project-brief.uk.md', 'content/drafts/experience.en.md', 'src/content/home.json', 'assets/decisions.js']) {
        const response = await fetch(`${origin}${basePath}${path}`);
        assert.equal(response.status, 404, `${path} must not be published`);
        await response.text();
      }
      const theme = await readFile(resolve(outputDirectory, 'assets/theme.css'), 'utf8');
      assert.match(theme, /color-scheme:dark/);
      assert.doesNotMatch(theme, /prefers-color-scheme|light-dark/);
      const caseHtml = documents.get('work/bake-again/index.html').html;
      for (const id of ['model', 'cooking', 'assistant']) assert.match(caseHtml, new RegExp(`id="decision-${id}"`));
      assert.doesNotMatch(caseHtml, /assets\/decisions\.js/);
      assert.match(caseHtml, /assets\/profile\.css/);
      assert.doesNotMatch(caseHtml, / hidden(?:[ >])/);
      for (const slug of ['incident-management', 'frustration-signals']) {
        assert.match(documents.get('index.html').html, new RegExp(`href="${basePath}work/${slug}/"`));
        const workflowHtml = documents.get(`work/${slug}/index.html`).html;
        assert.doesNotMatch(workflowHtml, /assets\/profile\.css/);
        assert.match(workflowHtml, /class="workflow-steps"/);
        assert.doesNotMatch(workflowHtml, /EDITOR|evidenceRefs|docs\/research|trustpoint\.atlassian|content\/drafts/);
        assert.doesNotMatch(workflowHtml, / hidden(?:[ >])/);
      }
      const signalsHtml = documents.get('work/frustration-signals/index.html').html;
      const homeHtml = documents.get('index.html').html;
      const incidentCard = homeHtml.indexOf(`href="${basePath}work/incident-management/"`);
      const signalsCard = homeHtml.indexOf(`href="${basePath}work/frustration-signals/"`);
      const bakeCard = homeHtml.indexOf(`href="${basePath}work/bake-again/"`);
      assert.ok(incidentCard >= 0 && incidentCard < signalsCard && signalsCard < bakeCard, 'selected cases retain the approved order');
      assert.match(homeHtml, /id="trustpoint"/);
      assert.match(homeHtml, /id="experience"/);
      assert.doesNotMatch(homeHtml, /\/work\/engineering-automation\//);
      for (const phrase of ['Automatic ticket + owner', 'Human assessment first', 'Recorded for trends', 'before sending them to an AI agent', 'checks them every day']) assert.ok(signalsHtml.includes(phrase), `missing workflow boundary: ${phrase}`);
      const missing = await fetch(`${origin}${basePath}missing/`);
      assert.equal(missing.status, 404);
      assert.match(await missing.text(), /Page not found/);
      const redirect = await fetch(`${origin}${basePath}work/bake-again`, { redirect: 'manual' });
      assert.equal(redirect.status, 308);
      assert.equal(redirect.headers.get('location'), `${basePath}work/bake-again/`);
      await redirect.text();
      const head = await fetch(`${origin}${basePath}`, { method: 'HEAD' });
      assert.equal(head.status, 200);
      assert.equal(await head.text(), '');
      const forbidden = await fetch(`${origin}${basePath}assets/%2e%2e%2f%2e%2e%2fpackage.json`);
      assert.equal(forbidden.status, 400);
      await forbidden.text();
      const method = await fetch(`${origin}${basePath}`, { method: 'POST' });
      assert.equal(method.status, 405);
      await method.text();
      if (basePath !== '/') {
        const outside = await fetch(`${origin}/work/bake-again/`);
        assert.equal(outside.status, 404);
        await outside.text();
        const baseRedirect = await fetch(`${origin}${basePath.slice(0, -1)}`, { redirect: 'manual' });
        assert.equal(baseRedirect.headers.get('location'), basePath);
        await baseRedirect.text();
      }
    } finally {
      if (server?.listening) await new Promise((done, reject) => server.close(error => error ? reject(error) : done()));
      await rm(outputDirectory, { recursive: true, force: true });
    }
  });
}

test('content retains valid case references and safe links', async () => {
  const content = await loadContent();
  content.home.featuredCase = 'unknown-case';
  assert.throws(() => validateContent(content), /Unknown featured case/);
  content.home.featuredCase = 'bake-again';
  content.cases[0].liveUrl = 'javascript:alert(1)';
  assert.throws(() => validateContent(content), /HTTPS/);
});

test('content stays plain text and the base path cannot create external URLs', () => {
  assert.equal(escapeHtml('<script>"hello" & \'test\'</script>'), '&lt;script&gt;&quot;hello&quot; &amp; &#39;test&#39;&lt;/script&gt;');
  for (const value of ['//example.com/', 'https://example.com/', '/about', '/../', '/about/?q=1']) {
    assert.throws(() => normalizeBasePath(value), /BASE_PATH/);
  }
});

test('workflow navigation and triage structure remain complete', async () => {
  const original = await loadContent();
  const mutate = callback => {
    const content = structuredClone(original);
    callback(content);
    return () => validateContent(content);
  };
  assert.throws(mutate(content => { content.home.caseStudies.push('missing'); }), /selected case/);
  assert.throws(mutate(content => { content.cases.find(item => item.kind === 'workflow').relatedCase = 'missing'; }), /related case/);
  assert.throws(mutate(content => { content.cases.find(item => item.routing).routing.branches.pop(); }), /three triage branches/);
});
