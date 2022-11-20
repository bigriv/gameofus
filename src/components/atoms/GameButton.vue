<template>
  <div class="game_button">
    <button :style="styles" :disabled="disabled" @click="onClick">
      {{ label }}
    </button>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "GameButton",
  props: {
    label: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "primary",
      validator: (value) => {
        return ["primary", "secondary"].includes(value);
      },
    },
    color: {
      type: String,
      default: "orange",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["click"],
  setup(props, { emit }) {
    const styles = {
      "--color": props.color,
    };

    const onClick = () => {
      emit("click");
    };
    return {
      styles,
      onClick,
    };
  },
});
</script>

<style scoped lang="scss">
.game_button {
  width: 100%;
  height: 100%;
  button {
    cursor: pointer;
    width: 100%;
    height: 100%;
    border-color: var(--color);
    background-color: #fff;
  }
}
</style>
