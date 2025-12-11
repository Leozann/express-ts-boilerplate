import readline from 'readline'
import { env } from '@/lib/utils/env.util'

export function assertSafeEnvironment(actionName: string) {
  if (env.isProd || env.isStaging) {
    console.error(`\n❌ BLOCKED: "${actionName}" cannot run in ${env.NODE_ENV.toUpperCase()}\n`)
    process.exit(1)
  }
}

export async function promptConfirmation(message: string): Promise<void> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })

  const answer = await new Promise<string>((resolve) => rl.question(`${message} Type YES to continue: `, resolve))

  rl.close()

  if (answer.trim() !== 'YES') {
    console.log('❌ Operation cancelled.')
    process.exit(0)
  }
}
