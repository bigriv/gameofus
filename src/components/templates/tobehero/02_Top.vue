<template>
  <GameFrame :bgimg="BACKGROUND_IMAGE">
    <div v-if="isOpeningShow" class="opening">
      <MessageDialog :message="message" @agree="(isOpeningShow = false)" />
    </div>

    <div class="menu_buttons">
      <div
        v-for="(button, index) in MENU_BUTTONS"
        :key="index"
        class="menu_button"
      >
        <GameButton :label="button.label" @click="onMove(button.id)" />
      </div>
    </div>
    <div class="holding_money-wrap">
      <MessageFrame>
        <div class="holding_money">
          <div>所持金</div>
          <div>{{ holdingMoney }}円</div>
        </div>
      </MessageFrame>
    </div>
    <div class="status_list-wrap">
      <MessageFrame>
        <StatusList :list="status" />
      </MessageFrame>
    </div>
    <div class="character">
      <GameCharacterDrawer :unit="character.unit" :character="character.visual">
        <template v-if="character.mask" #head-option>
          <img class="mask" :src="IMAGE_ROOT_PATH + character.mask.img" />
        </template>
        <template v-if="character.suit_upper" #upper_body-option>
          <img
            class="suit_upper"
            :src="IMAGE_ROOT_PATH + character.suit_upper.img"
          />
        </template>
        <template v-if="character.suit_lower" #lower_body-option>
          <img
            class="suit_lower"
            :src="IMAGE_ROOT_PATH + character.suit_lower.img"
          />
        </template>
      </GameCharacterDrawer>
    </div>
  </GameFrame>
</template>

<script setup>
import { computed, onMounted, reactive } from "vue";
import GameFrame from "/src/components/atoms/GameFrame.vue";
import GameButton from "/src/components/atoms/GameButton.vue";
import MessageFrame from "/src/components/atoms/MessageFrame.vue";
import StatusList from "/src/components/molecules/StatusList.vue";
import MessageDialog from "/src/components/molecules/MessageDialog.vue";
import GameCharacterDrawer from "/src/components/atoms/GameCharacterDrawer.vue";
import { IMAGE_ROOT_PATH } from "/src/composables/utils/const";
import { newObject } from "/src/composables/utils/convertion";
import { PAGES } from "/src/composables/tobehero/const";
import { constructHeroVisual } from "/src/composables/tobehero/function";
import MESSAGE from "/src/composables/tobehero/message";

const props = defineProps({
  opening: {
    type: Boolean,
    default: false,
  },
  character: {
    type: Object,
    required: true,
  },
  status: {
    type: Object,
    required: true,
  },
  holdingMoney: {
    type: [String, Number],
    default: "",
  },
  items: {
    type: Array,
    default: [],
  },
});
const emit = defineEmits(["update:opening", "move"]);

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
const status = computed(() => [
  {
    label: "体力",
    max: 100,
    current: props.status.life,
    color: "green",
  },
  {
    label: "筋力",
    max: 100,
    current: props.status.power,
    color: "red",
  },
  {
    label: "正義",
    max: 100,
    current: props.status.justice,
    color: "yellow",
  },
]);
const character = reactive({
  unit: "30rem",
  visual: newObject(props.character),
  mask: null,
  mant: null,
  suit_upper: null,
  suit_lower: null,
});

const isOpeningShow = computed({
  get: () => props.opening,
  set: (newValue) => emit("update:opening", newValue)
})

const message = MESSAGE.OPENING_01;

const onMove = (id) => {
  emit("move", id);
};
onMounted(() => {
  constructHeroVisual(character, props.items);
});
</script>

<style scoped lang="scss">
.opening {
  z-index: 3;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 350rem;
  height: 150rem;
}
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
.holding_money-wrap {
  position: absolute;
  top: 20rem;
  left: 400rem;
  width: 350rem;
  height: 50rem;
  .holding_money {
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
.status_list-wrap {
  position: absolute;
  top: 90rem;
  left: 400rem;
  width: 350rem;
  height: 100rem;
  font-size: 20rem;
}
.character {
  position: absolute;
  bottom: 0rem;
  left: 50%;
  width: 300rem;
  height: 500rem;
  transform: translateX(-50%);
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
</style>
