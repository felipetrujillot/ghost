import { promisify } from 'util'
import { exec as execCallback } from 'child_process'
const exec = promisify(execCallback)

/**
 *
 */
export const execShowFiles = async () => {
  const command = 'ls -la'
  const { stdout, stderr } = await exec(command)
  if (stderr) {
    throw new Error(`Command stderr: ${stderr}`)
  }

  return stdout
}

/**
 *
 */
export const listPm2 = async () => {
  const command = 'pm2 status'
  const { stdout, stderr } = await exec(command)
  if (stderr) {
    throw new Error(`Command stderr: ${stderr}`)
  }

  return stdout
}

console.log(listPm2())
