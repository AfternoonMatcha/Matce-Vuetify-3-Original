import { ref } from "vue";
import { defineStore } from 'pinia';

export const useTokenStore = defineStore('token', () => {
    const token = ref(window.localStorage.getItem('token') || '')

    function saveToken(str) {
        token.value = str
        window.localStorage.setItem('token', str)
    }

    return { token, saveToken }
});