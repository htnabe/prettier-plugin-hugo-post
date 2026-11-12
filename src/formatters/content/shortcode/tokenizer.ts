export interface ShortcodeToken {
  type: 'quoted' | 'unquoted';
  value: string;
}

/**
 * Tokenization-based Hugo shortcode formatter
 * Treats shortcode content as a mini-language to parse properly
 */
export function tokenizeShortcode(content: string): ShortcodeToken[] {
  const tokens: ShortcodeToken[] = [];
  let i = 0;
  const maxIterations = Math.max(1000, content.length * 2); // Safety limit
  let iterations = 0;

  while (i < content.length) {
    iterations++;
    if (iterations > maxIterations) {
      console.warn(
        `Tokenizer stopped at position ${i} to prevent infinite loop. Content: ${content.substring(i, i + 20)}...`
      );
      break;
    }

    const char = content[i];

    // Skip whitespace
    if (/\s/.test(char)) {
      i++;
      continue;
    }

    // Handle quoted strings (with escape support)
    if (char === '"' || char === "'") {
      const quote = char;
      let value = quote;
      i++; // Skip opening quote

      while (i < content.length && iterations < maxIterations) {
        iterations++;
        const current = content[i];

        if (current === '\\' && i + 1 < content.length) {
          // Handle escaped characters
          value += current + content[i + 1];
          i += 2;
        } else if (current === quote) {
          // Found closing quote
          value += current;
          i++;
          break;
        } else {
          value += current;
          i++;
        }
      }

      // Trim whitespace inside quotes but preserve escaped content
      const inner = value.slice(1, -1); // Remove quotes
      const trimmed = inner.replace(/^\s+|\s+$/g, ''); // Trim but preserve escapes
      tokens.push({ type: 'quoted', value: quote + trimmed + quote });
      continue;
    }

    // Handle unquoted tokens (parameter names, shortcode name, etc.)
    let token = '';
    while (i < content.length && !/[\s"']/.test(content[i]) && iterations < maxIterations) {
      iterations++;
      token += content[i];
      i++;
    }

    if (token) {
      tokens.push({ type: 'unquoted', value: token });
    }
  }

  return tokens;
}

export function formatShortcodeFromTokens(tokens: ShortcodeToken[]): string {
  if (tokens.length === 0) return '';

  const result = [];

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    const nextToken = tokens[i + 1];

    // Add the token value
    result.push(token.value);

    // Determine if we need a space after this token
    if (nextToken) {
      // Always add space between tokens, with special cases:

      // Case 1: Current token ends with = (parameter assignment)
      if (token.value.endsWith('=')) {
        // No space between param= and "value"
        continue;
      }

      // Case 2: Next token starts with =
      if (nextToken.value.startsWith('=')) {
        // No space between param and =value
        continue;
      }

      // Case 3: Handle the "word followed by quote" case
      // If current token is unquoted word and next is quoted, add space
      if (token.type === 'unquoted' && nextToken.type === 'quoted') {
        result.push(' ');
        continue;
      }

      // Default: add space between tokens
      result.push(' ');
    }
  }

  return result.join('');
}
