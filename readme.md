<h1 align="center">Hugo + Tailwind CSS Starter and Boilerplate</h1>

<p align="center">Hugoplate is a free starter template built with Hugo, and TailwindCSS, providing everything you need to jumpstart your Hugo project and save valuable time.</p>

<p align="center">Made with ♥ by <a href="https://zeon.studio/"> Zeon Studio</a></p>
<p align=center> If you find this project useful, please give it a ⭐ to show your support.</p>

<h2 align="center"> <a target="_blank" href="https://zeon.studio/preview?project=hugoplate" rel="nofollow">👀 Demo</a> | <a  target="_blank" href="https://pagespeed.web.dev/analysis/https-hugoplate-netlify-app/6lyxjw6t4r?form_factor=desktop">Page Speed (95+)🚀</a>
</h2>

<p align="center">
  <a href="https://github.com/gohugoio/hugo/releases/tag/v0.165.0" alt="Contributors">
    <img src="https://img.shields.io/static/v1?label=min-HUGO-version&message=0.165.0&color=f00&logo=hugo" />
  </a>

  <a href="https://github.com/zeon-studio/hugoplate/blob/main/LICENSE">
    <img src="https://img.shields.io/github/license/zeon-studio/hugoplate" alt="license">
  </a>

  <a href="https://github.com/zeon-studio/hugoplate">
    <img src="https://img.shields.io/github/languages/code-size/zeon-studio/hugoplate" alt="code size">
  </a>

  <a href="https://github.com/zeon-studio/hugoplate/graphs/contributors">
    <img src="https://img.shields.io/github/contributors/zeon-studio/hugoplate" alt="contributors">
  </a>
</p>

## 🎁 What's Included

We have included almost everything you need to start your Hugo project. Let's see what's included in this template:

### 📌 Key Features

- 👥 Multi-Authors
- 🎯 Similar Posts Suggestion
- 🔍 Search Functionality
- 🌑 Dark Mode
- 🏷️ Tags & Categories
- 🔗 Netlify setting pre-configured
- 📞 Support contact form
- 📱 Fully responsive
- 📝 Write and update content in Markdown
- 💬 Disqus Comment
- 🔳 Syntax Highlighting

### 📄 15+ Pre-designed Pages

- 🏠 Homepage
- 👤 About
- 📞 Contact
- 👥 Authors
- 👤 Author Single
- 📝 Blog
- 📝 Blog Single
- 🚫 Custom 404
- 💡 Elements
- 📄 Privacy Policy
- 🏷️ Tags
- 🏷️ Tag Single
- 🗂️ Categories
- 🗂️ Category Single
- 🔍 Search

### 📦 Tech Stack

