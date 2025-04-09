<template>
    <div class="empty" :fill="fill">
        <div class="emptyBox">
            <div class="emptyBoxPicture" v-if="simple !== ''" v-html="emptyPictureContent"></div>
            <div class="emptyBoxText" :simple="simple">{{ text }}</div>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";

const props = defineProps({
    text: { default: "暂无内容" },
    fill: null,
    simple: null,
});


import emptyPicture from "@/assets/images/emptyPicture.svg";
const emptyPictureContent = ref("");
axios.get(emptyPicture).then(response => {
    emptyPictureContent.value = response.data;
})
</script>

<style lang="scss" scoped>
.empty {
    flex: 1;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 18px;
    position: relative;
    // background: #F008;
    // box-shadow: inset 0 0 0px 20px yellow;

    &[fill] {
        background-color: rgb(var(--v-theme-surface));
    }

    &Box {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translateY(-50%) translateX(-50%);
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 16px;

        &Picture {
            width: 247px;
            height: 191.4px;
        }

        &Text {
            font-size: 16px;
            text-align: center;
            white-space: pre-wrap;
            width: 75vw;
            max-width: calc(100vw - 18px);
            color: rgba(var(--v-theme-on-surface), 0.4);

            &[simple] {
                color: rgba(var(--v-theme-on-surface), 0.2);
                font-size: 14px;
            }
        }
    }
}
</style>