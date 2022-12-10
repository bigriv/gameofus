<template>
  <Title v-if="state.currentPage == PAGES.TITLE" @start="onGameStart" />
  <Top
    v-else-if="state.currentPage == PAGES.TOP"
    v-model:opening="state.isOpeningShow"
    :character="character.visual"
    :status="character.status"
    :holdingMoney="character.holdingMoney"
    :items="character.items"
    @move="onMove"
  />
  <Patrol
    v-else-if="state.currentPage == PAGES.PATROL"
    v-model:life="character.status.life"
    v-model:justice="character.status.justice"
    :character="character.visual"
    :power="character.status.power"
    :items="character.items"
    @back="onMoveTop"
  />
  <Training
    v-else-if="state.currentPage == PAGES.TRAINING"
    v-model:life="character.status.life"
    v-model:power="character.status.power"
    @back="onMoveTop"
  />
  <Work
    v-else-if="state.currentPage == PAGES.WORK"
    v-model:life="character.status.life"
    v-model:holdingMoney="character.holdingMoney"
    @back="onMoveTop"
  />
  <Shop
    v-else-if="state.currentPage == PAGES.SHOP"
    v-model:holdingMoney="character.holdingMoney"
    v-model:items="character.items"
    @back="onMoveTop"
  />
  <Rest
    v-else-if="state.currentPage == PAGES.REST"
    v-model:life="character.status.life"
    @back="onMoveTop"
  />
  <Ending
    v-else-if="state.currentPage == PAGES.ENDING"
    :holdingMoney="character.holdingMoney"
    :status="character.status"
    :items="character.items"
    :history="character.history"
    @reset="onReset"
  />
</template>

<script setup>
import { reactive } from "vue";
import Title from "/src/components/templates/tobehero/01_Title.vue";
import Top from "/src/components/templates/tobehero/02_Top.vue";
import Patrol from "/src/components/templates/tobehero/03_1_Patrol.vue";
import Training from "/src/components/templates/tobehero/03_2_Training.vue";
import Work from "/src/components/templates/tobehero/03_3_Work.vue";
import Shop from "/src/components/templates/tobehero/03_4_Shop.vue";
import Rest from "/src/components/templates/tobehero/03_5_Rest.vue";
import Ending from "/src/components/templates/tobehero/04_Ending.vue";
import useStore from "/src/stores";
import { CHARACTER_VISUAL } from "/src/composables/tobehero/character";
import { PAGES } from "/src/composables/tobehero/const";

const store = useStore();

const state = reactive({
  currentPage: PAGES.TITLE,
  isOpeningShow: false,
});
const character = reactive({
  visual: CHARACTER_VISUAL.DEFAULT,
  holdingMoney: 1000,
  status: {
    life: 100,
    power: 5,
    justice: 0,
  },
  items: [],
  history: [],
});

const onGameStart = () => {
  state.isOpeningShow = true;
  state.currentPage = PAGES.TOP
};
const onMove = (id) => {
  state.currentPage = id;
};
const onMoveTop = () => {
  // 行動履歴登録
  character.history.unshift(state.currentPage);
  character.history = character.history.slice(0, 5);
  console.log(character.history);

  // エンディング判定
  const historyKindNum = new Set(character.history);
  console.log(historyKindNum);
  if (
    character.status.life <= 0 ||
    character.status.justice >= 100 ||
    (character.history.length >= 4 && historyKindNum.size == 1)
  ) {
    onMove(PAGES.ENDING);
    return;
  }
  onMove(PAGES.TOP);
};
const onReset = () => {
  store.refleshStart();
};
</script>

<style scoped lang="scss">
* {
  font-family: monospace;
  font-weight: 600;
}
</style>
