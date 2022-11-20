<template>
  <GameFrame :bgimg="BACKGROUND_IMAGE">
    <div class="character">
      <GameCharacterDrawer :unit="character.unit" :character="character">
        <template #head-option>
          <div class="helmet" />
        </template>
        <template #upper_body-option>
          <div class="mandril" />
        </template>
      </GameCharacterDrawer>
    </div>
  </GameFrame>
</template>

<script>
import { defineComponent, reactive, onMounted, onBeforeUnmount } from "vue";
import GameFrame from "/src/components/atoms/GameFrame.vue";
import GameCharacterDrawer from "/src/components/atoms/GameCharacterDrawer.vue";
import { CHARACTER } from "/src/composables/tobehero/character";

export default defineComponent({
  components: {
    GameFrame,
    GameCharacterDrawer,
  },
  emits: ["back"],
  setup(props, { emit }) {
    const BACKGROUND_IMAGE = "tobehero/bg_riverbed2.png";
    const character = {
      unit: "30rem",
      ...Object.assign(JSON.parse(JSON.stringify(CHARACTER.DEFAULT)), {
        hair: {},
      }),
    };

    const state = reactive({
      timeoutId: null,
    });

    onMounted(() => {
      state.timeoutId = setTimeout(() => {
        emit("back");
      }, 5000);
    });
    onBeforeUnmount(() => {
      clearTimeout(state.timeoutId);
    });

    return {
      BACKGROUND_IMAGE,
      character,
    };
  },
});
</script>

<style scoped lang="scss">
.character {
  position: absolute;
  bottom: 40rem;
  right: 20rem;
  width: 300rem;
  height: 500rem;
}
.helmet {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  background-size: 100%;
  background-image: url("/src/assets/images/tobehero/item/item_helmet.png");
  background-repeat: no-repeat;
}
.mandril {
  position: absolute;
  top: calc(var(--arm-height) * var(--unit));
  left: 0;
  transform: rotate(-20deg) translate(-50%, -100%);
  background-image: url("/src/assets/images/tobehero/item/item_mandril.png");
  background-repeat: no-repeat;
  background-size: 150rem;
  width: 150rem;
  height: 180rem;
  animation: excavation 0.8s ease-in-out 1s infinite;
  transform-origin: 0% 0%;
}
@keyframes excavation {
  0% {
    transform: rotate(-20deg) translate(-50%, -100%);
  }
  50% {
    transform: rotate(-150deg) translate(-50%, -100%);
  }
  100% {
    transform: rotate(-20deg) translate(-50%, -100%);
  }
}
</style>
