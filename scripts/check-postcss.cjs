const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const postcss = require("postcss");
const autoprefixer = require("autoprefixer");
const options = require("../postcss.config.js").plugins.autoprefixer;

// Reproduce Hugo's boundary: neither config nor usage-stat searches may escape.
assert.throws(() => fs.existsSync(path.resolve("../package.json")), {
  code: "ERR_ACCESS_DENIED",
});

async function check() {
  for (const file of ["style.css", "style-lazy.css"]) {
    const result = await postcss([autoprefixer(options)]).process(
      ".permission-check { user-select: none; appearance: none; }",
      { from: path.resolve("css", file) },
    );
    assert.match(result.css, /-webkit-user-select/);
    assert.match(result.css, /-webkit-appearance/);
  }
  console.log("Main and lazy CSS prefixing passed with project-only reads.");
}

check().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
