<template>
    <div class="main">
        <v-btn @click="changeTheme()"><template v-slot:prepend>
                <div
                    style="position: relative; display: flex; align-items: center; width: 16.5px; height: var(--v-btn-height); overflow: hidden;">
                    <v-scroll-y-transition>
                        <div v-if="theme.global.current.value.dark" style="position: absolute;"
                            class="v-btn__prepend-icon i-material-symbols:dark-mode-rounded"></div>
                        <div v-else style="position: absolute;"
                            class="v-btn__prepend-icon i-material-symbols:light-mode-rounded"></div>
                    </v-scroll-y-transition>
                </div>
            </template>切换主题</v-btn>
        <v-btn @click="maskLoading()"><template v-slot:prepend>
                <div class="v-btn__prepend-icon i-material-symbols:layers-rounded"></div>
            </template>载入遮罩</v-btn>
    </div>
</template>

<script setup>
import { onMounted } from 'vue';

import { useTheme } from "vuetify";
import { useMainStore } from "@/stores/main";
const mainStore = useMainStore();

onMounted(() => {
    mainStore.setTitle("测试");
    mainStore.setTheme([]);
});

const theme = useTheme();

const changeTheme = () => {
    theme.change(
        theme.global.current.value.dark
            ? "customLight"
            : "dark");
}

const maskLoading = () => {
    mainStore.loading(); // 可填入载入提示文本
    setTimeout(() => {
        mainStore.loadingDone();
    }, 3000);
}
</script>

<style lang="scss" scoped>
.main {
    padding: 20px;
    height: 100%;
    display: flex;
    flex-direction: row !important;
    flex-wrap: wrap;
    gap: 8px;
    justify-content: center;
    align-content: flex-start;
}
</style>
