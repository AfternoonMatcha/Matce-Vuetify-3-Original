<template>
    <div class="main">
        <div class="greeting">Welcome!</div>
        <div class="toolBox">
            <v-card height="100" v-ripple="{ class: 'text-white' }" v-for="(tool, i) in tools" :key="i" cols="auto"
                class="tool d-flex elevation-0" :prepend-icon="'mdi-' + tool.icon"
                @click="router.push({ path: tool.url })">
                <div class="toolTitle">{{ tool.title }}</div>
            </v-card>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import t from "@/utils/MatceTools.js";
import { useMainStore } from "@/stores/main";
const mainStore = useMainStore();

mainStore.setTitle("首页");
// mainStore.setTheme(["hideNav"])

import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();

const tools = ref([
    { title: "示例页面", url: "test/test", icon: "palette-swatch" },
    { title: "敬请期待", url: "", icon: "chevron-right" },
]);
</script>

<style lang="scss" scoped>
.main {
    padding: 20px;

    .greeting {
        margin-top: 10vh;
        margin-bottom: 20px;
        font-size: 30px;
        overflow: hidden;
    }

    .toolBox {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        overflow: hidden;

        .tool {
            width: 100%;
            max-width: 100%;
            cursor: pointer;
            padding: 14px;
            display: flex;
            align-items: center;
            transition: 0.2s ease;

            &Title {
                flex: 1;
                margin-top: -2px;
                font-size: 16px;
                overflow: hidden;
                white-space: pre-wrap;
                display: -webkit-box;
                overflow: hidden;
                text-overflow: ellipsis; //省略号
                -webkit-line-clamp: 3; //指定保留行数
                -webkit-box-orient: vertical;
            }
        }

        .tool:hover {
            padding-left: 20px;
        }

        @media (min-width: 700px) {
            .tool {
                width: calc(calc(100% - 10px) / 2);
                padding-right: 0px;
            }
        }

        @media (min-width: 900px) {
            .tool {
                width: calc(calc(100% - 20px) / 3);
            }
        }
    }
}
</style>