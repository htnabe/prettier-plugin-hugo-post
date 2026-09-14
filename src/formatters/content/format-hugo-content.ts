import { ensureProperBlockSpacing } from './block-spacing';
import { formatInlineShortcodes } from './shortcode/inline-shortcode';
import {
  protectMultilineShortcodes,
  restoreMultilineShortcodes,
} from './shortcode/multiline-shortcode';

/**
 * Format Hugo content (markdown + templates)
 * @param content The Hugo content to format, including markdown and templates
 * @param options Prettier formatting options
 * @returns The formatted Hugo content as a string
 */
export async function formatHugoContent(content: string, options: any): Promise<string> {
  const protectedShortcodes = protectMultilineShortcodes(content);

  // First, format all Hugo templates with regex
  content = formatHugoTemplates(protectedShortcodes.content);

  // Then format as markdown using Prettier
  try {
    const { format } = await import('prettier');
    const result = await format(content, {
      ...options,
      parser: 'markdown',
    });
    return restoreMultilineShortcodes(result.trim(), protectedShortcodes.shortcodes);
  } catch {
    // Fallback to unformatted content
    return restoreMultilineShortcodes(content.trim(), protectedShortcodes.shortcodes);
  }
}

/**
 * Format Hugo templates manually using regex
 * @param content The Hugo content to format, including markdown and templates
 * @returns The formatted Hugo content as a string
 */
function formatHugoTemplates(content: string): string {
  try {
    content = formatInlineShortcodes(content);

    // Ensure block-level control structures have proper line breaks to prevent
    // markdown formatter from treating them as part of list items or other constructs
    content = ensureProperBlockSpacing(content);

    return content;
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Critical error in formatHugoTemplates: ${error.message}`);
    } else {
      console.error(`Critical error in formatHugoTemplates with unknown error:`, error);
    }
    return content; // Return original content on critical failure
  }
}
