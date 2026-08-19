# Contributing Guide

Contributions are welcome as long as they stay focused on formatting behavior, parser correctness, or test coverage.

## Before you start

1. Fork the repository and create a feature branch.
2. Install dependencies:

   ```bash
   bun install
   ```

3. Keep the scope narrow. One fix or feature per pull request is easier to review and safer to merge.

## Development expectations

- Follow the repository's existing structure and naming patterns.
- Add or update tests for functional changes.
- Keep documentation aligned with code changes.
- Prefer small, readable diffs over broad refactors.

## Validation checklist

Before opening or updating a PR, run the repository checks:

```bash
bun run lint
bun run format:check
bun test
```

For quick iteration during development, this workflow is also useful:

```bash
bun run example
bun test
```

## Pull request workflow

1. Create a branch for your change.
2. Implement the fix or feature.
3. Add the relevant tests.
4. Run the validation commands above.
5. Open a PR with a clear summary and the specific behavior it changes.

## Documentation updates

If the change affects user behavior, parser rules, or release workflow, update the relevant docs in [docs/development](../development) and, when needed, the root [README.md](../../README.md).

## Questions and issues

Open an issue before starting a large change if the expected behavior is not yet clear. That helps keep the contribution aligned with the project's direction.
