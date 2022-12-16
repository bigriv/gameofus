<template>
  <GameFrame
    :bgimg="BACKGROUND_IMAGE"
    :scroll="{ direction: 'x', speed: '10s', stop: state.isStop }"
  >
    <template v-if="!state.isBattleNow">
      <div class="character">
        <GameCharacterDrawer :unit="hero.unit" :character="hero.visual">
          <template v-if="hero.mask" #head-option>
            <img class="mask" :src="IMAGE_ROOT_PATH + hero.mask.img" />
          </template>
          <template v-if="hero.suit_upper" #upper_body-option>
            <img
              class="suit_upper"
              :src="IMAGE_ROOT_PATH + hero.suit_upper.img"
            />
          </template>
          <template v-if="hero.suit_lower" #lower_body-option>
            <img
              class="suit_lower"
              :src="IMAGE_ROOT_PATH + hero.suit_lower.img"
            />
          </template>
        </GameCharacterDrawer>
      </div>
      <div v-if="state.isStop && state.isEncount" class="exclamation">!</div>
    </template>
    <template v-else>
      <div class="life_bar-left">
        <GameStatusBar :max="enemy.maxLife" :current="enemy.life" color="red" />
      </div>
      <div class="life_bar-right">
        <GameStatusBar :max="hero.maxLife" :current="hero.life" color="green" />
      </div>
      <div
        v-show="enemy.life > 0"
        class="enemy"
        :class="{ 'move-right': state.turn == 'enemy' }"
      >
        <GameCharacterDrawer :unit="enemy.unit" :character="enemy.visual" />
      </div>
      <div
        v-show="hero.life > 0"
        class="hero"
        :class="{ 'move-left': state.turn == 'hero' }"
      >
        <GameCharacterDrawer :unit="hero.unit" :character="hero.visual">
          <template v-if="hero.mask" #head-option>
            <img class="mask" :src="IMAGE_ROOT_PATH + hero.mask.img" />
          </template>
          <template v-if="hero.suit_upper" #upper_body-option>
            <img
              class="suit_upper"
              :src="IMAGE_ROOT_PATH + hero.suit_upper.img"
            />
          </template>
          <template v-if="hero.suit_lower" #lower_body-option>
            <img
              class="suit_lower"
              :src="IMAGE_ROOT_PATH + hero.suit_lower.img"
            />
          </template>
        </GameCharacterDrawer>
      </div>
    </template>
    <div v-if="modal.isShown" class="message_window">
      <MessageDialog :message="modal.message" @agree="modal.onAgree" />
    </div>
  </GameFrame>
</template>

<script setup>
import { reactive, onMounted, onBeforeUnmount } from "vue";
import GameFrame from "/src/components/atoms/GameFrame.vue";
import GameCharacterDrawer from "/src/components/atoms/GameCharacterDrawer.vue";
import GameStatusBar from "/src/components/atoms/GameStatusBar.vue";
import MessageDialog from "/src/components/molecules/MessageDialog.vue";
import { IMAGE_ROOT_PATH } from "/src/composables/utils/const";
import AUDIO from "/src/composables/utils/audio";
import { AUDIO_ROOT_PATH } from "/src/composables/utils/const";
import { newObject } from "/src/composables/utils/convertion";
import {
  CHARACTER_VISUAL,
  CHARACTER_STATUS,
} from "/src/composables/tobehero/character";
import { constructHeroVisual } from "/src/composables/tobehero/function";

const props = defineProps({
  life: {
    type: Number,
    required: true,
  },
  justice: {
    type: Number,
    required: true,
  },
  character: {
    type: Object,
    required: true,
  },
  power: {
    type: Number,
    required: true,
  },
  items: {
    type: Array,
    default: [],
  },
});
const emit = defineEmits(["update:life", "update:justice", "back"]);

const BACKGROUND_IMAGE = "tobehero/bg_riverbed.png";
const EXCLAMATION = new Audio(AUDIO_ROOT_PATH + AUDIO.EXCLAMATION);
const ATTACK = new Audio(AUDIO_ROOT_PATH + AUDIO.ATTACK);

const hero = reactive({
  unit: "30rem",
  visual: newObject(props.character),
  mask: null,
  mant: null,
  suit_upper: null,
  suit_lower: null,
  maxLife: 100,
  life: 100,
  power: props.power,
});
const enemy = reactive({
  unit: "30rem",
  visual: null,
  maxLife: null,
  life: null,
  power: null,
});
const state = reactive({
  isBattleNow: false,
  isEncount: false,
  timeoutId: null,
  turnIintervalId: null,
  battleEffectIintervalId: null,
  turn: null,
});
const modal = reactive({
  isShown: false,
  message: "",
  onAgree: () => {},
});

const battle = () => {
  state.turn = "hero";
  state.turnIintervalId = setInterval(() => {
    if (state.turn == "enemy") {
      state.turn = "hero";
    } else {
      state.turn = "enemy";
    }
  }, 2000);

  clearTimeout(state.timeoutId);
  state.timeoutId = setTimeout(() => {
    state.battleEffectIintervalId = setInterval(() => {
      if (state.turn == "enemy") {
        hero.life -= enemy.power;
      } else {
        enemy.life -= hero.power;
      }
      ATTACK.currentTime = 0;
      ATTACK.play();

      // 終了判定
      if (hero.life <= 0) {
        modal.message = "負けた...";
        modal.onAgree = () => {
          emit("update:life", props.life - 50);
          emit("back");
        };
        modal.isShown = true;

        state.turn = null;
        clearInterval(state.turnIintervalId);
        clearInterval(state.battleEffectIintervalId);
      }
      if (enemy.life <= 0) {
        modal.message = "勝った！";
        modal.onAgree = () => {
          emit("update:life", props.life - 20);
          emit("update:justice", props.justice + 20);
          emit("back");
        };
        modal.isShown = true;

        state.turn = null;
        clearInterval(state.turnIintervalId);
        clearInterval(state.battleEffectIintervalId);
      }
    }, 2000);
  }, 1000);
};

