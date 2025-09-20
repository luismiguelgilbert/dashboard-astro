# Astro with Tailwind

```sh
pnpm create astro@latest -- --template with-tailwindcss
```

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/withastro/astro/tree/latest/examples/with-tailwindcss)
[![Open with CodeSandbox](https://assets.codesandbox.io/github/button-edit-lime.svg)](https://codesandbox.io/p/sandbox/github/withastro/astro/tree/latest/examples/with-tailwindcss)
[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/withastro/astro?devcontainer_path=.devcontainer/with-tailwindcss/devcontainer.json)

Astro comes with [Tailwind](https://tailwindcss.com) support out of the box. This example showcases how to style your Astro project with Tailwind.

For complete setup instructions, please see our [Tailwind Integration Guide](https://docs.astro.build/en/guides/integrations-guide/tailwind).


How I fixed...
* Deployment issues to Vercel:
- Installed `@astrojs/vercel`
- Added the following lines to [astro.config.mjs]
  adapter: vercel(),
  output: 'server',

* Installing ShadCN Vue components:
- Added `"packageManager": "pnpm@10.14.0"` to [package.json]
- I created all missing folders described in [components.json]

AUTHENTICATION:
- I'm using Better Auth
- The CLI connects to the Postgres DB (defined here: src/lib/auth.ts) and creates the tables
- Currently, any person can sign up