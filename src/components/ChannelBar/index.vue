<template>
  <div class="channel_bar" :class="{ channel_bar__active: isOpen, hidden: !isOpen }">
    <div class="title_block">
      <div class="flex-auto">
        <h1 class="font-semibold text-xl leading-tight mb-1 truncate">{{ title }}</h1>
      </div>
      <i
        class="fa-solid fa-chevron-left chevron"
        @click="store.commit('setChannelBerIsOpen', false)"
      />
    </div>
    <TextChatList @open-modal="handleOpening" />
    <VoiceChatList @open-modal="handleOpening" />
    <Modal @close-modal="isModalOpen = false" :isModalOpen="isModalOpen">
      <ModalContent @close-modal="isModalOpen = false" :type="type" />
    </Modal>
    <VoiceChatController />
  </div>
</template>

<script setup lang="ts">
import TextChatList from "./ChatLists/Text.vue";
import VoiceChatList from "./ChatLists/Voice.vue";
import Modal from "@/components/Modal/index.vue";
import ModalContent from "./ModalContent.vue";
import VoiceChatController from "./VoiceChatController.vue";
import { ref, computed } from "vue";
import { useStore } from "@/store/store";

const store = useStore();
const title = computed(() => store.state.group.title);
const isOpen = computed(() => store.state.isChannelBarOpen);
const isModalOpen = ref(false);
const type = ref("");

const handleOpening = (val: "voice" | "text") => {
  type.value = val;
  isModalOpen.value = true;
};
</script>

<style scoped>
.channel_bar {
  @apply dark:bg-gray-800 w-64 ml-16 pb-6
  bg-gray-400 flex-none md:block
  md:relative md:rounded-none;
}

.channel_bar__active {
  @apply absolute rounded-xl z-30 overflow-y-auto
  md:block
  md:relative md:rounded-none;
}

.title_block {
  @apply dark:text-gray-300 text-gray-700 mb-2 mt-3 px-4 relative
  flex justify-between border-b border-gray-600 py-2 shadow-xl;
}

.chevron {
  @apply text-xl bg-black text-white
  px-3 py-1 rounded-full absolute md:opacity-0 opacity-100
  cursor-pointer right-1 top-0;
}
</style>
