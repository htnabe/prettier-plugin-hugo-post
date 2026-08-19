# Testing Guide

This repository uses Vitest for automated validation. The project also includes example fixtures and integration-style tests that exercise the plugin against realistic Hugo content.

## Commands

Run the suite:

```bash
bun test
```

Run the plugin against the example file:

```bash
bun run example
```

Check project formatting:

```bash
bun run format:check
```

Lint the project:

```bash
bun run lint
```

## Test layout

```text
tests/
├── index.test.ts
├── helpers.ts
└── suites/
    ├── basic-functionality.test.js
    ├── prettier-integration.test.js
    ├── performance.test.js
    ├── error-recovery.test.js
    └── unicode.test.js

test-files/
├── basic.md
├── complex.md
├── malformed.md
├── shortcodes.hugo
├── shortcodes.md
```

The main test entry is [tests/index.test.ts](../../tests/index.test.ts). That file imports the suite files and exercises mixed-content formatting, edge cases, shortcode handling, and malformed input recovery.

## What is covered

- mixed front matter + Markdown + template formatting
- shortcode normalization
- whitespace and pipe formatting inside Go templates
- malformed input resilience
- Unicode and special-character handling
- performance-oriented regression coverage

## Running a focused check

To run one suite or a named test:

```bash
bunx vitest run tests/index.test.ts
bunx vitest run --testNamePattern="mixed content"
```

This is useful when iterating on a specific parser or printer behavior without running the entire suite.

## CI expectations

The CI workflow in [.github/workflows/test.yml](../../.github/workflows/test.yml) runs:

- `bun install --frozen-lockfile`
- `bun test`
- `bun run format:check`
- `bun run example`

That means the repo should stay green with the same checks used locally before submission.

## Good validation flow

For a small change, the usual loop is:

```bash
bun run example
bun test
```

For a final review or PR preparation:

```bash
bun run lint
bun run format:check
bun test
```
