import ChildProcess from 'child_process'
import GetProBasePath from './getProBasePath.d.ts'

declare const childProcess: ChildProcess
declare const gitHref: string
declare const basePath: GetProBasePath
declare function pullGit (): void