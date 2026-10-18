import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { watch } from 'node:fs';
import { extname, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { buildSite, defaultOutput, projectDirectory } from './build.mjs';
import { normalizeBasePath } from '../src/lib/html.mjs';

const contentTypes = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.jpg': 'image/jpeg', '.png': 'image/png', '.svg': 'image/svg+xml', '.ttf': 'font/ttf', '.woff2': 'font/woff2', '.txt': 'text/plain; charset=utf-8', '.xml': 'application/xml; charset=utf-8' };
const runFile = promisify(execFile);

export function createPreviewServer({ outputDirectory = defaultOutput, basePath = '/' } = {}) {
  normalizeBasePath(basePath);
  const root = resolve(outputDirectory);
  return createServer(async (request, response) => {
    const send = (status, text, type = 'text/plain; charset=utf-8') => {
      response.writeHead(status, { 'Content-Type': type, 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' });
      response.end(request.method === 'HEAD' ? undefined : text);
    };
    const notFound = async () => send(404, await readFile(resolve(root, '404.html')), contentTypes['.html']);
    try {
      if (!['GET', 'HEAD'].includes(request.method)) {
        response.setHeader('Allow', 'GET, HEAD');
        send(405, 'Method not allowed');
        return;
      }
      const url = new URL(request.url, 'http://localhost');
      let pathname;
      try { pathname = decodeURIComponent(url.pathname); } catch { send(400, 'Malformed path'); return; }
      if (pathname.includes('\0') || pathname.includes('\\') || pathname.split('/').includes('..')) {
        send(400, 'Invalid path');
        return;
      }
      if (basePath !== '/' && pathname === basePath.slice(0, -1)) {
        response.writeHead(308, { Location: `${basePath}${url.search}` });
        response.end();
        return;
      }
      if (!pathname.startsWith(basePath)) { await notFound(); return; }
      let filename = resolve(root, pathname.slice(basePath.length));
      if (filename !== root && !filename.startsWith(`${root}${sep}`)) { send(400, 'Invalid path'); return; }
      const info = await stat(filename).catch(() => null);
      if (info?.isDirectory()) {
        if (!pathname.endsWith('/')) {
          response.writeHead(308, { Location: `${url.pathname}/${url.search}` });
          response.end();
          return;
        }
        filename = resolve(filename, 'index.html');
      }
      const extension = extname(filename);
      if (!contentTypes[extension]) { await notFound(); return; }
      let body;
      try { body = await readFile(filename); } catch { await notFound(); return; }
      send(200, body, contentTypes[extension]);
    } catch {
      send(500, 'Preview is unavailable. Check the local build output.');
    }
  });
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const basePath = normalizeBasePath(process.env.BASE_PATH || '/');
  const port = Number(process.env.PORT || 4321);
  if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error('PORT must be an integer between 1 and 65535');
  await buildSite({ basePath });
  const server = createPreviewServer({ basePath });
  server.on('error', error => { console.error(error.message); process.exitCode = 1; watcher?.close(); });
  let watcher;
  let timer;
  let rebuilding = Promise.resolve();
  server.listen(port, '127.0.0.1', () => {
    console.log(`Local: http://127.0.0.1:${port}${basePath}`);
    if (!process.argv.includes('--watch')) return;
    console.log('Watching src/. Refresh the browser after a change.');
    watcher = watch(resolve(projectDirectory, 'src'), { recursive: true }, () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        rebuilding = rebuilding.then(async () => {
          try {
            await runFile(process.execPath, [resolve(projectDirectory, 'scripts/build.mjs')], { env: { ...process.env, BASE_PATH: basePath } });
            console.log('Rebuilt. Refresh the browser.');
          }
          catch (error) { console.error(`Build failed: ${error.message}`); }
        });
      }, 150);
    });
  });
  const stop = () => {
    clearTimeout(timer);
    watcher?.close();
    server.close();
  };
  process.once('SIGINT', stop);
  process.once('SIGTERM', stop);
}
