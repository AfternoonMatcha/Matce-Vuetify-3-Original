import { ref } from "vue";
import { defineStore } from 'pinia';

export const useMainStore = defineStore("main", () => {
    const title = ref("页面标题");
    const setTitle = (newTitle) => { title.value = newTitle };

    const theme = ref([]);
    const setTheme = (newTheme) => { theme.value = newTheme };

    return { title, setTitle, theme, setTheme };
});