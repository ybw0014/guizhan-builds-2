import { Writable } from 'stream'

export class MultiStream extends Writable {
  private streams: Writable[]

  constructor(streams: Writable[]) {
    super()
    this.streams = streams
  }

  _write(chunk: any, encoding: BufferEncoding, callback: (error?: Error | null) => void) {
    for (const stream of this.streams) {
      stream.write(chunk, encoding)
    }
    callback()
  }
}
