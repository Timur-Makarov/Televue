<template>
  <div class="mb-8">
    <div class="px-4 mb-2 dark:text-gray-300 text-gray-700 flex justify-between items-center">
      <div class="opacity-75 cursor-pointer">TEXT CHATS</div>
      <span
        v-if="group?.owner === user?.uid"
        class="cursor-pointer"
        @click="emit('openModal', 'text')"
      >
        <i class="fa-solid fa-plus dark:text-gray-300 text-gray-600"></i>
      </span>
    </div>
    <div v-for="chat in group?.textChats" :key="chat.id" class="item" @click="openChat(chat.id)">
      🖹 {{ chat.title }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, defineEmits } from "vue";
import { useStore } from "@/store/store";
import { textChatActionTypes } from "@/types/store";

const store = useStore();
const group = computed(() => store.state.group);
const textChat = computed(() => store.state.textChat);
const user = computed(() => store.state.user);

const emit = defineEmits<{ (event: "openModal", type: "voice" | "text"): void }>();

const openChat = (chatId: string) => {
  if (textChat.value?.id !== chatId && group.value) {
    store.dispatch(textChatActionTypes.SET_TEXT_CHAT, { groupId: group.value.id, chatId });
  }
};
</script>

<style scoped>
.item {
  @apply shadow-lg mb-1 bg-gray-500 dark:bg-gray-600
  cursor-pointer font-semibold py-1 px-4 
  text-gray-300 dark:text-gray-100;
}
</style>
