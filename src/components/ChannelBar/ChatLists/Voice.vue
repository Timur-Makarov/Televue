<template>
  <div class="mb-8">
    <div class="px-4 mb-2 dark:text-gray-300 text-gray-700 flex justify-between items-center">
      <div class="opacity-75 cursor-pointer">VOICE CHATS</div>
      <span
        v-if="group?.owner === user?.uid"
        class="cursor-pointer"
        @click="emit('openModal', 'voice')"
      >
        <i class="fa-solid fa-plus dark:text-gray-300 text-gray-600"></i>
      </span>
    </div>
    <div v-for="chat in group?.voiceChats" :key="chat.id" @click="joinChat(chat.id)">
      <div class="item">
        <p>🔊 {{ chat.title }}</p>
        <img v-if="isConnecting" src="http://media.giphy.com/media/s4KqhlPU9Ypnq/giphy.gif" />
      </div>
      <div v-for="user in chat.participants" :key="user.userInfo.uid" class="participant">
        <img :src="user.userInfo.photoURL" />
        <p>{{ user.userInfo.displayName }}</p>
        <i v-if="user.muted" class="text-red-600 fa-solid fa-microphone-slash ml-auto mr-2" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useStore } from "@/store/store";
import { voiceChatActionTypes } from "@/types/store";
import AgoraRTC, { ILocalAudioTrack, IAgoraRTCClient, IAgoraRTCRemoteUser } from "agora-rtc-sdk-ng";
import io from "socket.io-client";
import axios from "axios";

const socket = io("http://localhost:4000");

const store = useStore();
const group = computed(() => store.state.group);
const voiceChat = computed(() => store.state.voiceChat);
const user = computed(() => store.state.user);

const emit = defineEmits<{ (event: "openModal", type: "voice" | "text"): void }>();

const localAudioTrack = ref<ILocalAudioTrack | null>(null);
const currClient = ref<IAgoraRTCClient | null>(null);
const isConnecting = ref(false);
const currUser = ref<IAgoraRTCRemoteUser | null>({} as IAgoraRTCRemoteUser);

const getRTCClient = () => {
  const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });

  client.on("user-published", async (user, mediaType) => {
    await client.subscribe(user, mediaType);
    currUser.value = user;

    if (mediaType === "audio") {
      user.audioTrack?.play();
    }
  });

  client.on("user-unpublished", async (user) => {
    await client.unsubscribe(user);
  });

  client.on("connection-state-change", (state) => {
    if (state === "DISCONNECTING") {
      if (voiceChat.value) {
        store.dispatch(voiceChatActionTypes.PARTICIPANT_LEFT, {
          groupId: voiceChat.value.groupId,
          chatId: voiceChat.value.id,
        });
      }
      store.commit("setVoiceClient", null);
      store.commit("setLocalAudioTrack", null);
    }
  });

  return client;
};

async function joinVoiceChat(chatId: string) {
  if (group.value) {
    const client = getRTCClient();
    const channelId = group.value.id + "|" + chatId;
    const AgoraToken = process.env.AGORA_TOKEN;

    const { data } = await axios.get<{ token: string; uid: number }>(
      `http://localhost:4000/token?chatId=${channelId}`
    );

    const UID = await client.join(AgoraToken, channelId, data.token, data.uid);

    const audioTrack = await AgoraRTC.createMicrophoneAudioTrack();

    await client.publish([audioTrack]);

    localAudioTrack.value = audioTrack;
    currClient.value = client;
    store.commit("setVoiceClient", client);
    store.commit("setLocalAudioTrack", audioTrack);
    return UID;
  }
}

const joinChat = async (chatId: string) => {
  if (group.value && user.value) {
    isConnecting.value = true;
    if (currClient.value) currClient.value.leave();

    const UID = await joinVoiceChat(chatId);
    store.dispatch(voiceChatActionTypes.ADD_PARTICIPANT, {
      groupId: group.value.id,
      chatId,
      UID,
    });
    store.dispatch(voiceChatActionTypes.SET_VOICE_CHAT, {
      groupId: group.value.id,
      chatId,
    });
    socket.emit("chatData", {
      groupId: group.value.id,
      chatId,
      userId: user.value.uid,
    });
    isConnecting.value = false;
  }
};
</script>

<style scoped>
.item {
  @apply cursor-pointer flex py-1 px-4 justify-between items-center
  shadow-lg mb-1 bg-zinc-500 dark:bg-zinc-600;
}

.item img {
  @apply w-4;
}

.item p {
  @apply font-semibold text-gray-300 dark:text-gray-100;
}

.participant {
  @apply flex items-center gap-2 h-7
  pl-5 mb-1 p-1 dark:text-gray-300 text-gray-700;
}

.participant img {
  @apply h-full w-7 rounded-full;
}
</style>
