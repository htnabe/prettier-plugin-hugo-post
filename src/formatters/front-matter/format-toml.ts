/**
 * Format TOML front matter using prettier-plugin-toml
 */
export async function formatToml(tomlContent: string, options: any): Promise<string> {
  try {
    // Use dynamic import for ES modules
    const { format } = await import('prettier');
    const result = await format(tomlContent, {
      ...options,
      parser: 'toml',
      plugins: ['prettier-plugin-toml'],
    });
    return result.trim();
  } catch (error) {
    // Fallback to basic cleanup if Prettier fails
    if (error instanceof Error) {
      console.warn('TOML formatting failed:', error.message);
    } else {
      console.warn('TOML formatting failed with unknown error:', error);
    }
    return tomlContent.trim();
  }
}
