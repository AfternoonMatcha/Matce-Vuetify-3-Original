import request from "../utils/request";

//压缩包导出
export const getZip = (data) => {
    return request({
        method: 'GET',
        url: '/main/getZip?year=' + data
    })
}