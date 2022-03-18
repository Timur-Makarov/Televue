<template>
  <ChannelBar />
  <div class="content-container">
    <TopBar @query-update="handleSearch" />
    <div v-if="messagesByQuery.length" class="message-list" ref="chatWindowRef">
      <MessageComponent
        @set-scroll="ScrollToBottom"
        v-for="message of messagesByQuery"
        :key="message.id"
        :message="message"
        :class="{
          'pl-1': !message.showSenderAvatar,
        }"
      />
    </div>
    <div v-else class="message-list" ref="chatWindowRef">
      <MessageComponent
        @set-scroll="ScrollToBottom"
        v-for="message of messages"
        :key="message.id"
        :message="message"
        :class="{
          'pl-1': !message.showSenderAvatar,
        }"
      />
    </div>
    <MessageForm />
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watchEffect } from "vue";
import TopBar from "@/components/TopBar/index.vue";
import MessageComponent from "./Message.vue";
import ChannelBar from "@/components/ChannelBar/index.vue";
import MessageForm from "./MessageForm/index.vue";
import { useStore } from "@/store/store";
import { textChatActionTypes } from "@/types/store";
import { debounce, throttle } from "@/utils/helpers";
import { getMessagesByQuery } from "@/utils/Data Helpers/editData";
import { Message } from "@/types/index";

const store = useStore();
const messages = computed(() => store.state.textChat.messages);
const messagesByQuery = ref<Message[]>([]);
const page = computed(() => store.state.textChat.pageOfMessages);

const chatWindowRef = ref<HTMLDivElement | null>(null);
const ScrollToBottom = () => {
  if (chatWindowRef.value) {
    const { scrollTop, scrollHeight } = chatWindowRef.value;
    if (page.value == 1 || scrollTop >= scrollHeight / 1.235) {
      chatWindowRef.value.scrollTop = chatWindowRef.value.scrollHeight;
    }
  }
};

const handleScroll = () => {
  if (chatWindowRef.value) {
    const { scrollTop, scrollHeight } = chatWindowRef.value;
    if (scrollTop < scrollHeight / 7) {
      store.commit("addPageOfMessages");
      store.dispatch(textChatActionTypes.GET_MORE_MESSAGES, page.value);
    }
  }
};

const handleSearch = async (query: string) => {
  if (query) {
    messagesByQuery.value = await getMessagesByQuery(messages.value, query);
  } else {
    store.dispatch(textChatActionTypes.SET_MESSAGES_BACK);
    messagesByQuery.value = [];
  }
};

watchEffect(() => {
  if (chatWindowRef.value) {
    chatWindowRef.value.addEventListener("scroll", debounce(handleScroll, 50));
  }
});
</script>

<style scoped></style>
