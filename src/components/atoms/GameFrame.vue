<template>
  <div class="frame" :style="styles">
    <slot />
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    width: {
      type: String,
      default: "800rem",
    },
    height: {
      type: String,
      default: "800rem",
    },
    bgimg: {
      type: String,
      default: "/src/assets/vue.svg",
    },
    bgcolor: {
      type: String,
      default: "#fff",
    },
    brcolor: {
      type: String,
      default: "#000",
    },
  },
  setup(props) {
    const styles = {
      "--width": props.width,
      "--height": props.height,
      "--bgcolor": props.bgcolor,
      "--brcolor": props.brcolor,
      "background-image": `url(${props.bgimg}`,
    };

    return {
      styles,
    };
  },
});
</script>

<style scoped lang="scss">
.frame {
  position: relative;
  padding: 12rem;
  border-width: 8rem;
  border-style: solid;
  border-color: var(--brcolor);
  width: var(--width);
  height: var(--height);
  background-color: var(--bgcolor);
  background-size: 100%;
  background-repeat: no-repeat;
  &::before {
    content: "";
    position: absolute;
    top: 4rem;
    left: 4rem;
    width: calc(100% - 24rem);
    height: calc(100% - 24rem);
    border-width: 8rem;
    border-style: solid;
    border-color: var(--brcolor);
  }
}
</style>
