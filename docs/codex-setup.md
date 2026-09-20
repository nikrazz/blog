# Using Codex with this blog

1. Put `AGENTS.md` in the repository root, alongside `hugo.toml` and `package.json`. Use the exact uppercase filename. If instructions already exist locally, merge them instead of overwriting them.
2. Put `hugo-build-fix.md` and this file in the repository's `docs/` folder.
3. Open `/Users/nikolai/sites/blog` as the project in your Codex environment and start a new task after adding these files.
4. Send this prompt:

```text
Read AGENTS.md and docs/hugo-build-fix.md. Implement the Hugo build repair described there, including the deprecation migrations, PostCSS permission diagnosis and fix, and consistent local/Netlify build configuration. Verify the changes as specified and report the results. Preserve my existing local changes. Do not commit, push or deploy.
```

`AGENTS.md` supplies ongoing project instructions; `docs/hugo-build-fix.md` is the detailed task brief. No custom skill, API key file or project-specific Codex configuration is needed for this setup.

The preparation was based on repository commit `e0c5ce4`. It adds documentation only; the build repair and toolchain verification are work for the task above. Nothing has been pushed to GitHub or deployed to Netlify.

See [OpenAI's AGENTS.md documentation](https://developers.openai.com/codex/guides/agents-md/) for instruction discovery and scope.
