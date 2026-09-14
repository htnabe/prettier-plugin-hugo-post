import { formatHugoContent } from '../formatters/content/format-hugo-content';
import { formatJson } from '../formatters/front-matter/format-json';
import { formatToml } from '../formatters/front-matter/format-toml';
import { formatYaml } from '../formatters/front-matter/format-yaml';

export const printers = {
  'hugo-post-ast': {
    print: printHugoPost,
  },
};

/**
 * Print Hugo post content
 */
async function printHugoPost(path: any, options: any): Promise<string> {
  const node = path.getValue();
  const parts = [];

  // Format front matter
  if (node.frontMatter) {
    if (node.frontMatter.delimiter === 'yaml') {
      const formattedYaml = await formatYaml(node.frontMatter.content, options);
      parts.push(`---\n${formattedYaml}\n---`);
    } else if (node.frontMatter.delimiter === 'toml') {
      const formattedToml = await formatToml(node.frontMatter.content, options);
      parts.push(`+++\n${formattedToml}\n+++`);
    } else if (node.frontMatter.delimiter === 'json') {
      const formattedJson = await formatJson(node.frontMatter.content, options);
      parts.push(formattedJson);
    }
  }

  // Format content
  if (node.content && node.content.trim()) {
    const formattedContent = await formatHugoContent(node.content, options);
    parts.push(formattedContent);
  }

  return parts.join('\n\n');
}
