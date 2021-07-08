import Util from 'util'
import { EventEmitter } from 'events'
import { Client } from 'ssh2'
import Fs from 'fs'
import Server from './readeConfig'

declare const util: Util
declare const events: Events
declare const Client: Client
declare const fs: Fs
declare const server: Server
declare const baseDir: string
declare const basePath: string
declare const buildPath: string
declare const bakDirName: string
declare const control: EventEmitter

type Then = (err: any, buf: string) => void
type callBack = () => void

declare function doConnect (server: Server, then?: Then): void
declare function doShell (server: Server, cmd: string, then?: Then): void
declare function doGetFileAndDirList (localDir: string, dirs: any[], files: any[]): void
declare function Control (): void
declare function doUploadFile (server: Server, localPath: any, remotePath: any, then?: callBack): void
declare function doUploadDir (server: Server, localDir: string, remoteDir: string, then?: callBack): void
declare function autoDep (): void