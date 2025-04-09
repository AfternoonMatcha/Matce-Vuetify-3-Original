<template>
    <div class="main">
        <div class="banner">
        </div>
        <div class="contain">
            <!-- <div class="containTitle">登录</div> -->
            <v-form ref="loginFormBox" class="containForm" @submit.prevent="checkLoginForm()">
                <v-text-field label="账号" variant="outlined" :rules="[requiredRule]" prepend-inner-icon="mdi-cellphone"
                    v-model="loginForm.username">
                </v-text-field>
                <v-text-field label="密码" variant="outlined" :rules="[requiredRule]" prepend-inner-icon="mdi-lock"
                    v-model="loginForm.password" type="password"
                    style="width: 100%; letter-spacing: 0; margin-top: 10px;">
                </v-text-field>
                <v-btn prepend-icon="mdi-login-variant" class="bg-primary" variant="tonal" type="submit" size="x-large"
                    :disabled="loginLoading"
                    style="width: 100%; letter-spacing: 0; margin-top: 18px; margin-bottom: 39px; z-index: 1;">
                    <span style="margin-top:-1.5px">登录</span>
                </v-btn>
            </v-form>
            <div class="containBottom"></div>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import t from "@/utils/MatceTools"; //JS 方法工具箱\
import { useMainStore } from "@/stores/main";
const mainStore = useMainStore();
import { useUserStore } from "@/stores/user";
const userStore = useUserStore();
import { toast } from 'vue3-toastify';
import { useRouter } from "vue-router";
const router = useRouter();

mainStore.setTitle("登录");
mainStore.setTheme(["hideNav", "hideTitle"])

const requiredRule = value => Boolean(value) || '该项为必填项' // 必填项校验规则
const passwordCheckRule = value => registerForm.value.password === value || '两次输入的密码不一致'

const loginForm = ref({
    username: null,
    password: null
})

import { login, getUserProfile } from "@/api/main";
const loginFormBox = ref(null)
const loginLoading = ref(false)
const checkLoginForm = async () => {
    const validate = await loginFormBox.value.validate()
    if (validate.valid) { // 当校验通过
        const logName = "登录"
        loginLoading.value = true
        login({
            clientId: import.meta.env.VITE_APP_LOGIN_CLIENT_ID,
            grantType: "password",
            username: loginForm.value.username,
            password: loginForm.value.password
        }).then(async (res) => {
            if (res.code === 200) {
                t.log(t.POST, logName, res);
                userStore.setToken(res.data.access_token)
                await getUserProfile().then((res) => {
                    if (res.code === 200) {
                        userStore.setProfile(res.data)
                        t.log(t.GET, "获取用户配置文件", res.data)
                        router.push({ path: '/' }) // 直接跳转第一页
                    }
                })
            }
        }).finally(() => {
            loginLoading.value = false
        })
    }
}
</script>

<style lang="scss" scoped>
$bannerHeight: 356px;

.main {
    background: rgb(var(--v-theme-surface));
    display: flex;
    flex-direction: column;

    .banner {
        height: $bannerHeight;
        background: rgb(var(--v-theme-primary));
    }

    .contain {
        padding: 40px;
        position: relative;
        flex: 1;

        &Title {
            font-size: 30px;
            text-align: center;
            line-height: 1;
            margin-bottom: 40px;
            font-weight: bold;
        }

        &Bottom {
            font-size: 14px;
            position: absolute;
            text-align: center;
            left: 0;
            width: 100%;
            bottom: 0;
            padding-bottom: 30px;
            cursor: pointer;
            transition: .2s ease;

            &:hover {
                color: rgb(var(--v-theme-primary));
            }
        }
    }
}
</style>