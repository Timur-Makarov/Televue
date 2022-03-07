<template>
  <div class="mb-8">
    <div class="px-4 mb-2 dark:text-gray-300 text-gray-700 flex justify-between items-center">
      <div class="opacity-75 cursor-pointer">TEXT CHATS</div>
      <span
        v-if="store.state.group.owner === store.state.user.uid"
        class="cursor-pointer"
        @click="emit('openModal', 'text')"
      >
        <i class="fa-solid fa-plus dark:text-gray-300 text-gray-600"></i>
      </span>
    </div>
    <div v-for="chat in list" :key="chat.id" class="item" @click="openChat(chat.id)">
      🖹 {{ chat.title }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, defineEmits } from "vue";
import { useStore } from "@/store/store";
import { textChatActionTypes } from "@/types/store";

const store = useStore();
const list = computed(() => store.state.group.textChats);

const emit = defineEmits<{ (event: "openModal", type: "voice" | "text"): void }>();

const openChat = (chatId: string) => {
  if (store.state.textChat?.id) {
    if (store.state.textChat.id == chatId) {
      return;
    }
  }
  store.dispatch(textChatActionTypes.SET_TEXT_CHAT, { groupId: store.state.group.id, chatId });
};
</script>

<style scoped>
.item {
  @apply shadow-lg mb-1 bg-gray-500 dark:bg-gray-600
  cursor-pointer font-semibold py-1 px-4 
  text-gray-300 dark:text-gray-100;
}
</style>
