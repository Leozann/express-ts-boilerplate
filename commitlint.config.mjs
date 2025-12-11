/**
 * Commitlint Configuration
 * ------------------------
 * controls commit message formatting using Conventional Commits.
 *
 * scope rule guide:
 * - "always" → scope must be empty  (e.g., "feat: add login")     → scopes NOT allowed
 * - "never"  → scope must NOT be empty (e.g., "feat(api): fix")   → scopes REQUIRED
 * - to make scope optional, disable the rule:
 *      'scope-empty': [0, 'always']
 *
 * type rule:
 * - restricts allowed commit types for consistency (feat, fix, chore, etc.)
 *
 * subject rule:
 * - ensures the commit has a descriptive message after the type/scope.
 *
 * this setup currently disallows scopes (boilerplate-friendly),
 * but can be easily switched later if your project grows.
 */

export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'scope-empty': [2, 'always'],
    'type-enum': [2, 'always', ['feat', 'fix', 'chore', 'refactor', 'docs', 'test']], // only allow these types
    'subject-empty': [2, 'never'], // subject should not be empty 
  },
}
