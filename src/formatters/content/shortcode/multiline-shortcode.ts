import { formatShortcodeFromTokens, tokenizeShortcode } from './tokenizer';

export interface ProtectedMultilineShortcode {
  token: string;
  formatted: string;
}

/**
 * Replace multiline shortcode blocks with single-line placeholders so the
 * Markdown formatter cannot reflow their internal indentation.
 */
export function protectMultilineShortcodes(content: string): {
  content: string;
  shortcodes: ProtectedMultilineShortcode[];
} {
  const shortcodes: ProtectedMultilineShortcode[] = [];
  let tokenPrefix = 'HUGOMULTILINESHORTCODE';

  while (content.includes(tokenPrefix)) {
    tokenPrefix += '_';
  }

  const protectDelimiter = (text: string, open: '<' | '%', close: '>' | '%') => {
    const escapedOpen = open === '<' ? '<' : '%';
    const escapedClose = close === '>' ? '>' : '%';
    const pattern = new RegExp(
      `^([ \\t]*)\\{\\{${escapedOpen}((?:(?!${escapedClose}\\}\\})[^\\r\\n])*)\\r?\\n([\\s\\S]*?)^[ \\t]*${escapedClose}\\}\\}[ \\t]*$`,
      'gm'
    );

    return text.replace(
      pattern,
      (match, openingIndent: string, openingLine: string, body: string) => {
        try {
          const token = `${tokenPrefix}${shortcodes.length}`;
          const formatted = formatMultilineShortcode(openingIndent, open, close, openingLine, body);
          shortcodes.push({ token, formatted });
          return `${openingIndent}{{< ${token} >}}`;
        } catch (error) {
          if (error instanceof Error) {
            console.warn(
              `Failed to protect multiline shortcode: ${match}. Error: ${error.message}`
            );
          } else {
            console.warn(`Failed to protect multiline shortcode: ${match}. Unknown error:`, error);
          }
          return match;
        }
      }
    );
  };

  content = protectDelimiter(content, '<', '>');
  content = protectDelimiter(content, '%', '%');

  return { content, shortcodes };
}

function formatMultilineShortcode(
  openingIndent: string,
  open: '<' | '%',
  close: '>' | '%',
  openingLine: string,
  body: string
): string {
  const openingTokens = tokenizeShortcode(openingLine);
  const formattedOpening = formatShortcodeFromTokens(openingTokens);
  const formattedBody = body
    .replace(/[ \t]*(?:\r?\n[ \t]*)*$/, '')
    .split(/\r?\n/)
    .map(line => {
      const leadingWhitespace = line.match(/^[ \t]*/)?.[0] ?? '';
      const lineTokens = tokenizeShortcode(line.slice(leadingWhitespace.length));
      return leadingWhitespace + formatShortcodeFromTokens(lineTokens);
    });
  const openDelimiter = open === '%' ? '{{%' : '{{<';
  const closeDelimiter = close === '%' ? '%}}' : '>}}';

  return [
    `${openingIndent}${openDelimiter} ${formattedOpening}`,
    ...formattedBody,
    `${openingIndent}${closeDelimiter}`,
  ].join('\n');
}

/**
 * Replace placeholder tokens with their pre-formatted multiline shortcode content.
 */
export function restoreMultilineShortcodes(
  content: string,
  shortcodes: ProtectedMultilineShortcode[]
): string {
  for (const { token, formatted } of shortcodes) {
    const placeholderLine = new RegExp(`^[ \\t]*\\{\\{< ${token} >\\}\\}[ \\t]*$`, 'gm');
    content = content.replace(placeholderLine, formatted);
  }

  return content;
}
