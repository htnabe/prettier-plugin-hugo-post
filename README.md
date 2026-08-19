# @htnabe/prettier-plugin-hugo-post

[![npm version](https://img.shields.io/npm/v/@htnabe/prettier-plugin-hugo-post)](https://www.npmjs.com/package/@htnabe/prettier-plugin-hugo-post)
[![GitHub](https://img.shields.io/github/stars/htnabe/prettier-plugin-hugo-post?style=social)](https://github.com/htnabe/prettier-plugin-hugo-post)
[![codecov](https://codecov.io/gh/htnabe/prettier-plugin-hugo-post/graph/badge.svg?token=BR5Y5MAXON)](https://codecov.io/gh/htnabe/prettier-plugin-hugo-post)
[![license](https://img.shields.io/npm/l/@htnabe/prettier-plugin-hugo-post)](https://github.com/htnabe/prettier-plugin-hugo-post/blob/main/LICENSE)

A Prettier plugin for formatting Hugo content files that mix front matter, Markdown, and Go template syntax.

## Why this plugin?

Hugo content files are not plain Markdown. They often contain:

- YAML, TOML, or JSON front matter
- Markdown prose and lists
- Hugo shortcodes
- Go template expressions and pipelines

This plugin keeps those pieces formatted consistently while leaving the rest of your Prettier setup alone.

## Features

- Front matter formatting for YAML, TOML, and JSON
- Markdown formatting via Prettier
- Hugo shortcode spacing and normalization
- Template expression formatting for `.Title`, pipelines, conditions, and range blocks
- Works with standard Prettier overrides

## Installation

Using Bun:

```bash
bun add -d prettier @htnabe/prettier-plugin-hugo-post
```

Using npm:

```bash
npm install --save-dev prettier @htnabe/prettier-plugin-hugo-post
```

If you also format Hugo layout templates, install the companion plugin:

```bash
bun add -d @htnabe/prettier-plugin-go-template
```

## Basic configuration

Add the plugin to Prettier and set the parser for Hugo content files:

```json
{
  "plugins": ["@htnabe/prettier-plugin-hugo-post"],
  "overrides": [
    {
      "files": ["content/**/*.md", "**/*.md", "**/*.hugo"],
      "options": {
        "parser": "hugo-post"
      }
    }
  ]
}
```

For a mixed Hugo project, combine it with `@htnabe/prettier-plugin-go-template`:

```json
{
  "plugins": ["@htnabe/prettier-plugin-hugo-post", "@htnabe/prettier-plugin-go-template"],
  "overrides": [
    {
      "files": ["content/**/*.md", "**/*.md"],
      "options": {
        "parser": "hugo-post"
      }
    },
    {
      "files": ["layouts/**/*.html", "**/*.html"],
      "options": {
        "parser": "go-template"
      }
    }
  ]
}
```

## Usage

Format a single file:

```bash
bunx prettier --write content/posts/my-post.md
```

Check formatting without writing:

```bash
bunx prettier --check "content/**/*.md"
```

## Example

This input:

```markdown
---
title:    "My Post"
tags: [  "hugo",  "blog" ]
---

{{<figure src="/img.jpg"alt="Test">}}
{{ .Title|upper }}
```

is normalized to:

```markdown
---
title: "My Post"
tags: ["hugo", "blog"]
---

{{< figure src="/img.jpg" alt="Test" >}}
{{ .Title | upper }}
```

## Project scripts

The repository uses these package scripts:

```bash
bun test
bun run lint
bun run lint:fix
bun run format
bun run format:check
bun run example
```

## Contributing

Contributions are welcome. Please read the [contributing guide](docs/development/CONTRIBUTING.md) before opening a PR.

## License

MIT

## Acknowledgments

- [Prettier](https://prettier.io/) for the excellent formatting engine
- [@htnabe/prettier-plugin-go-template](https://github.com/htnabe/prettier-plugin-go-template) for inspiration on Go template formatting
- [Hugo](https://gohugo.io/) for the amazing static site generator

---

Made with ❤️ for the Hugo community.
