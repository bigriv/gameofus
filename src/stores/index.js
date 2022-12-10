import { defineStore } from "pinia";

const useStore = defineStore("store", {
  state: () => ({
    reflesh: false,
  }),
  actions: {
    refleshStart() {
      this.reflesh = true;
      console.log("refleshStart");
    },
    refleshEnd() {
      this.reflesh = false;
      console.log("refleshEnd");
    },
  },
});

export default useStore;
