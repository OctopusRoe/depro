import Fs from 'fs'

declare const fs: Fs
declare const text: {
  host: string
  port: number
  username: string
  password: string
  baseDir: string
  basePath: string
  buildOrder?: string
  buildPath: string
  useBak: boolean
}

declare function createConfig (): void