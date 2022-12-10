<template>
  <div
    class="frame"
    :class="{ scroll: !!scroll, 'scroll-stop': scroll?.stop }"
    :style="styles"
  >
    <slot />
  </div>
</template>

<script>
import { defineComponent, computed } from "vue";
import { IMAGE_ROOT_PATH } from "/src/composables/utils/const";

export default defineComponent({
  name: "GameFrame",
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
      default: null,
    },
    bgcolor: {
      type: String,
      default: "#fff",
    },
    brcolor: {
      type: String,
      default: "#000",
    },
    scroll: {
      type: Object,
      default: null,
    },
  },
  setup(props) {
    const styles = computed(() => {
      return {
        "--width": props.width,
        "--height": props.height,
        "--bgcolor": props.bgcolor,
        "--brcolor": props.brcolor,
        "background-image": props.bgimg
          ? `url(${IMAGE_ROOT_PATH + props.bgimg}`
          : "none",
        "--scroll_direction": props.scroll?.direction,
        "--scroll_speed": props.scroll?.speed,
      };
    });

    return {
      styles,
    };
  },
});
</script>

<style scoped lang="scss">
.frame {
  position: relative;
  border-width: 16rem;
  border-style: double;
  border-color: var(--brcolor);
  width: var(--width);
  height: var(--height);
  background-color: var(--bgcolor);
  background-size: 100%;
  background-repeat: no-repeat;
  &.scroll {
    background-size: 200%;
    animation: animation-scroll var(--scroll_speed) linear infinite;
    background-position: 100% 0%;
    &.scroll-stop {
      animation-play-state: paused;
    }
  }
  @keyframes animation-scroll {
    100% {
      background-position: 0% 0%;
    }
  }
}
</style>
