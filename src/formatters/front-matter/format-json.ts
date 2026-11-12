/**
 * Format JSON front matter using Prettier's built-in JSON parser
 */
export async function formatJson(jsonContent: string, options: any): Promise<string> {
  try {
    // Use dynamic import for ES modules
    const { format } = await import('prettier');
    const result = await format(jsonContent, {
      ...options,
      parser: 'json',
    });
    return result.trim();
  } catch (error) {
    // Fallback to basic cleanup if Prettier fails
    if (error instanceof Error) {
      console.warn('JSON formatting failed:', error.message);
    } else {
      console.warn('JSON formatting failed with unknown error:', error);
    }
    return jsonContent.trim();
  }
}
