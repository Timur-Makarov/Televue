<template>
  <div class="buttons_wrapper">
    <button @click="emit('setType', 'create')">
      <img :src="createGroupImage" />
      <h4>Create new Group</h4>
    </button>
    <button @click="emit('setType', 'join')">
      <img :src="joinToGroupImage" />
      <h4>Join to Group</h4>
    </button>
  </div>
</template>

<script setup lang="ts">
import { createGroupImage, joinToGroupImage } from "@/utils/staticImages";
import { defineEmits } from "vue";

const emit = defineEmits<{
  (event: "setType", type: string): void;
}>();
</script>

<style scoped>
.buttons_wrapper {
  @apply flex gap-3 justify-center;
}

.buttons_wrapper > button {
  @apply flex flex-col gap-4 h-64 shadow-xl bg-gray-700 w-52
    rounded-lg justify-center items-center text-gray-300 text-lg;
}

.buttons_wrapper > button > img {
  @apply h-[70%] rounded-2xl;
}
</style>
