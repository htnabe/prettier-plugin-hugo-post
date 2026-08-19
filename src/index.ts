import { options } from './config/options';
import { languages } from './config/languages';
import { printers } from './features/printers/printers';
import type { HugoPostNode } from './types/hugo-post-node';

export { printers } from './features/printers/printers';

export const parsers = {
  'hugo-post': {
    parse: parseHugoPost,
    astFormat: 'hugo-post-ast',
    locStart: (_node: HugoPostNode) => 0,
    locEnd: (node: HugoPostNode) => node.source?.length || 0,
  },
};

/**
 * Parse Hugo post content
 */
function parseHugoPost(text: string) {
  const parts = splitFrontMatter(text);

  return {
    type: 'hugo-post',
    source: text,
    frontMatter:
      parts.frontMatter !== null
        ? {
            content: parts.frontMatter,
            delimiter: parts.delimiter,
          }
        : null,
    content: parts.content || '',
  };
}

/**
 * Split text into front matter and content
 */
function splitFrontMatter(text: string): {
  frontMatter: string | null;
  delimiter: string | null;
  content: string;
} {
  // YAML front matter
  const yamlMatch = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (yamlMatch) {
    return {
      frontMatter: yamlMatch[1],
      delimiter: 'yaml',
      content: yamlMatch[2],
    };
  }

  // TOML front matter
  const tomlMatch = text.match(/^\+\+\+\r?\n([\s\S]*?)\r?\n\+\+\+\r?\n([\s\S]*)$/);
  if (tomlMatch) {
    return {
      frontMatter: tomlMatch[1],
      delimiter: 'toml',
      content: tomlMatch[2],
    };
  }

  // JSON front matter
  const jsonMatch = text.match(/^{\r?\n([\s\S]*?)\r?\n}\r?\n([\s\S]*)$/);
  if (jsonMatch) {
    return {
      frontMatter: `{\n${jsonMatch[1]}\n}`,
      delimiter: 'json',
      content: jsonMatch[2],
    };
  }

  // No front matter
  return {
    frontMatter: null,
    delimiter: null,
    content: text,
  };
}

export default {
  languages,
  parsers,
  printers,
  options,
};
