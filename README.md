### 前端页面自动化部署包

此包为了方便自己自动部署测试环境的时候使用

适用于 nginx 的部署环境

#### 安装命令

`npm install depro -D`

安装完成时,将自动在项目根目录下创建 `depro.config.json` 配置文件

并且在 `package.json` 文件中的 `scripts` 字段下新增 `"autoDep": "gitpull && npm run build:pro && depro"` 脚本命令

#### 运行命令

在项目根目录下运行 `npm run autoDep`

脚本将首先使用 `git pull` 命令拉取最新的项目代码

然后使用 `npm run build:pro` 打包命令

最后使用上传脚本自动完成上传至部署服务器

#### 配置说明

`depro.config.json` 内的配置字段

```javascript
{
    "host": "",               // 部署服务器的 IP 地址
    "port": 22,               // ssh 服务的端口号, 默认无需修改
    "username": "",           // 部署服务器的账户名
    "password": "",           // 部署服务器的账户密码
    "baseDir": "",            // 项目目录名称
    "basePath": "",           // 项目部署到服务器的目录
    "buildPath": "",          // 本地项目编译后的文件目录
    "useBak": false,          // 是否开启备份,默认为 false
    "developers": ""          // 开发人员姓名缩写,用于备份文件名称的创建
    "useGitPull": false       // 是否允许自动 git pull, 默认为不允许
    "gitPath": ""             // git pull 的地址, 可以不写, 不写默认使用 git pull
}
```

#### 注意事项

`depro.config.json` 文件内 `value` 值可以拷贝复制进去,但是请不要全部拷贝,全部拷贝会破坏json文件内格式,导致 `JSON.parse` 解析错误

`depro.config.json` 文件内不能写注释

`package.json` 中的 `scripts` 字段下的 `"autoDep": "gitpull && npm run build:pro && depro"` 命令

`npm run build:pro` 此段命令为默认打包命令,请手动修改为你们所使用的打包命令