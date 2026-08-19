import type { Options as PrettierOptions, Plugin } from 'prettier';
import { format } from 'prettier';
import plugin from '../src/index.js';

const prettierPlugin = plugin as unknown as Plugin;

export interface FormatTestCase {
  name: string;
  input: string;
  options?: PrettierOptions;
  shouldContain?: string[];
  shouldNotContain?: string[];
}

export interface PerformanceTestCase {
  name: string;
  generateInput: () => string;
  maxTime: number;
  shouldContain?: string[];
}

export interface ErrorRecoveryTestCase {
  name: string;
  input: string;
  shouldContain?: string[];
}

// Prettier 実行ヘルパー ----------------------------------------------

export async function formatCode(input: string, options: PrettierOptions = {}): Promise<string> {
  const { parser: _parser, plugins: _plugins, ...restOptions } = options;

  return await format(input, {
    ...restOptions,
    parser: 'hugo-post',
    plugins: [prettierPlugin],
  });
}

// Table-driven formatting tests --------------------------------------

export function runTableDrivenTests(testCases: FormatTestCase[]): void {
  testCases.forEach(({ name, input, options = {}, shouldContain = [], shouldNotContain = [] }) => {
    test(name, async () => {
      const result = await formatCode(input, options as PrettierOptions);

      shouldContain.forEach(expected => {
        expect(result).toContain(expected);
      });

      shouldNotContain.forEach(notExpected => {
        expect(result).not.toContain(notExpected);
      });
    });
  });
}

// Performance tests ---------------------------------------------------

export function runPerformanceTests(testCases: PerformanceTestCase[]): void {
  testCases.forEach(({ name, generateInput, maxTime, shouldContain = [] }) => {
    test(name, async () => {
      const input = generateInput();

      const start = performance.now();
      const result = await formatCode(input, {} as PrettierOptions);
      const end = performance.now();

      expect(end - start).toBeLessThan(maxTime);

      shouldContain.forEach(expected => {
        expect(result).toContain(expected);
      });
    });
  });
}

// Error recovery tests ------------------------------------------------

export function runErrorRecoveryTests(testCases: ErrorRecoveryTestCase[]): void {
  testCases.forEach(({ name, input, shouldContain = [] }) => {
    test(name, async () => {
      const result = await formatCode(input);

      shouldContain.forEach(expected => {
        expect(result).toContain(expected);
      });
    });
  });
}
