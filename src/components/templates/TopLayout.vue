<template>
  <div v-if="!store.reflesh">
    <router-view />
  </div>
</template>

<script setup>
import { watch } from "vue";
import useStore from "/src/stores";

const store = useStore();
watch(
  () => store.reflesh,
  () => {
    if (store.reflesh) {
      setTimeout(() => {
        store.refleshEnd();
      }, 10);
    }
  }
);
</script>
