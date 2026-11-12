/**
 * Format YAML front matter using Prettier
 */
export async function formatYaml(yamlContent: string, options: any): Promise<string> {
  try {
    // Use dynamic import for ES modules
    const { format } = await import('prettier');
    const result = await format(yamlContent, {
      ...options,
      parser: 'yaml',
    });
    return result.trim();
  } catch {
    // Fallback to basic cleanup if Prettier fails
    return yamlContent.trim();
  }
}
