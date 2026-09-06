# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.0.1-rc.2] - 2026-09-06

### Added

- Release workflow migration to Bun-based publish automation
- Repository metadata aligned for the htnabe fork
- Documentation updates for the current GitHub Actions naming and release flow
- GitHub Actions workflow to automatically create a GitHub Release with generated notes when a `v*` tag is pushed

### Changed

- Updated the package publishing configuration for the maintained fork
- Simplified the GitHub environment declaration to the standard Actions string form

### Fixed

- Prevented a Markdown table from absorbing an immediately following Hugo shortcode closing tag (e.g. `{{</ table >}}`) as an extra table row by inserting the required blank line before it
- Avoided misclassifying Go template pipelines (e.g. `{{ .Title | upper }}`) as Markdown table rows
- Updated `publish.yml` to use the latest Bun version so `bun test`'s native test runner resolves the global `describe`/`test`/`expect` APIs used by the test suite
- Corrected `publish.yml`'s release checks to use `bun pm pack --dry-run` (the actual Bun CLI subcommand) instead of the invalid `bun pack --dry-run`

## [0.0.1-rc.1] - 2026-08-19

### Added

- Initial release candidate for the formatted Hugo content plugin
- YAML, TOML, and JSON front matter support
- Markdown and shortcode formatting integration with Prettier
- Coverage for shortcode parsing, template spacing, and malformed input recovery
