<template>
  <GameFrame :bgimg="BACKGROUND_IMAGE">
    <div class="character">
      <GameCharacterDrawer :unit="character.unit" :character="character.visual">
        <template #head-option>
          <div class="helmet" />
        </template>
        <template #upper_body-option>
          <div class="mandril" :class="{ 'animation-stop': modal.isShown }" />
        </template>
      </GameCharacterDrawer>
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
import GameCharacterDrawer from "/src/components/atoms/GameCharacterDrawer.vue";
import MessageDialog from "/src/components/molecules/MessageDialog.vue";
import { CHARACTER_VISUAL } from "/src/composables/tobehero/character";
import AUDIO from "/src/composables/utils/audio";
import { AUDIO_ROOT_PATH } from "/src/composables/utils/const";

export default defineComponent({
  components: {
    GameFrame,
    GameCharacterDrawer,
    MessageDialog,
  },
  props: {
    holdingMoney: {
      type: Number,
      required: true,
    },
    life: {
      type: Number,
      required: true,
    },
  },
  emits: ["update:life", "update:holdingMoney", "back"],
  setup(props, { emit }) {
    const BACKGROUND_IMAGE = "tobehero/bg_riverbed2.png";
    const WORK = new Audio(AUDIO_ROOT_PATH + AUDIO.GA);
    const MONEY = new Audio(AUDIO_ROOT_PATH + AUDIO.MONEY);

    const character = {
      unit: "30rem",
      visual: {
        ...CHARACTER_VISUAL.DEFAULT,
        hair: {},
      },
    };

    const state = reactive({
      timeoutId: null,
      life: computed({
        get: () => props.life,
        set: (newValue) => emit("update:life", newValue),
      }),
      holdingMoney: computed({
        get: () => props.holdingMoney,
        set: (newValue) => emit("update:holdingMoney", newValue),
      }),
    });
    const modal = reactive({
      isShown: false,
      message: "5000円ゲット！",
    });

    onMounted(() => {
      state.timeoutId = setTimeout(() => {
        state.holdingMoney += 5000;
        state.life -= 15;

        MONEY.currentTime = 0;
        MONEY.play();

        modal.isShown = true;
      }, 4000);
    });
    onBeforeUnmount(() => {
      clearTimeout(state.timeoutId);
    });
    const onAgree = () => {
      emit("back");
    };

    return {
      BACKGROUND_IMAGE,
      character,
      modal,
      onAgree,
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
  animation: excavation 0.8s ease-in-out 0.5s infinite;
  transform-origin: 0% 0%;
}
.animation-stop {
  animation-play-state: paused;
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
.message_window {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300rem;
  height: 150rem;
}
</style>
