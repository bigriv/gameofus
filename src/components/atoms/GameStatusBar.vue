<template>
  <div class="game_status_bar" :style="styles">
    <div v-if="label" class="label">{{ label }}</div>
    <div class="bar" />
  </div>
</template>

<script>
import { defineComponent, computed } from "vue";

export default defineComponent({
  props: {
    label: {
      type: String,
      default: "",
    },
    max: {
      type: Number,
      default: 100,
    },
    current: {
      type: Number,
      default: 0,
    },
    color: {
      type: String,
      default: "red",
    },
  },
  setup(props) {
    const styles = computed(() => {
      return {
        "--max": props.max,
        "--current": props.current,
        "--color": props.color,
      };
    });
    return {
      styles,
    };
  },
});
</script>

<style scoped lang="scss">
.game_status_bar {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 4rem;
  .label {
    width: 20%;
    white-space: nowrap;
    font-size: 100%;
  }
  .bar {
    width: 80%;
    height: 100%;
    min-height: 10rem;
    border: 1rem solid #000;
    position: relative;
    margin-left: 10rem;
    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: calc(var(--current) / var(--max) * 100%);
      height: 100%;
      background-color: var(--color);
    }
  }
}
</style>
