<template>
  <div class="dark:bg-gray-800 flex-none w-64 ml-16 pb-6 hidden md:block bg-gray-400 relative">
    <div
      class="dark:text-gray-300 text-gray-700 mb-2 mt-3 px-4 flex justify-between border-b border-gray-600 py-1 shadow-xl"
    >
      <div class="flex-auto">
        <h1 class="font-semibold text-xl leading-tight mb-1 truncate">{{ title }}</h1>
      </div>
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
const isModalOpen = ref(false);
const type = ref("");

const handleOpening = (val: "voice" | "text") => {
  type.value = val;
  isModalOpen.value = true;
};
</script>
