<template>
  <GameFrame :bgimg="BACKGROUND_IMAGE">
    <div class="sleep_effect">
      <span v-for="i in state.timer" :key="i"> z </span>
    </div>
    <div class="character">
      <img :src="character" />
    </div>
  </GameFrame>
</template>

<script>
import { defineComponent, onMounted, onBeforeUnmount, reactive } from "vue";
import GameFrame from "/src/components/atoms/GameFrame.vue";
import { IMAGE_ROOT_PATH } from "/src/composables/utils/const";

export default defineComponent({
  components: {
    GameFrame,
  },
  emits: ["back"],
  setup(props, { emit }) {
    const BACKGROUND_IMAGE = "tobehero/bg_home.png";
    const character = IMAGE_ROOT_PATH + "tobehero/char_sleep.png";

    const state = reactive({
      timer: 0,
      timeoutId: null,
      intervalId: null,
    });

    onMounted(() => {
      state.timeoutId = setTimeout(() => {
        emit("back");
      }, 4000);
      state.intervalId = setInterval(() => {
        state.timer++;
      }, 1000);
    });
    onBeforeUnmount(() => {
      clearTimeout(state.timeoutId);
      clearInterval(state.intervalId);
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
.sleep_effect {
  position: absolute;
  bottom: 230rem;
  left: 170rem;
  width: 50rem;
  height: 100rem;
  span {
    font-weight: bold;
    position: absolute;
    transform: translate(-50%, 50%);
  }
  :nth-child(1) {
    font-size: 28rem;
    bottom: 0;
    left: 100%;
  }
  :nth-child(2) {
    font-size: 32rem;

    bottom: 50%;
    left: 50%;
  }
  :nth-child(3) {
    font-size: 40rem;
    bottom: 100%;
    left: 0;
  }
}
.character {
  position: absolute;
  bottom: 0;
  width: 400rem;
  height: 350rem;
  left: 50%;
  transform: translateX(-50%);
}
</style>
