<template>
  <GameFrame :bgimg="BACKGROUND_IMAGE">
    <div class="message-wrap">
      <MessageFrame>
        <div class="start_button">
          <GameButton label="はじめる" @click="onStart" />
        </div>
      </MessageFrame>
    </div>
  </GameFrame>
</template>

<script>
import { defineComponent } from "vue";
import GameFrame from "/src/components/atoms/GameFrame.vue";
import MessageFrame from "/src/components/atoms/MessageFrame.vue";
import GameButton from "/src/components/atoms/GameButton.vue";

export default defineComponent({
  components: {
    GameFrame,
    MessageFrame,
    GameButton,
  },
  emits: ["start"],
  setup(props, { emit }) {
    const BACKGROUND_IMAGE = "tobehero/bg_title.png";

    const onStart = () => {
      emit("start");
    };

    return {
      BACKGROUND_IMAGE,
      onStart,
    };
  },
});
</script>

<style scoped lang="scss">
.message-wrap {
  position: absolute;
  bottom: 200rem;
  left: 50%;
  transform: translateX(-50%);
  width: 400rem;
  height: 100rem;
  .start_button {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 200rem;
    height: 50rem;
    font-size: 20rem;
  }
}
</style>
