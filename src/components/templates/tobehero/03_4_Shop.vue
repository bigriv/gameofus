<template>
  <GameFrame :bgimg="BACKGROUND_IMAGE">
    <div class="shopper">
      <GameCharacterDrawer :unit="shopper.unit" :character="shopper.visual" />
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
      <GameButton label="帰る" @click="onBack" />
    </div>
    <div v-if="modal.isShown" class="message_window">
      <MessageDialog :message="modal.message" @agree="modal.isShown = false" />
    </div>
  </GameFrame>
</template>

<script>
import { defineComponent, reactive, computed } from "vue";
import GameFrame from "/src/components/atoms/GameFrame.vue";
import GameButton from "/src/components/atoms/GameButton.vue";
import GameCharacterDrawer from "/src/components/atoms/GameCharacterDrawer.vue";
import MessageFrame from "/src/components/atoms/MessageFrame.vue";
import MessageDialog from "/src/components/molecules/MessageDialog.vue";
import { CHARACTER_VISUAL }  from "/src/composables/tobehero/character";
import ITEMS from "/src/composables/tobehero/item";

export default defineComponent({
  components: {
    GameFrame,
    GameButton,
    GameCharacterDrawer,
    MessageFrame,
    MessageDialog,
  },
  props: {
    holdingMoney: {
      type: Number,
      required: true,
    },
    items: {
      type: Array,
      default: [],
    },
  },
  emits: ["update:holdingMoney", "update:items", "back"],
  setup(props, { emit }) {
    const BACKGROUND_IMAGE = "tobehero/bg_shop.png";
    const shopper = computed(() => ({
      unit: "30rem",
      visual: CHARACTER_VISUAL.SHOPPER,
    }));
    const state = reactive({
      selectedItem: {
        id: null,
        label: null,
        price: null,
        detail: null,
      },
      holdingMoney: computed({
        get: () => props.holdingMoney,
        set: (newValue) => emit("update:holdingMoney", newValue),
      }),
      items: computed({
        get: () => props.items,
        set: (newValue) => emit("update:items", newValue),
      }),
    });
    const modal = reactive({
      isShown: false,
      message: "",
    });

    const onBuy = () => {
      if (props.items.find(item => item.id == state.selectedItem.id)) {
        modal.message = "購入済みです。";
        modal.isShown = true;
        return;
      }
      if (state.holdingMoney < state.selectedItem.price) {
        modal.message = "お金が足りません。";
        modal.isShown = true;
        return;
      }
      state.items.push({
        id: state.selectedItem.id,
        img: state.selectedItem.img,
      });
      state.holdingMoney -= state.selectedItem.price;
      modal.message = `${state.selectedItem.label}を購入しました。`;
      modal.isShown = true;
    };
    const onBack = () => {
      emit("back");
    };

    return {
      ITEMS,
      BACKGROUND_IMAGE,
      shopper,
      state,
      modal,
      onBuy,
      onBack,
    };
  },
});
</script>

<style scoped lang="scss">
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
  top: 20rem;
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
.item_detail_window {
  position: absolute;
  top: 70rem;
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
      font-size: 16rem;
    }
  }
}
.back_button {
  position: absolute;
  bottom: 20rem;
  left: 20rem;
  width: 140rem;
  height: 40rem;
  font-size: 16rem;
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
