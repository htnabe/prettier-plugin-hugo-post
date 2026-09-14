/**
 * Ensure block-level control structures have proper spacing to prevent
 * Prettier's markdown formatter from treating them as part of other constructs
 */
export function ensureProperBlockSpacing(content: string): string {
  // Split content into lines for analysis
  const lines = content.split('\n');
  const result = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const prevLine = i > 0 ? lines[i - 1] : '';
    const trimmedLine = line.trim();
    const trimmedPrevLine = prevLine.trim();

    // Check if this line is an end control that should be standalone
    const isEndControl = trimmedLine.match(/^\{\{\s*end\s*\}\}$/);
    const prevIsListItem = trimmedPrevLine.match(/^[-*+]\s/);

    // If previous line is a list item and current line is {{ end }},
    // add blank line to prevent markdown formatter from indenting the {{ end }}
    if (isEndControl && prevIsListItem) {
      result.push('');
      result.push(line);
      continue;
    }

    // GFM tables are terminated by a blank line. If a non-table line follows a
    // table row directly (no blank line in between), Prettier's markdown
    // formatter absorbs that line into the table as an extra single-cell row.
    // Insert a blank line to keep the following line (e.g. a Hugo shortcode
    // closing tag) outside of the table.
    const prevIsTableRow = isMarkdownTableRow(trimmedPrevLine);
    const currentIsTableRow = isMarkdownTableRow(trimmedLine);
    if (prevIsTableRow && trimmedLine !== '' && !currentIsTableRow) {
      result.push('');
      result.push(line);
      continue;
    }

    result.push(line);
  }

  return result.join('\n');
}

/**
 * Determine whether a trimmed line looks like a Markdown (GFM) table row.
 * This is intentionally conservative to avoid treating Go-template pipelines
 * (e.g. `{{ .Title | upper }}`) or YAML block scalars (`key: |`) as tables.
 */
function isMarkdownTableRow(trimmedLine: string): boolean {
  if (trimmedLine === '' || trimmedLine.startsWith('{{')) return false;
  // Most GFM table rows either start with '|' (Prettier's output) or contain
  // at least one pipe with surrounding spaces: "a | b".
  if (!(trimmedLine.startsWith('|') || /\s\|\s/.test(trimmedLine))) return false;
  const pipeCount = trimmedLine.split('|').length - 1;
  return pipeCount >= 2;
}
