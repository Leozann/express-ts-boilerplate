export const color = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  green: '\x1b[32m',
  blue: '\x1b[34m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
}

export function colorMethod(method: string) {
  const m = method.toUpperCase()

  switch (m) {
    case 'GET':
      return `${color.green}${m}${color.reset}`
    case 'POST':
      return `${color.blue}${m}${color.reset}`
    case 'PUT':
      return `${color.yellow}${m}${color.reset}`
    case 'PATCH':
      return `${color.cyan}${m}${color.reset}`
    case 'DELETE':
      return `${color.red}${m}${color.reset}`
    default:
      return `${color.bold}${m}${color.reset}`
  }
}

export function colorStatus(code: number) {
  if (code >= 200 && code < 300) return `${color.green}${code}${color.reset}`
  if (code >= 300 && code < 400) return `${color.cyan}${code}${color.reset}`
  if (code >= 400 && code < 500) return `${color.yellow}${code}${color.reset}`
  return `${color.red}${code}${color.reset}`
}

export function httpPrefix() {
  return `${color.cyan}[HTTP]${color.reset}`
}
