# Publishing Guide

This repository publishes to npm through the version-change release workflow defined in [.github/workflows/publish.yml](../../.github/workflows/publish.yml).

## Release flow

The project follows a standard semantic-versioning flow:

1. Update the version in [package.json](../../package.json).
2. Commit the version bump and tag the release.
3. Push the tag to GitHub.
4. The release workflow runs tests, checks formatting, creates the GitHub release, and publishes the package to npm.

## Manual versioning

Update the version in [package.json](../../package.json), then commit the change and tag the release:

```bash
# edit package.json to set the new semver version
git add package.json
git commit -m "chore: release vX.Y.Z"
git tag vX.Y.Z
```

Then push the commit and tag:

```bash
git push origin main --follow-tags
```

The release workflow is configured to trigger on tags matching `v*`.

## Required checks before publish

The release job runs:

- `bun install --frozen-lockfile`
- `bun test`
- `bun run format:check`
- `bun run example`

The CI workflow in [.github/workflows/test.yml](../../.github/workflows/test.yml) performs the same validation for pull requests and pushes to `main`.

## GitHub and npm secrets

The workflow expects the following release credential:

- `NPM_TOKEN` for publishing to npm

This value must be available in the repository's GitHub Actions secrets.

## Notes

- Publishing is tied to release tags, not to ordinary pushes to `main`.
- The repository keeps the release logic in CI rather than in ad hoc local commands.
- Before a release, ensure the package version and changelog metadata are in sync with the intended feature or fix set.
