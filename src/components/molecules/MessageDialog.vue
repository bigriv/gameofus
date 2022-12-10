<template>
  <MessageFrame>
    <div class="message-wrap">
      <div class="message">
        {{ message }}
      </div>
      <div class="agree_button">
        <GameButton label="OK" @click="onAgree" />
      </div>
    </div>
  </MessageFrame>
</template>

<script>
import { defineComponent } from "vue";
import MessageFrame from "/src/components/atoms/MessageFrame.vue";
import GameButton from "/src/components/atoms/GameButton.vue";

export default defineComponent({
  components: {
    MessageFrame,
    GameButton,
  },
  props: {
    message: {
      type: String,
      default: "",
    },
  },
  emits: ["agree"],
  setup(props, { emit }) {
    const onAgree = () => {
      emit("agree");
    };

    return {
      onAgree,
    };
  },
});
</script>

<style scoped lang="scss">
.message-wrap {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  white-space: break-spaces;
  .agree_button {
    width: 140rem;
    height: 40rem;
    font-size: 16rem;
  }
}
</style>
