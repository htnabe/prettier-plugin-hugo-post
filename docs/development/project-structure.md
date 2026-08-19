# Project Structure

This document summarizes the repository layout and the purpose of the main directories and files.

## Top-level structure

```text
.
├── .github/
│   └── workflows/
│       ├── ci.yml
│       └── release.yml
├── docs/
│   └── development/
│       ├── CONTRIBUTING.md
│       ├── publishing.md
│       ├── testing.md
│       └── project-structure.md
├── examples/
├── src/
│   ├── config/
│   ├── features/
│   ├── types/
│   ├── utils/
│   └── index.ts
├── test-files/
├── tests/
│   ├── helpers.ts
│   ├── index.test.ts
│   └── suites/
├── .gitignore
├── .oxlintrc.json
├── .prettierignore
├── .prettierrc
├── AGENTS.md
├── CHANGELOG.md
├── LICENSE
├── README.md
├── package.json
├── tsconfig.json
├── vitest.config.js
├── bun.lock
```

## Purpose by area

### Root files

- [README.md](../../README.md): user-facing overview, installation, and usage.
- [AGENTS.md](../../AGENTS.md): repository workflow and documentation index for contributors and agents.
- [package.json](../../package.json): scripts, dependencies, project metadata, and package configuration.
- [tsconfig.json](../../tsconfig.json): TypeScript compiler configuration.
- [vitest.config.js](../../vitest.config.js): Vitest test runner configuration.
- [CHANGELOG.md](../../CHANGELOG.md): release history.
- [LICENSE](../../LICENSE): project license.

### Source code

- [src/index.ts](../../src/index.ts): plugin entry point and parser registration.
- [src/config/languages.ts](../../src/config/languages.ts): language metadata for Hugo front matter and content types.
- [src/config/options.ts](../../src/config/options.ts): plugin option definitions.
- [src/features/printers/printers.ts](../../src/features/printers/printers.ts): formatting logic for front matter, templates, and Markdown sections.
- [src/types](../../src/types): TypeScript types used by the formatter.
- [src/utils](../../src/utils): small utility helpers used during parsing and formatting.

### Tests

- [tests/index.test.ts](../../tests/index.test.ts): central test entry that imports the suite files.
- [tests/helpers.ts](../../tests/helpers.ts): common helpers used by the tests.
- [tests/suites](../../tests/suites): individual test suites covering formatting behavior, integration, performance, recovery, and Unicode edge cases.
- [test-files](../../test-files): sample Hugo content fixtures used for parser and formatter validation.
- [examples](../../examples): example input/output files used to demonstrate the plugin in practice.

### Documentation

- [README.md](../../README.md): overview and user installation/setup instructions.
- [docs/development/testing.md](testing.md): testing commands and validation expectations.
- [docs/development/CONTRIBUTING.md](CONTRIBUTING.md): contribution workflow and PR expectations.
- [docs/development/publishing.md](publishing.md): release and npm publishing process.
- [docs/development/project-structure.md](project-structure.md): repository layout reference.

### GitHub automation

- [.github/workflows/ci.yml](../../.github/workflows/ci.yml): CI validation for pushes and pull requests.
- [.github/workflows/release.yml](../../.github/workflows/release.yml): release workflow that runs tests, creates a GitHub release, and publishes to npm.

## Working mental model

This project is intentionally compact:

- parser and formatting logic live under [src](../../src)
- behavioral regression tests live under [tests](../../tests)
- real-world fixtures live under [test-files](../../test-files) and [examples](../../examples)
- project-specific processes live in the docs under [docs/development](.)

This separation keeps feature code, test coverage, and project process distinct while avoiding unnecessary duplication across documentation files.
