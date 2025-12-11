// application entry point
// run this file to start the server
// import the app from server.ts if you only need the express instance (e.g., for testing or serverless environments)

import consoleScreen from './lib/utils/console.util'
import { env } from './lib/utils/env.util'
import { app } from './server'

const port = env.PORT
const environment = env.NODE_ENV
console.log(environment)

app.listen(port, () => {
  consoleScreen(Number(port), environment)
})
