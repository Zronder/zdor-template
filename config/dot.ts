import { config, DotenvConfigOutput } from 'dotenv'
import { resolve } from 'path'
const { NODE_ENV } = process.env

const envFile = NODE_ENV ? `.env.${NODE_ENV}` : '.env'
const envPath = resolve('.', envFile)
const { parsed }: DotenvConfigOutput = config({ path: envPath })

console.log('打印一下，查看读取的是哪个配置文件', envFile, NODE_ENV)

export const isProduction = NODE_ENV === 'production'

export const isStaging = NODE_ENV === 'staging'

export const LOGGER_PATH = resolve('.', parsed?.LOGGER)

export const isEnableSwagger = parsed?.SWAGGER === 'true'

export const PORT = parsed?.PORT

export default parsed
