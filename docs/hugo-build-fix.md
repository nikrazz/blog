# Codex task: repair Hugo build

Implement this task in the current repository. Read `AGENTS.md` first, inspect the current checkout, then make and verify the changes. Do not stop at a plan. Leave changes ready for review without committing, pushing or deploying.

## Goal

Make plain `hugo`, the development server and the production build work with an explicitly selected modern Hugo Extended version. Remove the reported deprecations, resolve the PostCSS permission failure, and align the repository's Netlify configuration with the tested toolchain. Preserve the site's content, appearance and behavior.

## Reported failure

The owner's macOS checkout is `/Users/nikolai/sites/blog`. This is diagnostic context, not a path to hard-code.

Hugo reports:

```text
languages.en.languageCode deprecated: use languages.en.locale
languages.en.languageName deprecated: use languages.en.label
_build front matter removed: use build
.Site.LanguageCode deprecated: use .Site.Language.Locale
.Site.Data deprecated: use hugo.Data
```

Rendering `content/english/_index.md` fails through `layouts/_default/baseof.html`, `partialCached "essentials/style.html"`, then `$styles.RelPermalink` in `layouts/partials/essentials/style.html`.

```text
POSTCSS: failed to transform /css/style.css
Error: Access to this API has been restricted. Use --allow-fs-read to manage permissions.
at Object.existsSync (node:fs)
at isFile (node_modules/browserslist/node.js)
at eachParent (node_modules/browserslist/node.js)
at Object.findConfigFile (node_modules/browserslist/node.js)
at browserslist.loadConfig
at Browsers.parse (node_modules/autoprefixer/lib/browsers.js)
code: ERR_ACCESS_DENIED
permission: FileSystemRead
resource: /Users/nikolai/sites/package.json
```

## Repository observations

Inspected GitHub HEAD `e0c5ce4` on 20 September 2026. These are starting points, not a substitute for inspecting local changes.

- `netlify.toml` pins Hugo `0.145.0` and Go `1.24.1`; build command is `yarn project-setup; yarn build`, output `public`.
- `config/_default/module.toml` declares Hugo Extended and minimum `0.134.3`.
- `package.json` uses Tailwind `^3.4.13`, PostCSS `^8.4.47`, postcss-cli `^11.0.0` and Autoprefixer `^10.4.20`. No exact Node/package-manager version is declared there.
- `.gitignore` excludes `package-lock.json`, `yarn.lock` and `go.sum`; no lockfile is tracked in this snapshot. Check the owner's existing local lockfiles before choosing a strategy.
- `postcss.config.js` enables Tailwind and Autoprefixer without explicit options. `tailwind.config.js` reads `data/theme.json` and scans `./hugo_stats.json`.
- The site has both root overrides and a tracked `themes/hugoplate/` tree. Go modules supply additional templates/assets.
- `scripts/projectSetup.js` is a bootstrap transformation that moves files when `themes/` is absent. The tracked theme already exists, so it currently skips its transformation. Do not rerun bootstrap work unnecessarily.

## Work required

### 1. Reproduce and choose a supported toolchain

Record `hugo version`, `node --version`, the package-manager version and `go version`. Compare local versions with Netlify pins. Use the installed modern Hugo if suitable, or a verified stable modern version. Do not infer the exact installed version from deprecation messages. Inspect inherited permission-related environment settings without printing secrets.

Inspect scripts before running them. Install project dependencies with the chosen package manager, preserving a useful existing local lockfile. Run the baseline build and record failures. If tooling/network prevents reproduction, make the grounded source fixes and explicitly report the validation blocker.

### 2. Migrate deprecated APIs completely

Known locations:

| File | Migration |
| --- | --- |
| `config/_default/languages.toml` | `languageCode` to `locale`; `languageName` to `label` |
| `content/english/sections/testimonial.md` | `_build` to `build`, preserving nested values |
| `content/english/sections/call-to-action.md` | `_build` to `build`, preserving nested values |
| `layouts/_default/baseof.html` | `site.LanguageCode` to `site.Language.Locale` |
| `layouts/partials/essentials/style.html` | `site.Data.theme...` to `hugo.Data.theme...` |
| `layouts/shortcodes/albums.html` | `.Site.Data.albums` to `hugo.Data.albums` |
| `layouts/partials/components/language-switcher.html` | Check `.Language.LanguageName` replacement against the selected version, expected `.Language.Label` |

