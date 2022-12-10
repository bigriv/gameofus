<template>
  <GameFrame :bgimg="BACKGROUND_IMAGE">
    <div class="sleep_effect">
      <span v-for="i in state.timer" :key="i"> z </span>
    </div>
    <div class="character">
      <img :src="character" />
    </div>
    <div v-if="modal.isShown" class="message_window">
      <MessageDialog :message="modal.message" @agree="onAgree" />
    </div>
  </GameFrame>
</template>

<script setup>
import { onMounted, computed, onBeforeUnmount, reactive } from "vue";
import GameFrame from "/src/components/atoms/GameFrame.vue";
import MessageDialog from "/src/components/molecules/MessageDialog.vue";
import { IMAGE_ROOT_PATH } from "/src/composables/utils/const";
import AUDIO from "/src/composables/utils/audio";
import { AUDIO_ROOT_PATH } from "/src/composables/utils/const";

const props = defineProps({
  life: {
    type: Number,
    required: true,
  },
});
const emit = defineEmits(["update:life", "back"]);

const BACKGROUND_IMAGE = "tobehero/bg_home.png";
const character = IMAGE_ROOT_PATH + "tobehero/char_sleep.png";
const POWERUP = new Audio(AUDIO_ROOT_PATH + AUDIO.POWERUP);
const SLEEP = new Audio(AUDIO_ROOT_PATH + AUDIO.SLEEP);

const state = reactive({
  timer: 0,
  timeoutId: null,
  intervalId: null,
  life: computed({
    get: () => props.life,
    set: (newValue) => emit("update:life", newValue),
  }),
});
const modal = reactive({
  isShown: false,
  message: "体力が回復した。",
});

onMounted(() => {
  state.timeoutId = setTimeout(() => {
    if (state.life + 20 < 100) {
      state.life += 20;
    } else {
      state.life = 100;
    }

    POWERUP.currentTime = 0;
    POWERUP.play();

    modal.isShown = true;
    clearTimeout(state.timeoutId);
    clearInterval(state.intervalId);
  }, 3900);
  state.intervalId = setInterval(() => {
    state.timer++;
    SLEEP.currentTime = 0;
    SLEEP.play();
  }, 1000);
});
onBeforeUnmount(() => {
  clearTimeout(state.timeoutId);
  clearInterval(state.intervalId);
});
const onAgree = () => {
  emit("back");
};
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
.message_window {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300rem;
  height: 150rem;
}
</style>
