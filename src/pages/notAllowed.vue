<template>
    <div class="page">
        <EmptyCard :text="msg" class="pageEmpty" />
    </div>

</template>

<script setup>
import { ref } from "vue";
import EmptyCard from "@/components/emptyCard.vue";
import { useMainStore } from "@/stores/main";
const mainStore = useMainStore();
mainStore.setTitle("提示");
mainStore.setTheme(["hideTitle", "hideNav"])
const getMsg = ref(decodeURIComponent(new URLSearchParams(window.location.search).get('msg')))
const msg = ref(
    getMsg.value !== "null" && getMsg.value !== ""
        ? getMsg.value
        : "页面未找到"
)
</script>

<style lang="scss" scoped>
.page {
    bottom: 0;
    position: fixed !important;
    height: 100vh;
    display: flex;
    align-items: center;

    &Empty {
        width: 100%;
        position: absolute;
        bottom: 0;
    }
}
</style>