Also search the tracked theme: its base template, style partial, footer and language switcher have related references. Inspect imported modules for remaining warnings and prefer a targeted module update or minimal documented local override when needed. Preserve template context and fallback behavior. Do not mechanically replace every `.Data`: resource data such as `$styles.Data.Integrity` is unrelated and must stay.

Keep the existing language key `en`, locale meaning, label text, content directory and URL structure. Keep reusable sections excluded from public page listings/rendering according to their current build settings.

### 3. Fix the PostCSS/Browserslist lookup

The trace shows Browserslist walking to a parent `package.json` outside the repository. Hugo's Node permission model is a likely cause; verify it with the actual Hugo version and effective settings. Current Hugo documents `security.node.permissions` as introduced in 0.161.0. This is separate from merely permitting execution of PostCSS.

Inspect the installed Browserslist implementation and its documented lookup behavior. Prefer a project-local Browserslist configuration or explicit Autoprefixer targets that stop ancestor lookup while retaining the existing intended browser support. Verify that the chosen mechanism actually stops the failing lookup; do not assume adding a file is enough. If there was no explicit target policy, document the equivalent default policy used.

Keep PostCSS and Tailwind 3. Do not remove Autoprefixer, bypass CSS processing, migrate to Tailwind 4 or replace the asset pipeline for this repair. Do not disable Node permissions, use wildcard reads, or allow the owner's whole home/parent directories. If a further legitimate path is required, establish why and use a narrow portable setting supported by the selected Hugo version.

### 4. Align development and Netlify

Update the Hugo pin and declared minimum where needed for the new APIs. Select and document a compatible supported Node version and package-manager version based on actual testing. Change Go only if necessary. Make dependency installation reproducible using one generated lockfile and appropriate ignore rules; assess tracking `go.sum` for this application.

Inspect whether the Netlify bootstrap command is redundant for this already-initialized site. If retained, ensure command failure stops the build instead of being hidden by a semicolon. Preserve publish directory and production behavior. Verify the exact resulting build command locally; list any Netlify dashboard overrides the owner must check, without claiming to have inspected that dashboard.

Update concise development instructions with tested versions, installation, plain Hugo build, production build and local preview commands. Do not add model credentials, global Codex settings or unrelated CI workflows.

### 5. Acceptance checks

- Plain `hugo` succeeds on the selected modern Hugo Extended version, with none of the reported warnings/errors.
- Production build and development server both work; request pages to trigger deferred asset processing.
- A build using empty temporary output/resource caches succeeds, so cached CSS does not hide the error. Preserve the build-statistics lifecycle required by Tailwind.
- Main and lazy CSS files are nonempty and resolve from generated HTML; production fingerprints and integrity values remain correct.
- Homepage, a representative post, paginated listing and albums/gallery page retain expected layout and functionality. Use a browser for desktop/mobile checks if available; clearly distinguish visual verification from HTML inspection.
- Language markup, canonical URLs, feeds, search output and section visibility remain correct.
- The configured Netlify build command succeeds locally with matching tool versions. A local result is not a deployed Netlify verification.
- Final diff contains only relevant source/config/docs and deliberate dependency metadata, with no output/cache files or accidental editorial edits.

Finish with a concise account of causes, files changed, exact tested versions/commands, results and any necessary Mac or Netlify dashboard steps. Clearly identify any checks that could not run.

## References

- [Hugo build options](https://gohugo.io/content-management/build-options/)
- [Hugo languages](https://gohugo.io/configuration/languages/)
- [Hugo security and Node permissions](https://gohugo.io/configuration/security/)
- [Hugo PostCSS](https://gohugo.io/functions/css/postcss/)
- [Browserslist documentation](https://github.com/browserslist/browserslist#readme)
