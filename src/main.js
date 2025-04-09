import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { setupLayouts } from 'virtual:generated-layouts'
import generatedRoutes from 'virtual:generated-pages'
import App from './App.vue'
import pinia from './stores'
import vuetify from '@/plugins/vuetify'
import Vue3Toasity from 'vue3-toastify';
import { Icon } from '@iconify/vue';

import 'vue3-toastify/dist/index.css'

import t from "@/utils/MatceTools.js"; // JS 方法工具箱

const routes = setupLayouts(generatedRoutes)

// console.clear()
// t.logs('Routers', routes)
import config from "/package.json";
t.logTitle([
    "Matce-Vuetify-3-Original",
    "By: Matce",
    "Ver. " + config.version
]);

const router = createRouter({
    history: createWebHistory(),
    routes,
})

const app = createApp(App)
app.use(router)
app.use(pinia)
app.use(vuetify)
app.use(
    Vue3Toasity,
    {
        autoClose: 5000, // 自动关闭通知的时间（以毫秒为单位）
        position: "top-center", // 通知的位置，例如：top-left、top-right、bottom-left、bottom-right
        hideProgressBar: true, // 是否隐藏进度条
        transition: "slide", // 自定义的过渡效果
        closeButton: null, // 自定义关闭按钮，设置为 null 则不显示关闭按钮
        theme: "colored", // 主题颜色，"colored" 表示彩色主题
        newestOnTop: true // 新的通知是否显示在顶部，如果为 true，新的通知将显示在旧的通知之上
    },
)
app.component("iconify", Icon);

// 引入字体
import '@/assets/fonts/fonts.css';
import '@/assets/styles/main.css';

import { getUserProfile } from "@/api/main";
import { useUserStore } from "@/stores/user";
const userStore = useUserStore();
import { toast } from "vue3-toastify";


if (import.meta.env.VITE_APP_NO_NEED_LOGIN === "false") {
    let loadingToast
    const loadingDoneConfig = { autoClose: 5000, closeOnClick: true, isLoading: false } // 加载结束后提示的通用配置项

    if (!userStore.token) { // 如果 userStore 中的 token 为空
        loadingToast = toast.loading("正在登录，请稍候片刻 ……"); // 显示登录加载提示
        if (import.meta.env.VITE_APP_CUSTOM_TOKEN !== "") {
            userStore.setToken(import.meta.env.VITE_APP_CUSTOM_TOKEN); // 使用环境变量中的自定义 token
        } else {
            if (!JSON.parse(import.meta.env.VITE_APP_NO_LOGIN_PAGES).some(path => window.location.href.includes(path))) {
                router.push({ path: "/login" })
            }
        }
        toast.remove()
    } else {
        await getUserProfile().then(async (res) => {
            if (res && res.code === 200) {
                userStore.setProfile(res.data)
                t.log(t.GET, "获取用户配置文件", res.data)
                if (userStore.token !== import.meta.env.VITE_APP_CUSTOM_TOKEN) {
                    toast.update(loadingToast, { // 显示成功信息
                        render: "欢迎您！"
                            + (userStore.profile.user.nickName || userStore.profile.user.userName || "用户")
                        // + "（" + (userStore.profile.roleGroup.replace(",", "、") || "未知用户组") + "）"
                        , ...loadingDoneConfig, type: "info", autoClose: 2000
                    })
                }
            } else {
                toast.remove(loadingToast)  // 移除加载提示
            }
        })
    }
}

app.mount('#app')