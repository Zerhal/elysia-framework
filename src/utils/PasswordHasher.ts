import { createHash, createHmac } from 'crypto'

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
   * @return {string} The hashed password in the format "salt:hash".
   */
  static hashPassword(password: string): string {
    const salt = createHash('sha256')
      .update(Date.now().toString())
      .digest('hex')
      .substr(0, 16)
    const hash = createHmac(
      PasswordHasher.HASH_DIGEST,
      PasswordHasher.getSecret(),
    )
      .update(password + salt)
      .digest('hex')

    return `${salt}:${hash}`
  }

  /**
   * Verifies if the provided password matches the stored password.
   *
   * @param {string} storedPassword - The stored password in the format "salt:hash".
   * @param {string} providedPassword - The password provided by the user.
   * @return {boolean} Returns true if the provided password matches the stored password, false otherwise.
   */
  static verifyPassword(
    storedPassword: string,
    providedPassword: string,
  ): boolean {
    const [salt, storedHash] = storedPassword.split(':')
    const hash = createHmac(
      PasswordHasher.HASH_DIGEST,
      PasswordHasher.getSecret(),
    )
      .update(providedPassword + salt)
      .digest('hex')

    return storedHash === hash
  }
}
