# Hugo build repair verification — 20 September 2026

The original checkout failed on Hugo Extended 0.165.0 with removed `_build`
front matter, language/data deprecations and Browserslist reading a parent
`package.json` outside Hugo's Node read permissions. No inherited `NODE_OPTIONS`,
`HUGO_SECURITY_*` or `BROWSERSLIST*` settings were present.

## Changes

- Migrated language configuration and template APIs in site overrides and the
  checked-in theme; migrated only the build key in the two reusable sections.
- Added a local copy of the pinned PWA manifest template with its language API
  migrated. Active imported modules need no other overrides or upgrades.
- Set Autoprefixer targets to `defaults` and custom statistics to `{}`. Testing
  confirmed targets alone still triggered an ancestor `browserslist-stats.json`
  search. Both options are necessary with the locked Browserslist version.
  Hugo's Node permissions remain unchanged.
- Selected npm, retained all 175 existing dependency versions, refreshed lockfile
  metadata with npm, and removed ignore rules for `package-lock.json` and `go.sum`.
  The Go module versions and existing checksum file are unchanged.
- Removed Netlify's redundant bootstrap command; pinned the tested tools and
  documented normal development commands in `readme.md`.

## Tested tools and commands

| Tool | Selected local/Netlify version | Originally installed |
| --- | --- | --- |
| Hugo Extended | 0.165.0 | 0.165.0 |
| Node | 24.21.0 | 26.8.1 |
| npm | 11.19.0 | 11.19.0 |
| Go | 1.24.1 (existing Netlify pin retained) | 1.27.1 |

Node 24 and Go 1.24.1 were run from official downloads in `/tmp`; no global tools
were replaced. Yarn was not installed.

Passed:

```sh
hugo
npm run build
npm run check:postcss
npm ci --include=dev && npm run build
npm run dev -- --bind 127.0.0.1 --port 1317 --disableFastRender
npm run preview -- --bind 127.0.0.1 --port 1318 --buildDrafts --destination /tmp/blog-build-tools/preview-public
git diff --check
```

The exact Netlify command also passed in a disposable source copy starting with
no `node_modules`, `hugo_stats.json`, output or resource directories and an empty
`HUGO_CACHEDIR`. Pinned modules were downloaded afresh. Its production result was
107 pages and two paginator pages, with no reported Hugo deprecations or errors.
Plain `hugo` also passed with the originally installed Node 26.8.1 / Go 1.27.1.

The PostCSS check covers main and lazy filenames with Node's project-only read
permission. Negative controls confirmed that the original options and
targets-only options each fail with `ERR_ACCESS_DENIED`.

## Output and browser checks

- Checked homepage, blog listing, `/blog/page/2/`, the Winning Whole post and
  `/elements/`. Both CSS assets resolve, contain expected responsive/dark/plugin
  styles, and have correct SHA-256 filename fingerprints and integrity values.
  Clean production CSS sizes: main 64,423 bytes; lazy 130,401 bytes.
- Verified `en-us` HTML/RSS/manifest language, `www` SEO/feed/manifest URLs,
  19 search entries, RSS output, and exclusion of both reusable sections and
  the draft `/rd/` album page from normal production output.
- Compared against the original source built with its previous Hugo 0.145.0
  pin: HTML paths, all 63 sitemap URLs and search JSON are unchanged. Main CSS
  differs only in whitespace; lazy CSS also omits two empty `:root` rules.
  Processed favicon hashes change with Hugo; manifest icon properties remain
  the same. The existing SEO template emits canonical link elements only when
  front matter supplies them; its behavior and Open Graph URLs are preserved.
- Used installed Brave via temporary Playwright tooling at 1440px and 390px.
  Inspected screenshots and checked loaded main/lazy CSS, mobile menu, theme
  switching, actual search result links and gallery opening. Production preview
  with drafts verified album data/link, one mobile column and three desktop
  columns. Draft status was not changed. Test servers were stopped afterward.

## Remaining observations

- The retained dependency graph reports 11 npm audit findings (1 low, 2 moderate,
  8 high). npm also reports unapproved install-script metadata for optional
  macOS `fsevents`; installation and server checks still pass.
- The direct PostCSS check reports the existing outdated `caniuse-lite` dataset.
  No warnings were suppressed and no broad dependency updates were made.
- The original development site also has six pixels of horizontal overflow on
  the homepage at 390px. An intermittent `GLightbox is not defined` error was
  reproduced on the original gallery; the repaired gallery opened successfully
  in subsequent checks. These existing presentation/script issues are unchanged.
- Netlify's dashboard, Linux build environment and deployed site were not
  verified. Check dashboard overrides as described in `readme.md` before a
  future deployment. Nothing was committed, pushed or deployed.

The pre-existing untracked `AGENTS.md` and `docs/hugo-build-fix.md` were preserved.
