import type { SupportLanguage } from 'prettier';

// Plugin metadata
export const languages: SupportLanguage[] = [
  {
    name: 'Hugo Post',
    parsers: ['hugo-post'],
    extensions: ['.md', '.hugo'],
    filenames: [],
  },
];
