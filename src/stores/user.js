import { ref } from "vue";
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', () => {
    const token = ref(
        window.localStorage.getItem('token') ||
        '')

    const setToken = (str) => {
        token.value = str
        window.localStorage.setItem('token', str || "")
    }

    const profile = ref(null)

    const setProfile = (obj) => {
        profile.value = obj
    }

    return { token, setToken, profile, setProfile }
});