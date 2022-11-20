<template>
  <div class="character-wrap" :style="drawer.variabe">
    <div class="head" :style="drawer.character.head">
      <div
        class="hair"
        :class="drawer.character.hair"
        :style="drawer.character.hair?.other"
      />
      <div
        class="face"
        :class="drawer.character.face"
        :style="drawer.character.face?.other"
      />
      <slot name="head-option" />
    </div>
    <div class="upper_body" :style="drawer.character.upper_body">
      <div class="arm" :style="drawer.character.arm" />
      <div class="hand" :style="drawer.character.hand" />
      <slot name="upper_body-option" />
    </div>
    <div class="lower_body" :style="drawer.character.lower_body">
      <div class="leg" :style="drawer.character.leg" />
      <div class="foot" :style="drawer.character.foot" />
      <slot name="lower_body-option" />
    </div>
    <div
      v-for="(option, index) in drawer.character.options"
      :key="index"
      :style="option"
    />
    <slot name="other-option" />
  </div>
</template>

<script>
import { defineComponent, reactive } from "vue";

export default defineComponent({
  props: {
    unit: {
      type: String,
      default: "1rem",
    },
    character: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const drawer = reactive({
      variabe: {
        "--unit": props.unit,
        // head
        "--head-height": props.character.head?.height,
        "--head-width": props.character.head?.width,
        "--head-color": props.character.head?.color,
        // upper_body
        "--upper_body-height": props.character.upper_body?.height,
        "--upper_body-width": props.character.upper_body?.width,
        "--upper_body-color": props.character.upper_body?.color,
        // arm
        "--arm-height": props.character.arm?.height,
        "--arm-width": props.character.arm?.width,
        "--arm-color": props.character.arm?.color,
        // hand
        "--hand-height": props.character.hand?.height,
        "--hand-width": props.character.hand?.width,
        "--hand-color": props.character.hand?.color,
        // lower_body
        "--lower_body-height": props.character.lower_body?.height,
        "--lower_body-width": props.character.lower_body?.width,
        "--lower_body-color": props.character.lower_body?.color,
        // leg
        "--leg-height": props.character.leg?.height,
        "--leg-width": props.character.leg?.width,
        "--leg-color": props.character.leg?.color,
        // foot
        "--foot-height": props.character.foot?.height,
        "--foot-width": props.character.foot?.width,
        "--foot-color": props.character.foot?.color,
      },
      character: {
        head: props.character.head?.other,
        face: props.character.face,
        hair: props.character.hair,
        upper_body: props.character.upper_body?.other,
        arm: props.character.arm?.other,
        hand: props.character.hand?.other,
        lower_body: props.character.lower_body?.other,
        leg: props.character.leg?.other,
        foot: props.character.foot?.other,
        options: props.character.options,
      },
    });

    return {
      drawer,
    };
  },
});
</script>

<style scoped lang="scss">
$IMAGE_PATH: "/src/assets/images";
.character-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  div {
    position: absolute;
  }
  @function multiUnit($value) {
    @return calc($value * var(--unit));
  }
  .head {
    width: multiUnit(var(--head-width));
    height: multiUnit(var(--head-height));
    background-color: var(--head-color);
    top: 0;
    left: 50%;
    transform: translateX(-50%);
  }
  .hair {
    width: 100%;
    height: 100%;
    $HAIR_IMAGE_PATH: #{$IMAGE_PATH}/ character/hair;
    background-repeat: no-repeat;
    background-size: 100% 50%;
    position: absolute;
    &.male_active {
      bottom: 0;
      left: 50%;
      transform: translate(-50%, -50%);
      background-image: url(#{$HAIR_IMAGE_PATH}/hair_male_active.png);
    }
    &.male_square {
      bottom: 0;
      left: 50%;
      transform: translate(-50%, -50%);
      background-image: url(#{$HAIR_IMAGE_PATH}/hair_male_square.png);
    }
  }
  .face {
    width: 100%;
    height: 100%;
    $FACE_IMAGE_PATH: #{$IMAGE_PATH}/ character/face;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    position: absolute;
    top: 0;
    left: 0;
    &.normal {
      background-image: url(#{$FACE_IMAGE_PATH}/face_normal.png);
    }
    &.brave {
      background-image: url(#{$FACE_IMAGE_PATH}/face_brave.png);
    }
    &.dandy {
      background-image: url(#{$FACE_IMAGE_PATH}/face_dandy.png);
    }
  }
  .upper_body {
    width: multiUnit(var(--upper_body-width));
    height: multiUnit(var(--upper_body-height));
    background-color: var(--upper_body-color);
    top: multiUnit(var(--head-height));
    left: 50%;
    transform: translateX(-50%);
  }
  .arm {
    width: multiUnit(var(--arm-width));
    height: multiUnit(var(--arm-height));
    background-color: var(--arm-color);
    top: 0;
    left: 0;
    transform: translateX(-100%);
    -webkit-box-reflect: right multiUnit(var(--upper_body-width));
  }
  .hand {
    width: multiUnit(var(--hand-width));
    height: multiUnit(var(--hand-height));
    background-color: var(--hand-color);
    top: multiUnit(var(--arm-height));
    left: 0;
    transform: translateX(-100%);
    -webkit-box-reflect: right multiUnit(var(--upper_body-width));
  }
  .lower_body {
    width: multiUnit(var(--lower_body-width));
    height: multiUnit(var(--lower_body-height));
    background-color: var(--lower_body-color);
    top: multiUnit(calc(var(--upper_body-height) + var(--head-height)));
    left: 50%;
    transform: translateX(-50%);
  }
  .leg {
    width: multiUnit(var(--leg-width));
    height: multiUnit(var(--leg-height));
    background-color: var(--leg-color);
    top: multiUnit(var(--lower_body-height));
    left: 0;
    -webkit-box-reflect: right
      multiUnit(calc(var(--lower_body-width) - var(--leg-width) * 2));
  }
  .foot {
    width: multiUnit(var(--foot-width));
    height: multiUnit(var(--foot-height));
    background-color: var(--foot-color);
    top: multiUnit(calc(var(--lower_body-height) + var(--leg-height)));
    left: multiUnit((calc(var(--leg-width) - var(--foot-width)) / 2));
    -webkit-box-reflect: right
      multiUnit(
        calc(var(--lower_body-width) - var(--leg-width) - var(--foot-width))
      );
  }
}
</style>
