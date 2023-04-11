import axios, { AxiosInstance } from 'axios'

const { NODE_ENV } = process.env

const baseURL = window.location.origin
const proxyPath = '/'
const getLoginPath = (localDomain: string): string => `${localDomain + proxyPath}`

const errorHandler = (redirect: string): void => {
    if (NODE_ENV === 'development') {
        window.location.href = getLoginPath(window.location.origin)
    } else {
        window.location.href = redirect
    }
}

const instance: AxiosInstance = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'X-Requested-With': 'xmlhttprequest',
    },
    withCredentials: true, // header头开启cookie信息
})

instance.interceptors.request.use(
    config => {
        const { method, data, url } = config
        if (method === 'get') {
            // get请求将data转换成为query
            const query = Object.keys(data).reduce((pre: string, cur: any, ind: number) => {
                const str = `${cur}=${data[cur]}`
                return pre + str + '&'
            }, '?')
            delete config.data
            config.url = url + query.replace(/&$/, '')
        }
        return config
    },
    error => Promise.reject(error),
)

instance.interceptors.response.use(
    response => {
        const { status, data } = response
        if (status === 200 && data?.code === 0) {
            return data
        }
        return Promise.reject(data.message) // 状态码非正常即报错
    },
    error => {
        const { status, data } = error.response || {}
        if (status && status === 401) {
            return errorHandler(data.redirect)
        }
        Promise.reject(error)
    },
)

export { instance as request }
