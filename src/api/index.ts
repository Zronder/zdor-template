import { request } from '@utils/index'

/**
 * @description: 提交扫描任务（上传excel）
 * @param {any} data
 * @return {*}
 */
export const fetchDemo = (data: any) => {
    return request({
        url: 'xxx/xxx/xxx',
        data,
        method: 'POST',
    })
}
