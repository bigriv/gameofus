<template>
  <div class="message_frame">
    <div class="messages">
      <slot>
        <div
          v-for="(text, index) in typeWriter.texts"
          :key="index"
          class="text"
          :class="{
            'message-end':
              messages[index].length == typeWriter.texts[index].length,
          }"
        >
          {{ text }}
        </div>
      </slot>
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, reactive, watch } from "vue";

export default defineComponent({
  name: "MessageFrame",
  props: {
    messages: {
      type: Array,
      default: [],
    },
  },
  setup(props) {
    const typeWriter = reactive({
      texts: [],
      col: 0,
      pos: 0,
      timerId: null,
    });
    const removeInterval = () => {
      if (typeWriter.timerId) {
        clearInterval(typeWriter.timerId);
        typeWriter.timerId = null;
      }
    };
    const animateTypeWrite = () => {
      removeInterval();
      if (!props.messages?.length) {
        return;
      }
      typeWriter.texts = [];
      typeWriter.timerId = setInterval(() => {
        console.log("setText", typeWriter.col, typeWriter.pos);
        typeWriter.texts[typeWriter.col] = props.messages[typeWriter.col].slice(
          0,
          ++typeWriter.pos
        );
        if (typeWriter.pos >= props.messages[typeWriter.col].length) {
          typeWriter.col++;
          typeWriter.pos = 0;
        }
        if (typeWriter.col >= props.messages.length) {
          removeInterval();
        }
      }, 100);
    };
    onMounted(() => {
      animateTypeWrite();
    });
    watch(
      () => props.messages,
      () => {
        animateTypeWrite();
      }
    );
    return {
      typeWriter,
    };
  },
});
</script>

<style scoped lang="scss">
.message_frame {
  width: 100%;
  height: 100%;
  background-color:  rgba(255, 255, 255, 0.8);
  border: 2rem solid #000;
  border-radius: 2rem;
  padding: 2rem;
  font-size: 16rem;
  .messages {
    width: 100%;
    height: 100%;
    background-color: rgba(70, 130, 180, 0.9);
    border: 2rem solid #000;
    border-radius: 2rem;
    padding: 8rem;
    .text {
      width: fit-content;
      padding-right: 2rem;
      line-height: 1.2;
      &.message-end {
        animation: none;
      }
    }
  }
}
</style>
