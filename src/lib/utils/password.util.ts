import argon2 from 'argon2'

export async function hashPassword(password: string): Promise<string> {
  return await argon2.hash(password, {
    type: argon2.argon2id, // hybrid of argon2i and argon2d; modern replacement for bcrypt
    memoryCost: 2 ** 16, // recommended secure default
    timeCost: 3,
    parallelism: 1,
  })
}

export async function verifyPassword(hashed: string, plain: string): Promise<boolean> {
  return await argon2.verify(hashed, plain)
}
