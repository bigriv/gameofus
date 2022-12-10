<template>
  <GameFrame :bgimg="BACKGROUND_IMAGE">
    <div class="character">
      <GameImage :src="state.image" />
    </div>
    <div v-if="modal.isShown" class="message_window">
      <MessageDialog :message="modal.message" @agree="onAgree" />
    </div>
  </GameFrame>
</template>

<script>
import {
  defineComponent,
  reactive,
  computed,
  onMounted,
  onBeforeUnmount,
} from "vue";
import GameFrame from "/src/components/atoms/GameFrame.vue";
import GameImage from "/src/components/atoms/GameImage.vue";
import MessageDialog from "/src/components/molecules/MessageDialog.vue";
import AUDIO from "/src/composables/utils/audio";
import { AUDIO_ROOT_PATH } from "/src/composables/utils/const";

export default defineComponent({
  components: {
    GameFrame,
    GameImage,
    MessageDialog,
  },
  props: {
    life: {
      type: Number,
      required: true,
    },
    power: {
      type: Number,
      required: true,
    },
  },
  emits: ["update:life", "update:power", "back"],
  setup(props, { emit }) {
    const BACKGROUND_IMAGE = "tobehero/bg_home.png";
    const SHOUT = new Audio(AUDIO_ROOT_PATH + AUDIO.SHOUT);
    const POWERUP = new Audio(AUDIO_ROOT_PATH + AUDIO.POWERUP);

    const CHARACTER_VISUAL_IMAGE_1 = "tobehero/char_pushup1.png";
    const CHARACTER_VISUAL_IMAGE_2 = "tobehero/char_pushup2.png";

    const state = reactive({
      image: CHARACTER_VISUAL_IMAGE_1,
      timeoutId: null,
      intervalId: null,
      life: computed({
        get: () => props.life,
        set: (newValue) => emit("update:life", newValue),
      }),
      power: computed({
        get: () => props.power,
        set: (newValue) => emit("update:power", newValue),
      }),
    });
    const modal = reactive({
      isShown: false,
      message: "筋力がアップした！",
    });

    onMounted(() => {
      state.timeoutId = setTimeout(() => {
        state.life -= 15;
        if (state.power + 5 < 100) {
          state.power += 10;
        } else {
          state.power = 100;
        }

        POWERUP.currentTime = 0;
        POWERUP.play();

        modal.isShown = true;
        clearTimeout(state.timeoutId);
        clearInterval(state.intervalId);
      }, 3500);
      state.intervalId = setInterval(() => {
        SHOUT.currentTime = 0;
        SHOUT.play();
        if (state.image === CHARACTER_VISUAL_IMAGE_1) {
          state.image = CHARACTER_VISUAL_IMAGE_2;
        } else {
          state.image = CHARACTER_VISUAL_IMAGE_1;
        }
      }, 400);
    });
    onBeforeUnmount(() => {
      clearTimeout(state.timeoutId);
      clearInterval(state.intervalId);
    });
    const onAgree = () => {
      emit("back");
    };

    return {
      BACKGROUND_IMAGE,
      state,
      modal,
      onAgree,
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
.message_window {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300rem;
  height: 150rem;
}
</style>
