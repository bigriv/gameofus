<template>
  <GameFrame :bgimg="BACKGROUND_IMAGE">
    <div class="character">
      <GameImage :src="state.image" />
    </div>
  </GameFrame>
</template>

<script>
import { defineComponent, reactive, onMounted, onBeforeUnmount } from "vue";
import GameFrame from "/src/components/atoms/GameFrame.vue";
import GameImage from "/src/components/atoms/GameImage.vue";

export default defineComponent({
  components: {
    GameFrame,
    GameImage,
  },
  emits: ["back"],
  setup(props, { emit }) {
    const BACKGROUND_IMAGE = "tobehero/bg_home.png";

    const CHARACTER_IMAGE_1 = "tobehero/char_pushup1.png";
    const CHARACTER_IMAGE_2 = "tobehero/char_pushup2.png";

    const state = reactive({
      image: CHARACTER_IMAGE_1,
      timeoutId: null,
      intervalId: null,
    });

    onMounted(() => {
      state.timeoutId = setTimeout(() => {
        emit("back");
      }, 5000);
      state.intervalId = setInterval(() => {
        if (state.image === CHARACTER_IMAGE_1) {
          state.image = CHARACTER_IMAGE_2;
        } else {
          state.image = CHARACTER_IMAGE_1;
        }
      }, 500);
    });
    onBeforeUnmount(() => {
      clearTimeout(state.timeoutId);
      clearInterval(state.intervalId);
    });

    return {
      BACKGROUND_IMAGE,
      state,
    };
  },
});
</script>

<style scoped lang="scss">
.character {
  position: absolute;
  bottom: 50rem;
  left: 50%;
  transform: translateX(-50%);
}
</style>
