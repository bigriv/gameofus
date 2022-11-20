<template>
  <GameFrame :bgimg="BACKGROUND_IMAGE">
    <div class="shopper">
      <GameCharacterDrawer :unit="character.unit" :character="character" />
    </div>
    <div class="items_window">
      <MessageFrame>
        <dl
          v-for="(item, index) in ITEMS"
          :key="index"
          @click="state.selectedItem = item"
        >
          <dt>{{ item.label }}</dt>
          <dd>{{ item.price }}円</dd>
        </dl>
      </MessageFrame>
    </div>
    <div class="holding_money-wrap">
      <MessageFrame>
        <div class="holding_money">
          <div>所持金</div>
          <div>{{ holdingMoney }}円</div>
        </div>
      </MessageFrame>
    </div>
    <div v-if="state.selectedItem.label" class="item_detail_window">
      <MessageFrame>
        <div class="item_detail-wrap">
          <div class="item_detail">
            <div>{{ state.selectedItem.label }}</div>
            <div>{{ state.selectedItem.price }}円</div>
            <div>{{ state.selectedItem.detail }}</div>
          </div>
          <div class="buy_button">
            <GameButton label="購入" @click="onBuy" />
          </div>
        </div>
      </MessageFrame>
    </div>
    <div class="back_button">
      <GameButton label="戻る" @click="onBack" />
    </div>
  </GameFrame>
</template>

<script>
import { defineComponent, reactive } from "vue";
import GameFrame from "/src/components/atoms/GameFrame.vue";
import GameButton from "/src/components/atoms/GameButton.vue";
import GameCharacterDrawer from "/src/components/atoms/GameCharacterDrawer.vue";
import MessageFrame from "/src/components/atoms/MessageFrame.vue";
import { CHARACTER } from "/src/composables/tobehero/character";
import { ITEMS } from "/src/composables/tobehero/item";

export default defineComponent({
  components: {
    GameFrame,
    GameButton,
    GameCharacterDrawer,
    MessageFrame,
  },
  props: {
    holdingMoney: {
      type: [String, Number],
      default: "",
    },
  },
  emits: ["back"],
  setup(props, { emit }) {
    const BACKGROUND_IMAGE = "tobehero/bg_shop.png";
    const character = {
      unit: "30rem",
      ...CHARACTER.SHOPPER,
    };
    const state = reactive({
      selectedItem: {
        label: null,
        price: null,
        detail: null,
      },
    });
    const onBuy = () => {
      alert("購入しました。");
    };
    const onBack = () => {
      emit("back");
    };
    return {
      ITEMS,
      BACKGROUND_IMAGE,
      character,
      state,
      onBuy,
      onBack,
    };
  },
});
</script>

<style scoped lang="scss">
* {
  font-family: monospace;
  font-weight: 600;
  user-select: none;
}
.shopper {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 0;
  width: 400rem;
  height: 400rem;
}
.items_window {
  position: absolute;
  top: 0;
  left: 20rem;
  width: 350rem;
  height: 350rem;
  dl {
    display: flex;
    justify-content: space-between;
    padding: 4rem;
    cursor: pointer;
    &:hover {
      background-color: rgba(255, 255, 255, 0.6);
    }
  }
}
.holding_money-wrap {
  position: absolute;
  top: 0;
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
.item_detail_window {
  position: absolute;
  top: 50rem;
  left: 400rem;
  width: 350rem;
  height: 200rem;
  .item_detail-wrap {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .item_detail {
      div + div {
        margin-top: 8rem;
      }
    }
    .buy_button {
      width: 140rem;
      height: 40rem;
    }
  }
}
.back_button {
  position: absolute;
  bottom: 20rem;
  left: 20rem;
  width: 140rem;
  height: 40rem;
}
</style>
