import { ref } from "vue";
import { defineStore } from 'pinia';

export const useMainStore = defineStore("main", () => {
    const title = ref("页面标题");
    const setTitle = (newTitle) => { title.value = newTitle };

    const theme = ref([]);
    const setTheme = (newTheme) => { theme.value = newTheme };

    const loadingStatus = ref(null);
    const loadingText = ref("");
    const loading = (newVal) => { loadingStatus.value = true; loadingText.value = newVal || "载入中" };
    const loadingDone = (newVal) => { loadingStatus.value = false; newVal ? loadingText.value = newVal : null };

    return { title, setTitle, theme, setTheme, loadingStatus, loadingText, loading, loadingDone };
});