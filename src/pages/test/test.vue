<template>
    <v-btn @click="toggleTheme">切换主题</v-btn>
</template>
  
  <script setup>
import { useTheme } from "vuetify";

const theme = useTheme();

function toggleTheme() {
    theme.global.name.value = theme.global.current.value.dark
        ? // ? "customLight"
          // : "customDark";
          "light"
        : "dark";
}
</script>
  