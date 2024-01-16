import { createHash } from 'crypto'
import { readFile } from 'fs/promises'

export async function getFileSha1(path: string): Promise<string> {
  const sha1 = createHash('sha1')
  const targetBuffer = await readFile(path)
  sha1.update(targetBuffer)
  return sha1.digest('hex')
}
