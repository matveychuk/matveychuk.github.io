# Sasha Matveychuk

Source for [matveychuk.github.io](https://matveychuk.github.io/).
A static professional profile with selected work, experience and approach.

## Local development

Requires Node.js 22 or later. There are no external npm dependencies.

```sh
npm run dev
```

Open http://127.0.0.1:4321/. The server rebuilds after source changes;
refresh the browser to view them.

```sh
npm run check
npm run build
npm run preview
```

The build creates `dist/`. Use `PORT=4327 npm run dev` for another local port.

## Source

- `src/content/`: page copy and site links.
- `src/templates/`: HTML page templates and shared components.
- `src/styles/`: typography, palette and responsive layouts.
- `src/assets/`: photographs, product screenshots, fonts and their licenses.
- `scripts/`: static build, local preview and checks.

## Publication

GitHub Pages uses `.github/workflows/pages.yml`. Pushes to `main` run the
checks, build the site and deploy only `dist/`. The workflow can also run
manually from Actions. In repository Settings → Pages, the source is
GitHub Actions. The site is served from `/`, without an `/about/` prefix.

Research notes and intermediate versions are excluded from this repository.
Local working material belongs in ignored `.local/` and is never deployed.
