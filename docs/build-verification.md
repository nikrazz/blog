# Hugo repair and follow-up verification — 20 September 2026

The completed Hugo repair is preserved. This follow-up clears the npm audit,
refreshes browser data, fixes gallery initialization and homepage overflow, and
checks local/Netlify readiness. No commit, push, dashboard change or deployment
was performed.

## Toolchain and configuration

| Tool | Tested and configured for Netlify | System installation |
| --- | --- | --- |
| Hugo Extended | 0.165.0 | 0.165.0 |
| Node | 24.21.0 | 26.8.1 |
| npm | 11.19.0 | 11.19.0 |
| Go | 1.24.1 | 1.27.1 |

The selected Node and Go binaries are temporary official downloads; global tools
were not replaced. `netlify.toml`, `.nvmrc`, package engines and the README agree.
Netlify's publish directory is `public`, its command is
`npm ci --include=dev && npm run build`, and there are no context-specific settings
in the checked-in Netlify file. The existing Go pin and module versions remain
unchanged.

## Dependency review

A fresh audit reproduced 11 affected packages: 1 low, 2 moderate and 8 high.
Targeted updates within existing ranges reduce **all severities to zero**.
[Dependency audit review](dependency-audit.md) records every advisory, affected
chain, old/new version and project-specific exposure. No forced audit fix,
Tailwind major migration or blanket dependency update was used.

Commands run with Node 24.21.0 / npm 11.19.0:

```sh
npm audit --json
npm explain brace-expansion browserslist cross-spawn glob joi minimatch nanoid picomatch postcss postcss-selector-parser yaml fsevents
npm update brace-expansion browserslist cross-spawn glob joi minimatch nanoid picomatch postcss postcss-selector-parser yaml
npx --yes update-browserslist-db@latest
npm audit --json
npm run check:postcss
```

The official updater (1.3.3) confirmed caniuse-lite 1.0.30001810, refreshed from
1.0.30001664 by the targeted Browserslist update. Autoprefixer's `defaults` policy
and explicit empty custom statistics remain unchanged. The direct restricted
PostCSS check passes for main/lazy filenames with no outdated-data warning.
Hugo's filesystem permissions were not widened or disabled.

These audited packages run during builds/development, not in browser JavaScript.
Malicious repository CSS, configuration or glob patterns can still affect build
machines, so compatible fixes were applied even where current inputs do not
reach an advisory's vulnerable path. npm audit does not cover independently
bundled Hugo module/theme libraries.

## Optional macOS fsevents warning

`npm install-scripts ls` and clean installation still report:

```text
fsevents@2.3.3 (install: (install scripts present))
```

The chain is Tailwind 3.4.13 / postcss-cli 11.0.0 → chokidar 3.6.0 → optional
fsevents 2.3.3. Its lockfile carries `hasInstallScript: true`, while the installed
package has no preinstall/install/postinstall script or binding.gyp and includes
its native binary. npm 11.19.0's Arborist script inspection falls back to this
sentinel when it sees that metadata without a script body. Requiring `fsevents`
successfully loads the native module and exposes `watch`.

No approval or policy change is needed for this workflow. Hugo owns the development
server watcher; PostCSS is invoked for transformations rather than as a Node
watch server. On this Mac, a temporary content page was created and edited;
both versions appeared automatically through HTTP. A temporary SCSS rule also
appeared in served CSS after rebuilding. The page was removed and the stylesheet
restored byte-for-byte. No script was globally or locally approved to hide this
warning.

## Gallery fix and browser verification

The pinned images module emitted a separate `window.load` callback calling the
GLightbox global. The gallery-slider module also initializes GLightbox in the
plugin bundle, immediately after the library. The bundle previously had both
`async` and `defer`; `async` permits execution independently of DOM parsing.

`layouts/shortcodes/image.html` is a local copy of the pinned image shortcode
with only its redundant initializer removed. All markup/processing behavior is
retained. The site's script partial now uses `defer` alone for the lazy bundle.
There is one library load and one initializer, in the same bundle, after DOM
parsing. No missing-global guard, arbitrary initialization delay or duplicate
handler was added. Navigation is ordinary document navigation; no SPA lifecycle
or additional navigation hooks are required.

