<script setup>
import { ref, watch, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import t from "@/utils/MatceTools.js"; //JS 方法工具箱

const router = useRouter();
const route = useRoute();

import config from "/package.json";
let version = config.version;

let drawer = ref(null);
</script>

<template>
    <v-layout>
        <v-navigation-drawer v-model="drawer" temporary density="comfortable">
            <v-list-item lines="two" title="Matce-Vuetify-3-Original" subtitle="初始化项目"
                @click="router.push({ path: '/' })"></v-list-item>

            <v-divider></v-divider>

            <v-list density="comfortable" nav>
                <v-list-item prepend-icon="mdi:mdi-home" title="首页" value="home"
                    @click="router.push({ path: '/' })"></v-list-item>
            </v-list>
            <v-divider />
            <v-list lines="three">
                <v-list-subheader>{{ version }} /
                    <a href="https://Matce.cn" style="color: inherit; text-decoration: none" target="_blank">FE By:
                        Matce</a></v-list-subheader>
            </v-list>
        </v-navigation-drawer>

        <v-app-bar subtitle="test" v-ripple>
            <template v-slot:prepend>
                <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            </template>

            <v-app-bar-title @click="router.push({ path: '/' })"
                style="cursor: pointer">Matce-Vuetify-3-Original</v-app-bar-title>
        </v-app-bar>

        <v-main>
            <div class="layerMain">
                <div class="layerContainer">
                    <router-view />
                </div>
            </div>
        </v-main>
    </v-layout>
</template>

<style lang="scss" scoped>
.layerMain {
    height: 100%;
    display: flex;
    justify-content: center;

    .layerContainer {
        height: 100%;
        flex: 1;
        max-width: 1000px;
    }
}
</style>