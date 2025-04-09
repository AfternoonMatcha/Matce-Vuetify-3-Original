import request from "../utils/request";

// 登录与注册 ///////////////////////////////////////////////

// 登录
export const login = (query) => {
    return request({
        url: "/auth/login",
        method: "post",
        data: query,
    })
}

// 注册
export const register = (query) => {
    return request({
        url: '/system/user',
        data: query,
        method: 'post'
    })
}

// 获取部门列表
export const getDeptList = (query) => {
    return request({
        url: '/system/dept/list',
        params: query,
        method: 'get'
    })
}

// 获取用户配置文件
export const getUserProfile = () => {
    return request({
        url: "/system/user/profile",
        method: "get"
    })
}

// 根据字典类型查询字典数据信息
export const getDict = (dictType) => {
    return request({
        url: "/system/dict/data/type/" + dictType,
        method: "get"
    })
}

// 单个文件上传
export const fileUpload = (query) => {
    return request({
        url: "/system/oss/upload",
        method: "post",
        headers: {
            "Content-Type": "multipart/form-data"
        },
        data: query
    })
}