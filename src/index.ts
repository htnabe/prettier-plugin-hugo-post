import { options } from '@/config/options';
import { languages } from '@/config/languages';
import { parsers } from '@/parser/parse-hugo-post';
import { printers } from '@/printer/print-hugo-post';

export { parsers } from '@/parser/parse-hugo-post';
export { printers } from '@/printer/print-hugo-post';

export default {
  languages,
  parsers,
  printers,
  options,
};
