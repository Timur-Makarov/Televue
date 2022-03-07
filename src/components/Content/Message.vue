<template>
  <div ref="messageRef" class="message">
    <div class="avatar-wrapper">
      <img v-if="message.sender.photoURL" :src="message.sender.photoURL" class="avatar" />
    </div>

    <div class="message-content">
      <p class="message-sender">
        {{ message.sender.displayName }}
        <small class="timestamp">{{ time }}</small>
      </p>
      <p class="message-text">{{ message.text }}</p>
      <img v-if="message.imageURL" :src="message.imageURL" @load="emit('setScroll')" />
      <AudioBlock v-if="message.audioURL" :src="message.audioURL" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType, defineProps, defineEmits, computed, onMounted } from "vue";
import { Message } from "@/types/index";
import { getTimeSince } from "@/utils/timeHandlers/timeSince";
import AudioBlock from "./AudioBlock/index.vue";

const time = computed(() => getTimeSince(props.message.createdAt));
const emit = defineEmits<{ (event: "setScroll"): void }>();
const props = defineProps({
  message: { type: Object as PropType<Message>, required: true },
});

onMounted(() => emit("setScroll"));
</script>

<style scoped>
img {
  @apply max-h-52 max-w-xs;
}
</style>
