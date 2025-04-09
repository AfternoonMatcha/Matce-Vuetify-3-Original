<template>
    <div class="main">
        <v-btn @click="toggleTheme">切换主题</v-btn>
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

function toggleTheme() {
    theme.global.name.value = theme.global.current.value.dark
        ? "customLight"
        : "dark";
}
</script>

<style lang="scss" scoped>
.main {
    padding: 20px;
}
</style>
