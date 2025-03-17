import bcrypt from 'bcrypt'

const hashPasswordBcrypt = async (plaintextPassword: string) => {
  // Generate a salt
  const salt = await bcrypt.genSalt(10)
  // Hash the password with the generated salt
  const hash = await bcrypt.hash(plaintextPassword, salt)
  // Return the hashed password
  return hash
}

const hashPassword = await hashPasswordBcrypt('jocilinda123')

console.log(hashPassword)
