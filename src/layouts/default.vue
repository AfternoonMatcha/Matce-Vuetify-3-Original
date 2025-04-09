<template>
    <v-layout>
        <v-main style="min-height: 100vh; transition: none">
            <div class="layerMain" :class="mainStore.theme">
                <div class="layerTitle">{{ mainStore.title }}</div>
                <div class="layerContainer">
                    <router-view v-slot="{ Component }">
                        <v-scroll-x-transition>
                            <component :is="Component" class="layerContent" />
                        </v-scroll-x-transition>
                    </router-view>
                </div>
                <div class="layerNav" v-if="!urlNow.includes('/portrait/notAllowed')">
                    <div class="layerNavBox">
                        <div class="layerNavBoxItem" v-for="navItem in layerNavData"
                            @click="navItem.method ? navItem.method() : $router.push({ path: navItem.url })"
                            :Active="urlNow === navItem.url ? true : null" v-ripple="{ class: 'text-primary' }">
                            <div class="layerNavBoxItemIcon">
                                <iconify :icon="navItem.icon" height="22px" />
                            </div>
                            <div class="layerNavBoxItemText">{{ navItem.text }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </v-main>
    </v-layout>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import t from "@/utils/MatceTools.js"; //JS 方法工具箱
import { useUserStore } from "@/stores/user";
import { useMainStore } from "@/stores/main";
const userStore = useUserStore();
const mainStore = useMainStore();

const route = useRoute();
const router = useRouter();

let urlNow = ref(route.path);
watch(() => route.path, (newPath) => {
    urlNow.value = newPath;
    mainStore.setTitle("");
    mainStore.setTheme([]);
});

import config from "/package.json";
let version = config.version;

let layerNavData = [
    { icon: "mdi:home", text: "首页", url: "/" },
    { icon: "mdi:settings", text: "测试", url: "/test/test" },
    { icon: "mdi:forbid", text: "空白", url: "/notAllowed" },
    {
        icon: "mdi:logout-variant",
        text: "登出",
        method: () => {
            userStore.setToken(null);
            userStore.setProfile(null);
            router.push({ path: "/login" });
            return true;
        }
    }
]

</script>

<style lang="scss" scoped>
.layerMain {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    transition: .2s ease;
    color: rgb(var(--v-theme-on-surface));
    overflow: hidden;

    .layerContainer {
        flex: 1;
        width: 100%;
        padding: 0 calc(calc(100vw - $contentMaxWidth) / 2);
        max-height: calc(100vh - $titleHeight);
        position: relative;

        &::before {
            // 背景层
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(var(--v-theme-background));
            z-index: -1;
        }

        .layerContent {
            position: absolute;
            max-width: $contentMaxWidth;
            width: 100vw;
            height: 100%;
            overflow-y: scroll;
            padding-bottom: $navHeight;
            display: flex;
            flex-direction: column;
        }
    }

    .layerTitle {
        background: rgb(var(--v-theme-primary));
        color: rgb(var(--v-theme-on-primary));
        height: $titleHeight;
        width: 100%;
        font-size: 18px;
        display: flex;
        justify-content: center;
        align-items: center;
        line-height: 1;
        position: relative;
        z-index: 3000;
        transition: .2s ease;

        &::after {
            content: "";
            position: absolute;
            bottom: -$contentFadeHight;
            left: 0;
            right: 0;
            height: $contentFadeHight;
            transition: .2s ease;
            background: linear-gradient(to bottom, rgb(var(--v-theme-background)), transparent);
        }
    }

    .layerNav {
        background: rgb(var(--v-theme-surface));
        height: $navHeight;
        display: flex;
        justify-content: center;
        position: fixed;
        bottom: 0;
        width: 100%;
        line-height: 1;
        z-index: 100;
        transition: background-color .2s ease;

        &::before {
            content: "";
            position: absolute;
            top: -$contentFadeHight;
            left: 0;
            right: 0;
            height: $contentFadeHight;
            transition: .2s ease;
            background: linear-gradient(to top, rgb(var(--v-theme-background)), transparent);
        }

        &Box {
            display: flex;
            max-width: calc($contentMaxWidth - 32px);
            flex: 1;
            height: 100%;
            margin: 0 16px;

            &Item {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 6px;
                cursor: pointer;
                border-radius: 12px 12px 0 0;
                flex: 1;
                transition: 0.2s ease;
                justify-content: center;
                padding-bottom: 3px;

                &Text {
                    font-size: 12px;
                    user-select: none;
                }

                &[Active],
                &:hover {
                    color: rgb(var(--v-theme-primary));
                }
            }
        }
    }
}

// Theme
.hideNav {
    .layerNav {
        pointer-events: none;
        margin-bottom: -$navHeight;

        &Box {
            opacity: 0;
        }
    }

    .layerContainer {
        max-height: calc(100vh - $titleHeight);
        margin-bottom: 0;

        .layerContent {
            padding-bottom: 0;
        }
    }
}

.hideTitle {
    .layerTitle {
        pointer-events: none;
        margin-top: -$titleHeight;
        opacity: 0;
    }

    .layerContainer {
        max-height: 100vh;
    }
}
</style>