Temporary Playwright tooling drove the installed Brave browser; no test framework
was added to the project. Browser instrumentation counted initialization calls.
Cold contexts, reloads and navigation through the homepage were exercised with
cache disabled and network emulation (100ms latency, 5,000,000 bytes/sec download,
1,000,000 bytes/sec upload). Tests wait for `slide_changed`, so later clicks do
not race ongoing transitions. Mobile tests use actual emulated touch swipes;
GLightbox intentionally places its next/previous buttons offscreen on narrow
screens, using swipes instead.

Passed 18 throttled gallery cases: three fresh contexts × cold load/reload/
navigation × development/production preview. Each had exactly one initializer,
one library bundle and one overlay; next/previous/close worked with no JavaScript
errors. On 390px emulated phones, images loaded, touch swipes advanced slides and
the close button worked in both environments. Search and console-error checks
also passed in both environments.

## Homepage overflow fix

At 390px the homepage's `.row.gx-5` extended from -6.390625px to 396.390625px.
Its 3rem gutter creates 1.5rem negative side margins, exceeding the container's
1rem mobile padding. Changing it to `.row.lg:gx-5` uses the default 2rem gutter
below the desktop breakpoint and preserves the existing 3rem desktop gutter.
No document-level overflow masking was added.

Browser checks cover 320, 375, 390, 430 and 1440px. The document scroll width
matches the viewport, main/lazy CSS load, mobile navigation works, and screenshots
show unclipped content with the original desktop arrangement.

## Build and output verification

Passed with the selected versions:

```sh
hugo
npm run build
npm run check:postcss
npm ci --include=dev && npm run build
npm run dev -- --bind 127.0.0.1 --port 1317 --disableFastRender
npm run preview -- --bind 127.0.0.1 --port 1318 --destination /tmp/blog-followup/preview-public
git diff --check
```

The exact Netlify command passed in `/tmp/blog-followup-clean-nmor0gf_`, copied
from current source without dependencies, output, resources or hugo_stats.json,
using an initially empty `HUGO_CACHEDIR`. The build downloaded pinned modules,
installed 176 packages and produced 102 pages plus two paginator pages. The
Tailwind statistics/post-processing lifecycle remained enabled throughout.

Checked home, `/blog/lets-talk-doping/`, `/blog/page/2/` and `/elements/` via HTML
inspection and browser requests. The current Winning Whole post is a draft;
that user setting is preserved, so it is not used as the production post check.
Main CSS is 63,820 bytes and lazy CSS 130,401 bytes. Both are linked, nonempty,
fingerprinted and match their SHA-256 integrity values. Lazy CSS retains its
print/onload behavior. HTML/RSS/manifest use `en-us`; SEO/feed URLs retain the
`www` base URL. Search has 18 entries; RSS has 24 home and 18 blog entries.
Reusable testimonial/call-to-action pages and drafts remain excluded.

## Remaining warnings and blocked checks

- No npm audit findings remain. `glob@10.5.0` still has a registry deprecation
  notice for its old major. It patches the reported CLI advisory and satisfies
  sucrase's existing range; a major override was not introduced just to hide
  that warning. See the dependency review for exposure and future options.
- The harmless-for-this-workflow fsevents metadata warning remains as described
  above. Neither it nor any other warning is suppressed.
- Docker's CLI is installed, but its daemon is stopped/unavailable. A Linux build
  was not run, and the macOS clean build is not a Netlify build.
- Read-only `netlify status` was attempted using Node 24. Its saved configuration
  is root-owned, mode 0600, and unreadable to the current user. No permissions or
  credentials were changed. Dashboard overrides remain unverified.
- No remote preview/deployment was created. The README contains the specific
  dashboard checklist, future PR-preview steps and an upload-only draft command
  (which does not validate Netlify's build environment).

## Files for review

`AGENTS.md` and `docs/hugo-build-fix.md` were preserved byte-for-byte. They and the
existing verification report are already tracked in this checkout and are not
ignored. The only new documentation file to include in an eventual commit is
`docs/dependency-audit.md`; also include the updated `docs/build-verification.md`
and `readme.md`. The new source override is `layouts/shortcodes/image.html`.
Nothing is staged. Temporary browser tooling, downloads, screenshots, logs and
isolated builds remain outside the repository; generated output/dependencies
remain ignored. All test servers were stopped after verification.
