<template>
  <GameFrame />
  <GameButton label="ボタン" />
  <MessageFrame :messages="message" />
</template>

<script>
import { defineComponent } from "vue";
import GameFrame from "/src/components/atoms/GameFrame.vue";
import GameButton from "/src/components/atoms/GameButton.vue";
import MessageFrame from "/src/components/atoms/MessageFrame.vue";

export default defineComponent({
  components: {
    GameFrame,
    GameButton,
    MessageFrame,
  },
  setup() {
    const message = ["あいうえお", "123567890", "abcdefg"];

    return {
      message,
    };
  },
});
</script>
