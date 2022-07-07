<template>
  <div v-if="client" class="controller">
    <button class="bg-red-400" @click="client?.leave()">
      <i class="fa-solid fa-phone" />
      <p>Leave</p>
    </button>
    <button class="bg-blue-400" @click="toggleMute">
      <i class="fa-solid fa-volume-mute" />
      <p>Mute</p>
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "@/store/store";
import { voiceChatActionTypes } from "@/types/store";

const store = useStore();
const client = computed(() => store.state.voiceChatClient?.client);
const audioTrack = computed(() => store.state.voiceChatClient?.audioTrack);
const groupId = computed(() => store.state.group?.id);
const chatId = computed(() => store.state.voiceChat?.id);

const toggleMute = () => {
  if (client.value && audioTrack.value && groupId.value && chatId.value) {
    store.dispatch(voiceChatActionTypes.SET_MUTED, {
      groupId: groupId.value,
      chatId: chatId.value,
      muted: !audioTrack.value.muted,
    });
    audioTrack.value.setMuted(!audioTrack.value.muted);
  }
};
</script>

<style scoped>
.controller {
  @apply absolute bottom-1 left-0 right-0
  h-11 flex gap-6 items-center p-2 dark:bg-gray-600
  justify-center bg-gray-500;
}

button {
  @apply px-5 py-2 rounded-md flex items-center
  dark:text-gray-300 text-gray-700 justify-center
  gap-2;
}
</style>
