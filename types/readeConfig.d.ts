import Moment from 'moment'
import Path from 'path'
import GetProBasePath from './getProBasePath.d.ts'

declare interface DeproConfig {
  host: string
  port: number
  username: string
  password: string
  baseDir: string
  basePath: string
  buildPath: string
  useBak: boolean
  developers: string
}

declare interface Server {
  host: string,
  port: number,
  username: string,
  password: string
}

declare const moment: Moment
declare const resolve: Path.PlatformPath.resolve

declare const DeproConfig: DeproConfig
declare const basePath: GetProBasePath

declare const baseDir: string
declare const basePath: string
declare const buildOrder: string
declare const buildPath: string
declare const bakDirName: string
declare const userName: string
declare const useGitPull: boolean
declare const gitPath: string
