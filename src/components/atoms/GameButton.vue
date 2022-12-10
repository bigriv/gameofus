<template>
  <div class="game_button">
    <button :style="styles" :disabled="disabled" @click="onClick">
      {{ label }}
    </button>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import AUDIO from "/src/composables/utils/audio";
import { AUDIO_ROOT_PATH } from "/src/composables/utils/const";

export default defineComponent({
  name: "GameButton",
  props: {
    label: {
      type: String,
      default: "",
    },
    audio: {
      type: String,
      default: AUDIO.BUTTON,
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

    const audio = new Audio(AUDIO_ROOT_PATH + props.audio);

    const onClick = () => {
      audio.currentTime = 0;
      audio.play();
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
    font-size: 100%;
    font-family: monospace;
    font-weight: 600;
    user-select: none;
  }
}
</style>
