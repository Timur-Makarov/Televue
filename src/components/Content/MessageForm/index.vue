<template>
  <div className="bottom-bar">
    <div class="progress-bar" :style="{ width: progressLine + '%' }" />
    <span @click="toggle">
      <i
        class="fa-solid text-xl"
        :class="{ 'fa-circle-minus': isShown, 'fa-circle-plus': !isShown }"
      />
    </span>
    <input
      v-model="text"
      @focus="onFocus"
      @blur="onBlur"
      type="text"
      placeholder="Enter message..."
      className="bottom-bar-input"
    />
    <AddMedia @set-file="setFile" :isShown="isShown" />
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect, computed, watch } from "vue";
import { useStore } from "@/store/store";
import { textChatActionTypes } from "@/types/store";
import AddMedia from "./AddMedia.vue";

const store = useStore();
const text = ref("");
const isShown = ref(false);
const fileData = ref<[File, "image" | "audio"] | null>(null);

const setFile = (...args: [File, "image" | "audio"]) => (fileData.value = args);
const progressLine = computed(() => store.state.progressLine);

const onSubmit = () => {
  store.dispatch(textChatActionTypes.ADD_MESSAGE, {
    messageData: {
      text: text.value,
      fileData: fileData.value,
    },
  });
  text.value = "";
  fileData.value = null;
  isShown.value = false;
};

const eventHandler = (e: any) => {
  if (e.key === "Enter") onSubmit();
};

watchEffect(() => {
  if (fileData.value) onSubmit();
});

watch([progressLine], () => {
  console.log(progressLine.value);
});

const toggle = () => (isShown.value = !isShown.value);

const onFocus = () => {
  window.addEventListener("keypress", eventHandler);
};

const onBlur = () => {
  window.removeEventListener("keypress", eventHandler);
};
</script>

<style scoped>
.progress-bar {
  @apply absolute right-0.5 left-0.5 w-full bg-green-800 h-2 top-[-10%]
  rounded;
}
</style>
