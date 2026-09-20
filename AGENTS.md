# Project instructions

## Project

Nikolai's cycling blog: https://nikolai.com.au/.
GitHub stores the source at https://github.com/nikrazz/blog; Netlify builds and hosts the site.
This is an existing Hugo site using a locally checked-in Hugoplate theme, Go-based Hugo modules, SCSS, Tailwind CSS 3 and PostCSS/Autoprefixer. Keep this architecture.
The owner develops on macOS. Give concise explanations and exact commands when manual steps are necessary.

## Start here

- Read `git status --short` and preserve existing changes.
- Read `readme.md`, `hugo.toml`, `config/_default/`, `package.json`, `netlify.toml`, `go.mod`, `postcss.config.js` and `tailwind.config.js` before changing build behavior.
- Check actual Hugo, Node, package manager and Go versions. Repository declarations and installed versions may differ.
- Use `rg` to locate references, including local theme files and imported modules when relevant.
- For build migrations, see `docs/hugo-build-fix.md`. Recheck its dated observations against the current checkout.

## Source map

- `content/english/`: posts, pages and reusable sections; preserve editorial text and front matter meaning.
- `layouts/`: site-specific templates and overrides, including the albums shortcode.
- `themes/hugoplate/`: checked-in theme assets and fallback templates.
- `assets/`: site asset overrides; `static/`: files copied to output.
- `data/theme.json`: visual tokens consumed by Tailwind and templates; other data includes albums.
- `config/_default/`: languages, menus, parameters and module imports.
- `hugo.toml`: canonical URL, output formats, pagination and resource pipeline.
- `scripts/`: boilerplate maintenance scripts; inspect before executing.

## Change rules

- Make the smallest complete fix. Preserve design, article text, images, URLs, slugs, taxonomy, pagination, feeds, search, analytics, forms and metadata unless the task requires changing them.
- Preserve the configured `www` canonical base URL and current timezone; do not infer changes from the owner's location.
- Prefer site overrides for theme customization. A mechanical API migration may update checked-in theme fallbacks too. Never edit `node_modules` or the Go module cache as a permanent fix.
- Preserve SCSS, Tailwind's `hugo_stats.json` scanning, lazy CSS, production post-processing, minification and fingerprints.
- Do not run theme setup, project setup, theme updates, module-wide upgrades or whole-project formatting as routine repair steps. These scripts may move, delete or rewrite files. Inspect any script required by the build first.
- Keep dependency updates targeted. Retain one deliberate package-manager/lockfile strategy; do not mix npm and Yarn lockfiles. Generate lockfiles using the selected tool, never by hand.
- Do not hide warnings or downgrade solely to conceal deprecated APIs. Confirm replacements against documentation for the selected Hugo version.
- Diagnose permission failures before changing permissions. Prefer project-contained configuration; do not disable Node permissions, allow all filesystem reads or add machine-specific parent paths as a blanket fix.
- Keep generated output, caches, dependencies and secrets out of commits. Existing ignore rules for lockfiles and `go.sum` may need deliberate adjustment when making builds reproducible.
- Do not commit, push, merge or deploy unless requested. Local edits and verification can proceed without another confirmation.

## Build and verification

The current scripts are `yarn dev` (Hugo server), `yarn build` (production build) and `yarn preview` (production server). Verify `package.json` before use. Plain `hugo` must also work after build fixes.

Use Hugo Extended for this site's SCSS pipeline and compatible Go/Node versions. Install dependencies using the existing lockfile when present. Do not use `npm ci` without a valid npm lockfile.

For build changes:

1. Reproduce the failure and capture tool versions and meaningful diagnostics.
2. Validate a production build and a development server request; cover the main and lazy CSS outputs.
3. Verify from an empty resource/output cache using temporary directories or a disposable checkout. Do not delete user files or shared caches.
4. Check the homepage, a post, pagination and an albums/gallery page if present. Check generated CSS is nonempty, linked correctly and contains the expected utility styles. Inspect desktop/mobile appearance when a browser is available.
5. Check language markup, canonical URLs, RSS and search output after related template/config changes.
6. Inspect `git diff --check` and the final diff. Report exact tests, versions, remaining warnings and anything blocked. Do not claim remote Netlify deployment was verified by a local build.

Do not add a test framework for a mechanical migration. Add focused automation only when it covers a concrete regression risk. Update development documentation when commands or tool requirements change.
