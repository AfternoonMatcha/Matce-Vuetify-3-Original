import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { setupLayouts } from 'virtual:generated-layouts'
import generatedRoutes from 'virtual:generated-pages'
import App from './App.vue'
import pinia from './stores';
import vuetify from '@/plugins/vuetify'

import t from "@/utils/MatceTools.js"; //JS 方法工具箱

const routes = setupLayouts(generatedRoutes)

// console.clear()
t.logs('Routers', routes)

const router = createRouter({
    history: createWebHistory(),
    routes,
})

const app = createApp(App)
app.use(router)
app.use(pinia)
app.use(vuetify)

app.mount('#app')

// 引入字体
import '@/assets/fonts/fonts.css';
import '@/assets/styles/main.css';