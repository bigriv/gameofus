<template>
  <GameFrame :bgimg="BACKGROUND_IMAGE">
    <div class="menu_buttons">
      <div
        v-for="(button, index) in MENU_BUTTONS"
        :key="index"
        class="menu_button"
      >
        <GameButton :label="button.label" @click="onMove(button.id)" />
      </div>
    </div>
    <div class="character">
      <GameCharacterDrawer :unit="character.unit" :character="character" />
    </div>
  </GameFrame>
</template>

<script>
import { defineComponent } from "vue";
import GameFrame from "/src/components/atoms/GameFrame.vue";
import GameButton from "/src/components/atoms/GameButton.vue";
// import MessageFrame from "/src/components/atoms/MessageFrame.vue";
import GameCharacterDrawer from "/src/components/atoms/GameCharacterDrawer.vue";
import { CHARACTER } from "/src/composables/tobehero/character";
import { PAGES } from "/src/composables/tobehero/const";

export default defineComponent({
  components: {
    GameFrame,
    GameButton,
    GameCharacterDrawer,
  },
  emits: ["move"],
  setup(props, { emit }) {
    const BACKGROUND_IMAGE = "tobehero/bg_home.png";
    const MENU_BUTTONS = [
      {
        label: "パトロール",
        id: PAGES.PATROL,
      },
      {
        label: "特訓",
        id: PAGES.TRAINING,
      },
      {
        label: "バイト",
        id: PAGES.WORK,
      },
      {
        label: "買い物",
        id: PAGES.SHOP,
      },
      {
        label: "休養",
        id: PAGES.REST,
      },
    ];
    const character = {
      unit: "30rem",
      ...CHARACTER.DEFAULT,
    };
    const onMove = (id) => {
      emit("move", id);
    };
    return {
      BACKGROUND_IMAGE,
      MENU_BUTTONS,
      character,
      onMove,
    };
  },
});
</script>

<style scoped lang="scss">
.menu_buttons {
  position: absolute;
  width: 200rem;
  top: 20rem;
  left: 20rem;
  .menu_button {
    width: 200rem;
    height: 50rem;
    font-size: 20rem;
    + .menu_button {
      margin-top: 10rem;
    }
  }
}
.character {
  position: absolute;
  bottom: 40rem;
  right: 20rem;
  width: 400rem;
  height: 500rem;
}
</style>
