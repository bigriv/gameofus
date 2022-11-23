<template>
  <div class="status_list">
    <template v-for="(status, index) in list" :key="index">
      <GameStatusBar
        :label="status.label"
        :max="status.max"
        :current="status.current"
        :color="status.color"
      />
    </template>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import GameStatusBar from "/src/components/atoms/GameStatusBar.vue";

export default defineComponent({
  components: { GameStatusBar },
  props: {
    list: {
      type: Array,
      default: [],
    },
  },
  setup() {
    return {};
  },
});
</script>


<style scoped lang="scss">
</style>
