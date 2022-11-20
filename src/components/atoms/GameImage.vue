<template>
  <div class="image-wrap"><img :src="image" /></div>
</template>

<script>
import { defineComponent, computed } from "vue";
import { IMAGE_ROOT_PATH } from "/src/composables/utils/const";

export default defineComponent({
  props: {
    src: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const image = computed(() => IMAGE_ROOT_PATH + props.src);
    return {
      image,
    };
  },
});
</script>

<style scoped lang="scss">
.image-wrap {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
