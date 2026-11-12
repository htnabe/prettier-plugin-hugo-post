/**
 * Format control structures like if, range, with
 */
export function formatControlStructure(expr: string): string {
  // Normalize whitespace and preserve structure
  return expr.trim().replace(/\s+/g, ' ');
}

/**
 * Format regular expressions with proper pipe spacing and function calls
 */
export function formatExpression(expr: string): string {
  // Handle complex expressions with pipes
  if (expr.includes('|')) {
    return formatPipeExpression(expr);
  }

  // Handle function calls with multiple arguments
  if (expr.includes(' ')) {
    return formatFunctionCall(expr);
  }

  // Simple variable access
  return expr.trim();
}

/**
 * Format pipe expressions with proper spacing
 */
export function formatPipeExpression(expr: string): string {
  return expr
    .split('|')
    .map(part => formatFunctionCall(part.trim())) // Format each part as a function call
    .filter(part => part) // Remove empty parts
    .join(' | ');
}

/**
 * Format function calls with proper argument spacing
 */
export function formatFunctionCall(expr: string): string {
  // Handle quoted strings and preserve them
  const parts = [];
  let current = '';
  let inQuotes = false;
  let quoteChar = '';

  for (let i = 0; i < expr.length; i++) {
    const char = expr[i];

    if ((char === '"' || char === "'") && !inQuotes) {
      inQuotes = true;
      quoteChar = char;
      current += char;
    } else if (char === quoteChar && inQuotes) {
      inQuotes = false;
      current += char;
      parts.push(current.trim());
      current = '';
    } else if (char === ' ' && !inQuotes) {
      if (current.trim()) {
        parts.push(current.trim());
        current = '';
      }
    } else {
      current += char;
    }
  }

  if (current.trim()) {
    parts.push(current.trim());
  }

  return parts.join(' ');
}
