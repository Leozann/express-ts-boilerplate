import { swaggerSecurity } from '../setup/security.swagger'
import { userSchemas } from './schemas/users.schemas'
import { roleSchemas } from './schemas/roles.schemas'
import { commonSchemas } from './schemas/common.schemas'

// optional, if you have them later
// import { userParameters } from './parameters/user.parameters'
export const components = {
  securitySchemes: {
    ...swaggerSecurity,
  },

  schemas: {
    ...userSchemas,
    ...roleSchemas,
    ...commonSchemas,
  },

  // parameters: {
  //   ...userParameters,
  // },
}