onMounted(() => {
  // 主人公の容姿を構築
  constructHeroVisual(hero, props.items);

  // 乱数によって敵とのエンカウントを決定
  const rnd = Math.random() * 100;
  state.isEncount = rnd >= 30;

  state.timeoutId = setTimeout(() => {
    state.isStop = true;

    clearTimeout(state.timeoutId);
    state.timeoutId = setTimeout(() => {
      if (state.isEncount) {
        // バトルする敵を生成
        const setEnemy = (key) => {
          enemy.visual = CHARACTER_VISUAL[key];
          enemy.maxLife = enemy.life = CHARACTER_STATUS[key].life;
          enemy.power = CHARACTER_STATUS[key].power;
        };
        if (props.justice < 40) {
          setEnemy("YANKEE");
        } else if (props.justice < 80) {
          setEnemy("MONSTER");
        } else {
          setEnemy("BOSS");
        }

        // バトル発生時用のイベントを設定
        state.isBattleNow = true;
        modal.message = "敵があらわれた！";
        modal.onAgree = () => {
          modal.isShown = false;
          battle();
          state.timeoutId = setTimeout(() => {
            if (state.turn == "enemy") {
              hero.life -= enemy.power;
            } else {
              enemy.life -= hero.power;
            }
            ATTACK.currentTime = 0;
            ATTACK.play();
          }, 1000);
        };
      } else {
        // バトル未発生時用のイベントを設定
        modal.message = "今日も街は平和だ！";
        modal.onAgree = () => {
          emit("back");
        };
      }
      modal.isShown = true;
    }, 1000);

    if (state.isEncount) {
      EXCLAMATION.currentTime = 0;
      EXCLAMATION.play();
    }
  }, 4000);
});
onBeforeUnmount(() => {
  clearTimeout(state.timeoutId);
  clearInterval(state.turnIintervalId);
  clearInterval(state.battleEffectIintervalId);
});
</script>

<style scoped lang="scss">
$IMAGE_PATH: "/assets/images";
.character {
  position: absolute;
  bottom: 40rem;
  right: 0;
  width: 300rem;
  height: 500rem;
  transform: rotateY(40deg) rotateX(5deg) rotateZ(5deg);
  .mask,
  .suit_upper,
  .suit_lower,
  .mant {
    position: absolute;
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
  .mask {
    width: calc(var(--head-width) * var(--unit));
    height: calc(var(--head-height) * var(--unit));
    top: 0;
    left: 50%;
    transform: translateX(-50%);
  }
  .suit_upper {
    width: calc(var(--upper_body-width) * var(--unit));
    height: calc(var(--upper_body-height) * var(--unit));
    top: 0;
    left: 50%;
    transform: translateX(-50%);
  }
  .suit_lower {
    width: calc(var(--lower_body-width) * var(--unit));
    height: calc(var(--lower_body-height) * var(--unit));
    top: 0;
    left: 50%;
    transform: translateX(-50%);
  }
  .mant {
    position: absolute;
    z-index: 1;
    width: calc((var(--upper_body-width) + var(--hand-width)) * var(--unit));
    height: calc(
      (var(--upper_body-height) + var(--lower_body-height)) * var(--unit)
    );
  }
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
.message_window {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300rem;
  height: 150rem;
  z-index: 2;
}
.life_bar-left,
.life_bar-right {
  position: absolute;
  width: 50%;
  height: 20rem;
}
.life_bar-left {
  top: 0;
  left: 0;
}
.life_bar-right {
  top: 0;
  right: 0;
}
.enemy {
  position: absolute;
  bottom: 40rem;
  left: 40rem;
  width: 250rem;
  height: 500rem;
}
.hero {
  position: absolute;
  bottom: 40rem;
  right: 40rem;
  width: 250rem;
  height: 500rem;
}
.move-right {
  animation: move-right 2s linear infinite;
  transform: translateX(0%);
  transform-origin: 150% 50%;
  @keyframes move-right {
    0% {
      transform: translateX(0%);
    }
    40% {
      transform: rotate(0) translateX(100%);
    }
    50% {
      transform: rotate(30deg) translateX(100%);
    }
    60% {
      transform: rotate(0) translateX(100%);
    }
    100% {
      transform: translateX(0%);
    }
  }
}
.move-left {
  animation: move-left 2s linear infinite;
  transform: translateX(0%);
  transform-origin: -50% 50%;
  @keyframes move-left {
    0% {
      transform: translateX(0%);
    }
    40% {
      transform: rotate(0) translateX(-100%);
    }
    50% {
      transform: rotate(-30deg) translateX(-100%);
    }
    60% {
      transform: rotate(0) translateX(-100%);
    }
    100% {
      transform: translateX(0%);
    }
  }
}
</style>
