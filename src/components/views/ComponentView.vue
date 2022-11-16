<template>
  <GameFrame />
  <GameButton label="ボタン" />
  <MessageFrame :messages="message" />
  <GameCharacter :unit="character.unit" :character="character" />
</template>

<script>
import { defineComponent } from "vue";
import GameFrame from "/src/components/atoms/GameFrame.vue";
import GameButton from "/src/components/atoms/GameButton.vue";
import MessageFrame from "/src/components/atoms/MessageFrame.vue";
import GameCharacter from "/src/components/atoms/GameCharacter.vue";

export default defineComponent({
  components: {
    GameFrame,
    GameButton,
    MessageFrame,
    GameCharacter,
  },
  setup() {
    const message = ["あいうえお", "123567890", "abcdefg"];
    const character = {
      unit: "30rem",
      head: {
        height: "4",
        width: "3",
        color: "lemonchiffon",
        other: {
          "border-bottom-right-radius": "30%",
          "border-bottom-left-radius": "30%",
        },
      },
      face: "",
      upper_body: {
        height: "5",
        width: "4",
        color: "white",
      },
      lower_body: {
        height: "2",
        width: "4",
        color: "silver",
      },
      arm: {
        height: "3",
        width: "1",
        color: "lemonchiffon",
      },
      leg: {
        height: "3",
        width: "1.75",
        color: "lemonchiffon",
      },
    };
    return {
      message,
      character,
    };
  },
});
</script>
