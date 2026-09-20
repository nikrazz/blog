# Dependency audit follow-up — 20 September 2026

Fresh `npm audit --json`: **11 affected packages → 0** (all severities).

All fixes fit the existing semver ranges. Tailwind remains 3.4.13, Autoprefixer 10.4.20 and postcss-cli 11.0.0. The update changed 17 locked entries and added Browserslist’s baseline-browser-mapping dependency. `package.json` ranges were not widened.

These npm packages run on the build/development machine; none are bundled into the browser JavaScript. The browser receives generated CSS plus theme/module assets (including GLightbox and Swiper), which npm audit does not assess. Build tools still process repository/module input and can expose CI resources when that input is untrusted.

## Affected chains, fixes and exposure

### brace-expansion (2.0.1 → 2.1.7)

**Chain:** Tailwind → sucrase → glob → minimatch → brace-expansion.

Malicious brace patterns can consume CPU/memory. Build-time glob expansion; no visitor-supplied pattern endpoint.

Advisories:

- [GHSA-v6h2-p8h4-qcjw](https://github.com/advisories/GHSA-v6h2-p8h4-qcjw): brace-expansion Regular Expression Denial of Service vulnerability (low).
- [GHSA-f886-m6hf-6m8v](https://github.com/advisories/GHSA-f886-m6hf-6m8v): brace-expansion: Zero-step sequence causes process hang and memory exhaustion (moderate).
- [GHSA-3jxr-9vmj-r5cp](https://github.com/advisories/GHSA-3jxr-9vmj-r5cp): brace-expansion: DoS via exponential-time expansion of consecutive non-expanding {} groups (high).
- [GHSA-mh99-v99m-4gvg](https://github.com/advisories/GHSA-mh99-v99m-4gvg): brace-expansion: DoS via unbounded expansion length causing an out-of-memory process crash (high).
- [GHSA-rgw5-rvv9-x895](https://github.com/advisories/GHSA-rgw5-rvv9-x895): brace-expansion: DoS via unbounded intermediate arrays, bypassing the CVE-2026-14257 mitigation (high).

### browserslist (4.24.0 → 4.29.0)

**Chain:** Autoprefixer → Browserslist.

Unbounded query caches and unsafe custom statistics can crash or corrupt a build process. This project uses a fixed defaults query and explicit empty stats, but upgrading removes the vulnerable implementation.

Advisories:

- [GHSA-c83g-rgw3-j3cx](https://github.com/advisories/GHSA-c83g-rgw3-j3cx): Browserslist: Unbounded memory growth (no cache eviction) via distinct query results, leading to eventual OOM (high).
- [GHSA-73wf-gq98-2v4g](https://github.com/advisories/GHSA-73wf-gq98-2v4g): Browserslist: Uncaught crash / prototype write via untrusted browserslist-stats.json custom stats (normalizeStats) (high).

### cross-spawn (7.0.3 → 7.0.6)

**Chain:** Tailwind → sucrase → glob → foreground-child → cross-spawn.

ReDoS in command escaping, particularly Windows execution paths. Current macOS/Linux Hugo pipeline does not invoke glob’s command runner; updated nonetheless.

Advisories:

- [GHSA-3xgq-45jj-v275](https://github.com/advisories/GHSA-3xgq-45jj-v275): Regular Expression Denial of Service (ReDoS) in cross-spawn (high).

### glob (10.4.5 → 10.5.0)

**Chain:** Tailwind → sucrase → glob.

Command injection affects the glob CLI -c/--cmd path. This repository does not invoke it; sucrase uses the library. 10.5.0 patches the advisory within the existing major.

Advisories:

- [GHSA-5j98-mcp5-4vw2](https://github.com/advisories/GHSA-5j98-mcp5-4vw2): glob CLI: Command injection via -c/--cmd executes matches with shell:true (high).

### joi (17.13.3 → 17.13.8)

**Chain:** tailwind-bootstrap-grid → joi.

Recursive schema/input denial of service and prototype manipulation. Here Joi validates fixed local grid options, without recursive link schemas or custom message/rename templates.

Advisories:

- [GHSA-q7cg-457f-vx79](https://github.com/advisories/GHSA-q7cg-457f-vx79): joi has an uncaught RangeError on deeply nested input through recursive `link()` schemas (moderate).
- [GHSA-6w3j-5fw6-r9vr](https://github.com/advisories/GHSA-6w3j-5fw6-r9vr): joi: Prototype pollution via a `__proto__` language key in custom messages (low).
- [GHSA-gg4h-3hg2-grpc](https://github.com/advisories/GHSA-gg4h-3hg2-grpc): joi: object().rename() with a template target can set the validated object's prototype (low).

### minimatch (9.0.5 → 9.0.9)

**Chain:** Tailwind → sucrase → glob → minimatch.

Pathological glob patterns cause ReDoS. Repository-controlled patterns are the build exposure; no browser execution.

Advisories:

- [GHSA-3ppc-4f35-3m26](https://github.com/advisories/GHSA-3ppc-4f35-3m26): minimatch has a ReDoS via repeated wildcards with non-matching literal in pattern (high).
- [GHSA-7r86-cg39-jmmj](https://github.com/advisories/GHSA-7r86-cg39-jmmj): minimatch has ReDoS: matchOne() combinatorial backtracking via multiple non-adjacent GLOBSTAR segments (high).
- [GHSA-23c5-xmqv-rm74](https://github.com/advisories/GHSA-23c5-xmqv-rm74): minimatch ReDoS: nested *() extglobs generate catastrophically backtracking regular expressions (high).

### nanoid (3.3.7 → 3.3.19)

**Chain:** PostCSS → nanoid/non-secure.

Invalid size inputs can loop or produce unsafe IDs. PostCSS uses a fixed positive size of 6 for diagnostic input identifiers, not authentication tokens.

Advisories:

- [GHSA-mwcw-c2x4-8c55](https://github.com/advisories/GHSA-mwcw-c2x4-8c55): Predictable results in nanoid generation when given non-integer values (moderate).
- [GHSA-28wg-ghj8-5hjv](https://github.com/advisories/GHSA-28wg-ghj8-5hjv): nanoid: non-secure generators can loop indefinitely with negative size (high).
- [GHSA-2v37-7h3g-55p8](https://github.com/advisories/GHSA-2v37-7h3g-55p8): nanoid: custom generators can loop indefinitely when size is zero (high).
- [GHSA-xwg4-73v4-xw9w](https://github.com/advisories/GHSA-xwg4-73v4-xw9w): nanoid: Integer Overflow or Wraparound (high).

### picomatch (2.3.1 → 2.3.2)

**Chain:** Tailwind → micromatch; Tailwind/postcss-cli → chokidar → anymatch/readdirp → picomatch.

Crafted glob patterns can cause ReDoS or incorrect matching. Used for local scanning/watching; untrusted repository configuration remains a build risk.

Advisories:

- [GHSA-3v7f-55p6-f55p](https://github.com/advisories/GHSA-3v7f-55p6-f55p): Picomatch: Method Injection in POSIX Character Classes causes incorrect Glob Matching (moderate).
- [GHSA-c2c7-rcm5-vvqj](https://github.com/advisories/GHSA-c2c7-rcm5-vvqj): Picomatch has a ReDoS vulnerability via extglob quantifiers (high).

### postcss (8.4.47 → 8.5.28)

**Chain:** Direct dependency; shared by Tailwind, Autoprefixer and postcss-cli.

Untrusted CSS sourceMappingURL comments could disclose local source-map files during a build. Hugo’s project-only read boundary limits paths but is not a substitute for the patch. The stringifier XSS advisory concerns embedding CSS into HTML; this pipeline emits external CSS assets.

Advisories:

- [GHSA-qx2v-qp2m-jg93](https://github.com/advisories/GHSA-qx2v-qp2m-jg93): PostCSS has XSS via Unescaped </style> in its CSS Stringify Output (moderate).
- [GHSA-6g55-p6wh-862q](https://github.com/advisories/GHSA-6g55-p6wh-862q): PostCSS: Arbitrary file read and information disclosure via attacker-controlled sourceMappingURL in CSS comments (high).
- [GHSA-fxqj-rqcc-2cmp](https://github.com/advisories/GHSA-fxqj-rqcc-2cmp): PostCSS: incomplete fix of GHSA-6g55-p6wh-862q — attacker-controlled sourceMappingURL reads arbitrary .map files when `from` is unset (moderate).
- [GHSA-r28c-9q8g-f849](https://github.com/advisories/GHSA-r28c-9q8g-f849): PostCSS: Path Traversal in Previous Source Map Auto-Loading (sourceMappingURL) leads to Arbitrary .map File Disclosure (high).

### postcss-selector-parser (6.1.2 → 6.1.4)

**Chain:** Tailwind and Tailwind → postcss-nested → postcss-selector-parser.

Deep selectors can exhaust AST recursion during CSS generation. Both affected 6.1.2 copies updated. Typography’s exact 6.0.10 dependency is outside the audit’s affected range and was retained.

Advisories:

- [GHSA-w9m9-85wc-3x92](https://github.com/advisories/GHSA-w9m9-85wc-3x92): postcss-selector-parser allows denial of service through uncontrolled AST recursion (low).

### yaml (2.5.1 → 2.9.1)

**Chain:** postcss-cli/Tailwind → postcss-load-config → yaml.

Deeply nested YAML can overflow the stack. Current PostCSS configuration is JavaScript, not untrusted YAML; compatible update applied.

Advisories:

- [GHSA-48c2-rrv3-qjmp](https://github.com/advisories/GHSA-48c2-rrv3-qjmp): yaml is vulnerable to Stack Overflow via deeply nested YAML collections (moderate).

## Remaining warnings and scope

There are no remaining npm audit findings at verification time. `glob@10.5.0` still carries a registry deprecation notice for its old major even though the fresh audit is clear and the reported CLI vulnerability is patched. Moving outside sucrase’s `^10.3.10` range would require an upstream change or a separately tested breaking override; neither is needed to clear this audit.

The optional macOS `fsevents@2.3.3` warning is install-script metadata, not an audit vulnerability. No installation protection was disabled or script approved. See `build-verification.md` for native-module and watcher tests.

The official `npx --yes update-browserslist-db@latest` updater (1.3.3) confirmed caniuse-lite 1.0.30001810. The preceding targeted Browserslist update had already refreshed the data from 1.0.30001664. The configured browser policy remains `defaults`; its resolved browser versions naturally advance with the dataset.
