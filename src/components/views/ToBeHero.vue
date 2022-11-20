<template>
  <Title v-if="state.currentPage == PAGES.TITLE" @start="onMoveTop" />
  <Top v-else-if="state.currentPage == PAGES.TOP" @move="onMove" />
  <Patrol v-else-if="state.currentPage == PAGES.PATROL" @back="onMoveTop" />
  <Training v-else-if="state.currentPage == PAGES.TRAINING" @back="onMoveTop" />
  <Work v-else-if="state.currentPage == PAGES.WORK" @back="onMoveTop" />
  <Shop
    v-else-if="state.currentPage == PAGES.SHOP"
    :holdingMoney="1000"
    @back="onMoveTop"
  />
  <Rest v-else-if="state.currentPage == PAGES.REST" @back="onMoveTop" />
  <Ending v-else-if="state.currentPage == PAGES.ENDING" />
</template>

<script>
import { computed } from "@vue/reactivity";
import { defineComponent, reactive } from "vue";
import Title from "/src/components/templates/tobehero/01_Title.vue";
import Top from "/src/components/templates/tobehero/02_Top.vue";
import Patrol from "/src/components/templates/tobehero/03_1_Patrol.vue";
import Training from "/src/components/templates/tobehero/03_2_Training.vue";
import Work from "/src/components/templates/tobehero/03_3_Work.vue";
import Shop from "/src/components/templates/tobehero/03_4_Shop.vue";
import Rest from "/src/components/templates/tobehero/03_5_Rest.vue";
import Ending from "/src/components/templates/tobehero/04_Ending.vue";
import { PAGES } from "/src/composables/tobehero/const";

export default defineComponent({
  components: {
    Title,
    Top,
    Patrol,
    Training,
    Work,
    Shop,
    Rest,
    Ending,
  },
  setup() {
    const state = reactive({
      currentPage: PAGES.TITLE,
      bgImg: computed(() => `tobehero/${BAGGROUND_IMAGES[state.currentPage]}`),
    });

    const onMove = (id) => {
      state.currentPage = id;
    };
    const onMoveTop = () => {
      onMove(PAGES.TOP);
    };
    return { PAGES, state, onMove, onMoveTop };
  },
});
</script>

<style scoped lang="scss"></style>
