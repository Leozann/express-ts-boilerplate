// this script for setup repository; e.g., setting up environment variables, folders, etc.

import fs from 'fs'
import path from 'path'

const envContents: Record<string, string> = {
  '.env.development': `NODE_ENV=development
PORT=3000
POSTGRES_URL= # fill in your development database URL
JWT_SECRET= # your_secret_key

ENABLE_COMPRESSION=true
`,
  '.env.staging': `NODE_ENV=staging
PORT=4000
POSTGRES_URL= # fill in your staging database URL

ENABLE_COMPRESSION=true
`,
  '.env.production': `NODE_ENV=production
PORT=8080
POSTGRES_URL= # fill in your production database URL

ENABLE_COMPRESSION=true
`,
  '.env.test': `NODE_ENV=test
PORT=9999
POSTGRES_URL=postgres://testdb/mock
JWT_SECRET=test_secret
`,
}

Object.entries(envContents).forEach(([file, content]) => {
  const filePath = path.join(process.cwd(), file)
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, content, 'utf8')
    console.log(`${file} created`)
  } else {
    console.log(`${file} already exists, skipping`)
  }
})
