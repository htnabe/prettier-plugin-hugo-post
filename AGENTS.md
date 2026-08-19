# Agent Guidelines

## Project intent

This repository provides a Prettier plugin for formatting Hugo content files with YAML, TOML, or JSON front matter plus Markdown and Hugo template syntax.

The project is intentionally small and focused: parser logic, printer logic, and end-to-end formatting tests live in the repository root and under the `src/` and `tests/` directories.

## Documentation map

Use this as the canonical index for the project documentation:

- Project overview and usage: [README.md](README.md)
- Project structure overview: [docs/development/project-structure.md](docs/development/project-structure.md)
- Testing and validation: [docs/development/testing.md](docs/development/testing.md)
- Contribution process: [docs/development/CONTRIBUTING.md](docs/development/CONTRIBUTING.md)
- Release and publishing process: [docs/development/publishing.md](docs/development/publishing.md)
- CI workflow: [.github/workflows/ci.yml](.github/workflows/ci.yml)
- Release workflow: [.github/workflows/release.yml](.github/workflows/release.yml)

## Source-of-truth commands

The package scripts in [package.json](package.json) are the authoritative references:

- `bun test`
- `bun run lint`
- `bun run lint:fix`
- `bun run format`
- `bun run format:check`
- `bun run example`

Before opening or updating a PR, run at least:

- `bun run lint`
- `bun run format:check`
- `bun test`

## Architecture landmarks

- Plugin entry: [src/index.ts](src/index.ts)
- Main printer logic: [src/features/printers/printers.ts](src/features/printers/printers.ts)
- Language config: [src/config/languages.ts](src/config/languages.ts)
- Plugin options: [src/config/options.ts](src/config/options.ts)
- Test entry: [tests/index.test.ts](tests/index.test.ts)
- Vitest config: [vitest.config.js](vitest.config.js)
- Example fixtures: [examples](examples)
- Sample inputs: [test-files](test-files)

## Editing guidance

- Keep edits minimal and scoped to the task.
- Prefer updating existing documentation over creating overlapping guides.
- When changing scripts, toolchain, workflows, or release behavior, update the relevant doc in the same change.
- If prose and workflow files disagree, trust the actual configuration and scripts over the documentation.
- Keep the README user-facing and keep AGENTS focused on repo-specific workflow and responsibilities.
