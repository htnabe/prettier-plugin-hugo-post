import { formatControlStructure, formatExpression } from './format-expression';

/**
 * Enhanced template variable formatter inspired by @htnabe/prettier-plugin-go-template
 * Handles Go template syntax with better spacing and structure
 */
export function formatTemplateVariable(match: string, inner: string): string {
  // Check for whitespace control (- at start or end)
  const startControl = match.match(/^\{\{-/) ? '{{- ' : '{{ ';
  const endControl = match.match(/-\}\}$/) ? ' -}}' : ' }}';

  // Remove control characters from inner content
  inner = inner.replace(/^-\s*/, '').replace(/\s*-$/, '');

  // Handle different template constructs
  const formatted = formatTemplateExpression(inner.trim());

  return `${startControl}${formatted}${endControl}`;
}

/**
 * Format a template expression with proper spacing and structure
 */
export function formatTemplateExpression(expr: string): string {
  // Handle empty expressions
  if (!expr) return '';

  // Handle control structures (if, range, with, end, else, etc.)
  if (expr.match(/^\s*(if|range|with|block|define|template)\b/)) {
    return formatControlStructure(expr);
  }

  // Handle 'end' statements
  if (expr.match(/^\s*end\s*$/)) {
    return 'end';
  }

  // Handle 'else' statements
  if (expr.match(/^\s*else(\s+if\b)?/)) {
    return formatControlStructure(expr);
  }

  // Handle regular expressions (variables, functions, pipes)
  return formatExpression(expr);
}
