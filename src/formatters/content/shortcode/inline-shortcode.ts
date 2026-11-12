import { formatTemplateVariable } from '../template-expression/format-template-variable';
import { formatShortcodeFromTokens, tokenizeShortcode } from './tokenizer';

/**
 * Format inline Hugo template syntax: shortcodes, variables and comments.
 */
export function formatInlineShortcodes(content: string): string {
  content = formatInlineShortcodeTags(content);
  content = formatTemplateVariables(content);
  content = formatComments(content);
  return content;
}

function formatInlineShortcodeTags(content: string): string {
  // Handle both {{< >}} and {{% %}} shortcodes with tokenization
  return content.replace(/(\{\{[<%]\s*)(.*?)(\s*[>%]\}\})/g, (match, open, inner, _close) => {
    try {
      const trimmedInner = inner.trim();
      if (trimmedInner.startsWith('/*') && trimmedInner.endsWith('*/')) {
        return match;
      }

      // Remove self-closing slash
      inner = inner.replace(/\/$/, '');

      // Tokenize and reformat
      const tokens = tokenizeShortcode(inner);
      const formatted = formatShortcodeFromTokens(tokens);

      // Determine proper delimiters (preserve < vs %)
      const isPercent = open.includes('%');
      const openDelim = isPercent ? '{{% ' : '{{< ';
      const closeDelim = isPercent ? ' %}}' : ' >}}';

      return openDelim + formatted + closeDelim;
    } catch (error) {
      if (error instanceof Error) {
        console.warn(`Failed to format shortcode: ${match}. Error: ${error.message}`);
      } else {
        console.warn(`Failed to format shortcode: ${match}. Unknown error:`, error);
      }
      return match; // Return original on error
    }
  });
}

function formatTemplateVariables(content: string): string {
  // Handle regular Hugo variables: {{ .Variable }}
  return content.replace(/\{\{(?!<|%|\/\*)\s*([^}]*?)\s*\}\}/g, (match, inner: string) => {
    try {
      return formatTemplateVariable(match, inner);
    } catch (error) {
      if (error instanceof Error) {
        console.warn(`Failed to format variable: ${match}. Error: ${error.message}`);
      } else {
        console.warn(`Failed to format variable: ${match}. Unknown error:`, error);
      }
      return match; // Return original on error
    }
  });
}

function formatComments(content: string): string {
  // Handle comments: {{/* comment */}}
  return content.replace(/\{\{\/\*\s*([\s\S]*?)\s*\*\/\}\}/g, (match, inner) => {
    try {
      return `{{/* ${inner.trim()} */}}`;
    } catch (error) {
      if (error instanceof Error) {
        console.warn(`Failed to format comment: ${match}. Error: ${error.message}`);
      } else {
        console.warn(`Failed to format comment: ${match}. Unknown error:`, error);
      }
      return match; // Return original on error
    }
  });
}
