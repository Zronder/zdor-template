# XXXX 服务端程序

-   网络框架: Nest.js
-   数据库: MySQL 5.7 + [Prisma](https://www.prisma.io/)

# 工程配置效率提升说明

-   快捷键说明

| 快捷键                | 说明                   |
| --------------------- | ---------------------- |
| option + shift + F    | 快速格式化代码         |
| command + control + T | 添加函数注释           |
| command + control + I | 添加文件注释           |
| option + shift + O    | 自动删除头部不必要引用 |

# 数据库表说明

## XXXX 表: xxxx

| 字段 | 中文名 | 说明    |
| ---- | ------ | ------- |
| id   | id     | 主键 id |

# 配置文件

## .env 文件命名说明

| 文件名          | 说明     |
| --------------- | -------- |
| .env            | 开发环境 |
| .env.staging    | 测试环境 |
| .env.production | 正式环境 |

## .env 文件配置字段说明

| 字段         | 类型    | 说明             | 备注 |
| ------------ | ------- | ---------------- | ---- |
| DATABASE_URL | string  | mysql 连接配置   |      |
| SWAGGER      | boolean | 是否启用接口文档 |      |
| LOGGER       | string  | 日志路径         |      |
| PORT         | number  | 服务端口         |      |

# 部署

```
    cd [rootDir]
    pnpm install
    pnpm db:gen
    pnpm build
    pm2 start ./ecosystem.config.js --env [env]
```