- [Hugo](https://gohugo.io/)
- [Tailwind CSS](https://tailwindcss.com/)
- [PostCSS](https://postcss.org/)
- [PurgeCSS](https://purgecss.com/)
- [AutoPrefixer](https://autoprefixer.github.io/)
- [Hugo Modules](https://gohugo.io/hugo-modules/) by [Gethugothemes](https://gethugothemes.com/hugo-modules)
- [Markdown](https://markdownguide.org/)
- [Prettier](https://prettier.io/)
- [Jshint](https://jshint.com/)
- [Netlify](https://www.netlify.com/)
- [Vercel](https://vercel.com/)
- [Github Actions](https://github.com/features/actions)
- [Gitlab Ci](https://docs.gitlab.com/ee/ci/)
- [AWS Amplify](https://aws.amazon.com/amplify/)

---

## 🚀 Getting Started

This repository is an initialized cycling blog with a checked-in Hugoplate theme.
Do not run `project-setup`, `theme-setup` or theme/module update scripts as part of
normal installation or builds.

### Toolchain

Use Hugo **Extended 0.165.0**, Node **24.21.0** (LTS), npm **11.19.0** and
Go **1.24.1**, matching `netlify.toml`. `.nvmrc` selects the Node version;
`config/_default/module.toml` requires Hugo Extended 0.165.0 or newer. Keep the
exact tested Hugo version for reproducible builds. Go's module language minimum
remains 1.21; no module upgrades are required.

On macOS, if you use nvm, run `nvm install` and `nvm use` in this directory.
Check `hugo version`, `node --version`, `npm --version` and `go version` before
building. The Hugo version must include `extended`.

### Install and run

```bash
npm ci --include=dev
hugo                    # plain production build
npm run build           # production build with minification and cleanup
npm run dev             # development server: http://localhost:1313
npm run preview         # production-mode local server
npm run check:postcss   # regression check with project-only Node reads
```

Use npm and retain `package-lock.json` and `go.sum` in version control. The existing
npm dependency versions are preserved. Do not add a Yarn lockfile. Generated
`public/`, `resources/`, `hugo_stats.json` and `node_modules/` remain ignored.
Tailwind 3 reads Hugo's generated statistics; keep build statistics, cachebusters
and the deferred production CSS processing enabled.

### PostCSS and Netlify

Autoprefixer explicitly uses Browserslist's `defaults` policy (`> 0.5%`,
`last 2 versions`, `Firefox ESR`, `not dead`). `stats: {}` prevents its separate
custom-usage-statistics search. Together these avoid ancestor filesystem lookups
without widening or disabling Hugo's Node permissions. See the
[Browserslist defaults](https://github.com/browserslist/browserslist#queries) and
[Hugo security settings](https://gohugo.io/configuration/security/).

`layouts/_default/index.webmanifest` overrides the pinned PWA module's template
only to migrate `site.LanguageCode` to `site.Language.Locale`. Its source is
`github.com/gethugothemes/hugo-modules/pwa` at
`v0.0.0-20240925042433-d2b5d05977e8`; keep this override until an intentional module
update includes the migration.

Netlify publishes `public` using `npm ci --include=dev && npm run build`.
The explicit clean install enforces the lockfile even if Netlify's dependency
phase used `npm install`. Confirm the dashboard uses the repository root as its
base directory and has no conflicting context, build-command, tool-version,
`NODE_ENV`, `NPM_FLAGS`, `NODE_OPTIONS` or `HUGO_SECURITY_*` overrides. Local
verification does not verify a Netlify deployment.

### 🎬 Still Confused? Watch a Quick Video

https://github.com/zeon-studio/hugoplate/assets/58769763/c260c0ae-91be-42ce-b8db-aa7f11f777bd

---

## 📝 Customization

This template has been designed with a lot of customization options in mind. You can customize almost anything you want, including:

### 👉 Site Config

You can change the site title, base URL, language, theme, plugins, and more from the `hugo.toml` file.

### 👉 Site Params

You can customize all the parameters from the `config/_default/params.toml` file. This includes the logo, favicon, search, SEO metadata, and more.

### 👉 Colors and Fonts

You can change the colors and fonts from the `data/theme.json` file. This includes the primary color, secondary color, font family, and font size.

### 👉 Social Links

You can change the social links from the `data/social.json` file. Add your social links here, and they will automatically be displayed on the site.

---

## 🛠 Advanced Usage

We have added some custom scripts to make your life easier. You can use these scripts to help you with your development.

### 👉 Update Theme

If you want to update the theme, then you can use the following command. It will update the theme to the latest version.

```bash
npm run update-theme
```

> **Note:** This command will work after running `project-setup` script.

### 👉 Update Modules

We have added a lot of modules to this template. You can update all the modules using the following command.

```bash
npm run update-modules
```

### 👉 Remove Dark Mode

If you want to remove dark mode from your project, you can use the following command to remove dark mode from your project.

```bash
npm run remove-darkmode
```

> **Note:** This command will work before running `project-setup` script. If you already run the `project-setup` command, then you have to run `npm run theme-setup` first, and then you can run this command. afterward, you can run `npm run project-setup` again.

---

## 🚀 Build And Deploy

After you finish your development, you can build or deploy your project almost everywhere. Let's see the process:

### 👉 Build Command

To build your project locally, you can use the following command. It will purge all the unused CSS and minify all the files.

```bash
npm run build
```

### 👉 Deploy Site

We have provided 5 different deploy platform configurations with this template, so you can deploy easily.

- [Netlify](https://www.netlify.com/)
- [Vercel](https://vercel.com/)
- [Github Actions](https://github.com/features/actions)
- [Gitlab Ci](https://docs.gitlab.com/ee/ci/)
- [AWS Amplify](https://aws.amazon.com/amplify/)

And if you want to Host some other hosting platforms. then you can build your project, and you will get a `public` folder. that you can copy and paste on your hosting platform.

> The canonical `baseURL` is already configured as `https://www.nikolai.com.au/` in `hugo.toml`.

---

## 🔒 Guide to Staying Compliant

### 🐞 Reporting Issues

We use GitHub Issues as the official bug tracker for this Template. Please Search [existing issues](https://github.com/zeon-studio/hugoplate/issues). It’s possible someone has already reported the same problem.
If your problem or idea has not been addressed yet, feel free to [open a new issue](https://github.com/zeon-studio/hugoplate/issues).

### 📝 License

Copyright (c) 2023 - Present, Designed & Developed by [Zeon Studio](https://zeon.studio/)

**Code License:** Released under the [MIT](https://github.com/zeon-studio/hugoplate/blob/main/LICENSE) license.

**Image license:** The images are only for demonstration purposes. They have their license, we don't have permission to share those images.

---

## 🖼️ Showcase

List of some projects people are building with **Hugoplate**!

| [![Open Neuromorphic](https://tinyurl.com/hp7avtje)](https://open-neuromorphic.org/) | [![AI Models](https://tinyurl.com/mu4p7dhb)](https://aimodels.org/) | [![Hugobricks](https://tinyurl.com/4x3uwhm9)](https://www.hugobricks.preview.usecue.com/) | [![ONO LLC](https://tinyurl.com/2fbjzwzn)](https://ono.day/)
|:---:|:---:|:---:|:---:|
| **Open Neuromorphic** | **AI Models** | **Hugobricks** | **ONO LLC** |

---

## 💻 Need Customization?

If you need a custom theme, theme customization, or complete website development services from scratch you can [Hire Us](https://zeon.studio/estimate-project).
