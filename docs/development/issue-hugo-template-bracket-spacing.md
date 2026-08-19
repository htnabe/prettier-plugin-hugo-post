# Issue: decide how `hugoTemplateBracketSpacing` should behave

## Summary

The exported `hugoTemplateBracketSpacing` option is currently registered in `src/config/options.ts`, but the formatter logic does not appear to read the value anywhere. The behavior currently always emits spaced delimiters, so the option has no practical effect.

## Why this matters

This creates a mismatch between the public API surface and real behavior:

- users can configure the option
- the option is documented as supported
- the printer does not actually honor the setting

This can lead to confusion and a misleading release surface.

## Questions to resolve

1. Should this option be implemented in the template printer?
2. If it is intentionally unsupported, should it be removed from the public option list before release?
3. Is there a planned configuration contract for Hugo template spacing that should be documented explicitly?

## Proposed resolution

Decide on the intended behavior and then do one of the following:

- implement the option in the template formatting logic, or
- remove the option from the public API before shipping the release

## Related files

- src/config/options.ts
- src/features/printers/printers.ts
- README.md
