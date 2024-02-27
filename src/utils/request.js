import axios from "axios";
// import { useTokenStore } from "../stores/token";

const request = axios.create({
    baseURL: '/api',
    timeout: 60000
})

// const request = axios.create({
//     // baseURL: 'http://' + domain + ':1337/api'
//     baseURL: (domain !== "matce.cn" ? 'http://' + domain + ':1337/' : 'https://' + domain + ':1338/') + "api"
// })

// request.interceptors.request.use((config) => {
//     const store = useTokenStore()
//     config.headers.Authorization = 'Bearer ' + store.token

//     return config
// })

// 添加响应拦截器
request.interceptors.response.use(
    response => {
        // 对响应数据做点什么
        return response;
    },
    error => {
        // 对响应错误做点什么
        alert("请求失败！" + error.message);
        return Promise.reject(error);
    }
);

export default request