import { randomBytes, pbkdf2Sync } from 'crypto'

export class PasswordHasher {
  private static readonly HASH_ITERATIONS = 10000
  private static readonly HASH_KEYLEN = 64
  private static readonly HASH_DIGEST = 'sha512'

  /**
   * Retrieves the secret value from the environment variables.
   *
   * @return {string} The secret value.
   * @throws {Error} If the PASSWORD_HASH_SECRET environment variable is not set.
   */
  private static getSecret(): string {
    const secret = process.env.PASSWORD_HASH_SECRET
    if (!secret) {
      throw new Error(
        'PASSWORD_HASH_SECRET is not set in environment variables',
      )
    }
    return secret
  }

  /**
   * Hashes a password using a salt and a cryptographic hash function.
   *
   * @param {string} password - The password to be hashed.
   * @return {string} The hashed password in the format "iterations:salt:hash".
   */
  static hashPassword(password: string): string {
    const salt = randomBytes(16).toString('hex')
    const hash = pbkdf2Sync(
      password,
      salt,
      PasswordHasher.HASH_ITERATIONS,
      PasswordHasher.HASH_KEYLEN,
      PasswordHasher.HASH_DIGEST,
    ).toString('hex')

    return `${PasswordHasher.HASH_ITERATIONS}:${salt}:${hash}`
  }

  /**
   * Verifies if the provided password matches the stored password.
   *
   * @param {string} storedPassword - The stored password in the format "iterations:salt:hash".
   * @param {string} providedPassword - The password provided by the user.
   * @return {boolean} Returns true if the provided password matches the stored password, false otherwise.
   */
  static verifyPassword(
    storedPassword: string,
    providedPassword: string,
  ): boolean {
    const [iterations, salt, storedHash] = storedPassword.split(':')
    const hash = pbkdf2Sync(
      providedPassword,
      salt,
      parseInt(iterations, 10),
      PasswordHasher.HASH_KEYLEN,
      PasswordHasher.HASH_DIGEST,
    ).toString('hex')

    return storedHash === hash
  }
}