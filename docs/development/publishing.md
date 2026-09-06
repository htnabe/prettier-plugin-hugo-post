# Publishing Guide

This repository publishes to npm through the manually triggered workflow in [.github/workflows/publish.yml](../../.github/workflows/publish.yml).

GitHub Releases are created separately and automatically by [.github/workflows/release.yml](../../.github/workflows/release.yml), which runs whenever a tag matching `v*` is pushed. It creates a GitHub Release for that tag with auto-generated release notes (`gh release create --generate-notes`). This workflow does not publish to npm — it only records the release on GitHub. Push the version tag (e.g. `git tag v0.0.1-rc.2 && git push origin v0.0.1-rc.2`) after the corresponding npm publish has completed, matching the tag to the version that was published.

## Release flow

The project uses a manual, main-branch release flow:

1. Update the version in [package.json](../../package.json).
2. Commit the version bump and push it to `main`.
3. Run the GitHub Actions workflow from the `main` branch.
4. The workflow validates the package, then publishes it to npm using GitHub's OIDC trusted-publishing flow.

This is a manual release, not a tag-driven release.

## Manual versioning

Update the version in [package.json](../../package.json), then commit and push the change:

```bash
# edit package.json to set the new semver version
git add package.json
git commit -m "chore: release vX.Y.Z"
git push origin main
```

Then trigger the publish workflow from the GitHub Actions UI for the `main` branch.

## Required checks before publish

The release job runs:

- `bun install --frozen-lockfile`
- `bun run lint`
- `bun test`
- `bun run build`
- `bun pack --dry-run`

The CI workflow in [.github/workflows/test.yml](../../.github/workflows/test.yml) runs the same general validation for pull requests and pushes to `main`.

## GitHub and npm publishing setup

The workflow uses GitHub Actions OIDC trusted publishing rather than a personal npm token:

- `id-token: write` is granted to the workflow
- `bun publish --access public` is executed during the publish step

No `NPM_TOKEN` secret is required for the current configuration.

## Notes

- Publishing is manual and intended to be triggered from `main`, not from ordinary tag pushes.
- The repository keeps the release logic in CI rather than in ad hoc local commands.
- Before a release, ensure the package version and changelog metadata are in sync with the intended feature or fix set.
- After npm publish succeeds, push a matching `vX.Y.Z` tag to trigger the GitHub Release workflow.
