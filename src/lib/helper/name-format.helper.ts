export const snakeCase = (str: string) =>
  str
    .replace(/([A-Z])/g, '_$1')
    .replace(/[-\s]+/g, '_')
    .toLowerCase()
    .replace(/^_/, '')

export const camelCase = (str: string) =>
  str.replace(/[-_\s]+(.)?/g, (_, c) => (c ? c.toUpperCase() : '')).replace(/^(.)/, (m) => m.toLowerCase())

export const pascalCase = (str: string) => camelCase(str).replace(/^(.)/, (m) => m.toUpperCase())
