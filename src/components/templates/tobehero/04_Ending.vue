<template>
  <GameFrame>
    <div class="ending-wrap" :class="state.color">
      <div class="title">{{ state.title }}</div>
      <div class="message">{{ state.message }}</div>
      <div class="message-wrap">
        <MessageFrame>
          <div class="reset_button">
            <GameButton label="タイトルに戻る" @click="onReset" />
          </div>
        </MessageFrame>
      </div>
    </div>
  </GameFrame>
</template>

<script>
import { defineComponent, onMounted, reactive } from "vue";
import GameFrame from "/src/components/atoms/GameFrame.vue";
import MessageFrame from "/src/components/atoms/MessageFrame.vue";
import GameButton from "/src/components/atoms/GameButton.vue";
import { PAGES } from "/src/composables/tobehero/const";
import ITEMS from "/src/composables/tobehero/item";
import MESSAGE from "/src/composables/tobehero/message";
import AUDIO from "/src/composables/utils/audio";
import { AUDIO_ROOT_PATH } from "/src/composables/utils/const";

export default defineComponent({
  components: {
    GameFrame,
    MessageFrame,
    GameButton,
  },
  props: {
    holdingMoney: {
      type: Number,
      required: true,
    },
    status: {
      type: Object,
      required: true,
    },
    items: {
      type: Array,
      required: true,
    },
    history: {
      type: Array,
      required: true,
    },
  },
  emits: ["reset"],
  setup(props, { emit }) {
    const HAPPYEND = new Audio(AUDIO_ROOT_PATH + AUDIO.HAPPYEND);
    const BADEND = new Audio(AUDIO_ROOT_PATH + AUDIO.BADEND);
    const TRUEEND = new Audio(AUDIO_ROOT_PATH + AUDIO.FANFARE);

    const state = reactive({
      title: "",
      message: "",
      color: "",
    });

    onMounted(() => {
      if (props.status.life <= 0) {
        // 体力が0になったときのエンディング
        state.title = "BAD END";
        state.color = "black";
        BADEND.currentTime = 0;
        BADEND.play();
        if (props.holdingMoney <= 0) {
          state.message = MESSAGE.BAD_END_01;
          return;
        }
        if (props.status.justice <= 0) {
          state.message = MESSAGE.BAD_END_02;
          return;
        }
        if (props.status.power >= 100) {
          state.message = MESSAGE.BAD_END_03;
          return;
        }
        if (props.items.length == ITEMS.length) {
          state.message = MESSAGE.BAD_END_04;
          return;
        }
      }
      if (
        props.history.length >= 4 &&
        props.history.filter(
          (data, index) => props.history.indexOf(data) == index
        ).length == 1
      ) {
        // 同じ行動を連続で4回以上行ったときのエンディング
        state.title = "TRUE END";
        state.color = "white";
        TRUEEND.currentTime = 0;
        TRUEEND.play();
        switch (props.history[0]) {
          case PAGES.PATROL:
            state.message = MESSAGE.TRUE_END_01;
            return;
          case PAGES.TRAINING:
            state.message = MESSAGE.TRUE_END_02;
            return;
          case PAGES.WORK:
            state.message = MESSAGE.TRUE_END_03;
            return;
          case PAGES.SHOP:
            state.message = MESSAGE.TRUE_END_04;
            return;
          case PAGES.REST:
            state.message = MESSAGE.TRUE_END_05;
            return;
        }
      }
      if (props.status.justice >= 100) {
        // 正義ステータスがカンストしたときのエンディング
        state.title = "HAPPY END";
        state.color = "yellow";
        HAPPYEND.currentTime = 0;
        HAPPYEND.play();
        if (props.items.length != ITEMS.length) {
          state.message = MESSAGE.HAPPY_END_01;
        } else {
          state.message = MESSAGE.HAPPY_END_02;
        }
        return;
      }
    });

    const onReset = () => {
      emit("reset");
    };

    return {
      state,
      onReset,
    };
  },
});
</script>

<style scoped lang="scss">
.ending-wrap {
  width: 100%;
  height: 100%;
  &.black {
    background-color: black;
    color: white;
  }
  &.white {
    background-color: white;
    color: black;
  }
  &.yellow {
    background-color: yellow;
    color: red;
  }
  background-color: black;
  .title {
    font-size: 60rem;
    position: absolute;
    top: 25%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .message {
    font-size: 30rem;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: max-content;
  }
  .message-wrap {
    position: absolute;
    bottom: 200rem;
    left: 50%;
    transform: translateX(-50%);
    width: 400rem;
    height: 100rem;
    .reset_button {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 200rem;
      height: 50rem;
      font-size: 20rem;
    }
  }
}
</style>
