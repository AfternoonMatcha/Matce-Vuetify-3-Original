<template>
    <v-layout>
        <v-main style="min-height: 100vh; transition: none">
            <div class="layerMain" :class="mainStore.theme">
                <div class="layerTitle">
                    {{ mainStore.title }}
                </div>
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
                                <div :class="navItem.icon" style="font-size: 22px"></div>
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
    { icon: "i-material-symbols:home-rounded", text: "首页", url: "/" },
    { icon: "i-material-symbols:settings-rounded", text: "测试", url: "/test/test" },
    { icon: "i-material-symbols:ad-off-rounded", text: "空白", url: "/notAllowed" },
    {
        icon: "i-material-symbols:right-panel-close-rounded",
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
    transition: .2s ease;
    color: rgb(var(--v-theme-on-surface));
    overflow: hidden;

    .layerContainer {
        flex: 1;
        width: 100%;
        padding: 0 calc(calc(100vw - $contentMaxWidth) / 2);
        margin-bottom: $navHeight;
        position: relative;
        transition: margin-bottom .2s ease;

        &::before {
            // 背景层
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(var(--v-theme-background));
            transition: .2s ease;
            z-index: -1;
        }

        .layerContent {
            position: absolute;
            max-width: $contentMaxWidth;
            // height: 100%;
            width: 100vw;
            overflow-y: scroll;
            display: flex;
            flex-direction: column;
            // background: rgb(var(--v-theme-primary), .5);
            -webkit-mask: linear-gradient(to bottom, #FFF0 0, #FFF $contentFadeHight, #FFF calc(100% - $contentFadeHight), #FFF0 100%);
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
        transition: margin .2s ease, background-color .2s ease;

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
        margin-bottom: 0;

        .layerContent {
            -webkit-mask: linear-gradient(to bottom, #FFF0 0, #FFF $contentFadeHight, #FFF $contentFadeHight);
        }
    }
}

.hideTitle {
    .layerTitle {
        pointer-events: none;
        margin-top: -$titleHeight;
        opacity: 0;
    }

    .layerContent {
        -webkit-mask: linear-gradient(to bottom, #FFF calc(100% - $contentFadeHight), #FFF0 100%);
    }
}

.hideNav.hideTitle {
    .layerContainer {
        max-height: 100%;
    }

    .layerContent {
        -webkit-mask: none;
        height: 100%;
    }
}
</style>