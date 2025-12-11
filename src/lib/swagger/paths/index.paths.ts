import { defaultPaths } from './default.paths'
import { userPaths } from './users.paths'
import { rolePaths } from './roles.paths'

export const paths = {
  ...defaultPaths,
  ...userPaths,
  ...rolePaths,
}
