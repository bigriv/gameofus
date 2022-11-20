<template>
  <GameFrame
    :bgimg="BACKGROUND_IMAGE"
    :scroll="{ direction: 'x', speed: '10s', stop: state.isStop }"
  >
    <div class="character">
      <GameCharacterDrawer :unit="character.unit" :character="character" />
    </div>
    <div v-if="state.isStop" class="exclamation">!</div>
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
    const BACKGROUND_IMAGE = "tobehero/bg_riverbed.png";
    const character = {
      unit: "30rem",
      ...CHARACTER.DEFAULT,
    };
    const state = reactive({
      timeoutIdList: [],
      isStop: false,
    });

    onMounted(() => {
      state.timeoutIdList.push(
        setTimeout(() => {
          state.isStop = true;
          state.timeoutIdList.push(
            setTimeout(() => {
              emit("back");
            }, 2000)
          );
        }, 4000)
      );
    });
    onBeforeUnmount(() => {
      for (let id of state.timeoutIdList) {
        clearTimeout(id);
      }
    });

    return {
      BACKGROUND_IMAGE,
      character,
      state,
    };
  },
});
</script>

<style scoped lang="scss">
.character {
  position: absolute;
  bottom: 40rem;
  right: 0;
  width: 300rem;
  height: 500rem;
  transform: rotateY(40deg) rotateX(5deg) rotateZ(5deg);
}
.exclamation {
  position: absolute;
  top: 100rem;
  right: 80rem;
  color: red;
  font-size: 72rem;
  font-weight: bold;
  font-style: italic;
}
</style>
