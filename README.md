# prettier-plugin-hugo-post

[![npm version](https://img.shields.io/npm/v/prettier-plugin-hugo-post)](https://www.npmjs.com/package/prettier-plugin-hugo-post)
[![license](https://img.shields.io/npm/l/prettier-plugin-hugo-post)](https://github.com/metcalfc/prettier-plugin-hugo-post/blob/main/LICENSE)

A Prettier plugin for formatting Hugo content files that mix front matter, Markdown, and Go template syntax.

## Why this plugin?

Hugo content files are not plain Markdown. They often contain:

- YAML, TOML, or JSON front matter
- Markdown prose and lists
- Hugo shortcodes
- Go template expressions and pipelines

This plugin formats all of that in a consistent way while keeping the rest of your Prettier configuration intact.

## Features

- Front matter formatting for YAML, TOML, and JSON
- Markdown formatting via Prettier
- Hugo shortcode spacing and normalization
- Template expression formatting for `.Title`, pipelines, conditions, and range blocks
- Works with standard Prettier overrides

## Installation

```bash
bun add -d prettier prettier-plugin-hugo-post
```

If you also format Hugo layout templates, install the companion plugin:

```bash
bun add -d prettier-plugin-go-template
```

## Basic configuration

Add the plugin to Prettier and set the parser for Hugo content files:

```json
{
  "plugins": ["prettier-plugin-hugo-post"],
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

For a mixed Hugo project, combine it with `prettier-plugin-go-template`:

```json
{
  "plugins": ["prettier-plugin-hugo-post", "prettier-plugin-go-template"],
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

## Repository documentation

- [docs/development/project-structure.md](docs/development/project-structure.md) — project layout and file/folder overview
- [docs/development/testing.md](docs/development/testing.md) — how to run the suite and validate changes
- [docs/development/CONTRIBUTING.md](docs/development/CONTRIBUTING.md) — contribution rules and pull request flow
- [docs/development/publishing.md](docs/development/publishing.md) — release and npm publishing process

## Project scripts

The repository uses the following package scripts:

```bash
bun test
bun run lint
bun run lint:fix
bun run format
bun run format:check
bun run example
```

## License

MIT

### Shortcode Parameters Have Normalized Spacing

This is expected behavior. The plugin intelligently formats shortcode parameter spacing:
- `{{<figure src="/img.jpg"title="Test">}}` becomes `{{< figure src="/img.jpg" title="Test" >}}`
- `{{ printf  "%s"   .Title }}` becomes `{{ printf "%s" .Title }}`
- This ensures consistent formatting and readability across all Hugo templates

### Using Both Plugins Together

When using both `prettier-plugin-hugo-post` and `prettier-plugin-go-template`:

1. **Order in plugins array doesn't matter** - Prettier applies the right parser based on file patterns
2. **Different file extensions** - `.md` files use `hugo-post`, `.html` files use `go-template`
3. **No conflicts** - Each plugin handles its specific file types independently
4. **Performance** - Both plugins can be installed and used together without issues

## Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

### Development

```bash
# Clone the repository
git clone https://github.com/metcalfc/prettier-plugin-hugo-post.git
cd prettier-plugin-hugo-post

# Install dependencies
bun install

# Run tests
bun test

# Test with example files
bun run example
```

## License

MIT © [Chad Metcalf](https://github.com/metcalfc)

## Acknowledgments

- [Prettier](https://prettier.io/) for the excellent formatting engine
- [prettier-plugin-go-template](https://github.com/NiklasPor/prettier-plugin-go-template) for inspiration on Go template formatting
- [Hugo](https://gohugo.io/) for the amazing static site generator

---

**Made with ❤️ for the Hugo community**
