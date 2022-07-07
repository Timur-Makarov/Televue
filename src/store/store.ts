import { groupModule } from "./group";
import { RootState } from "@/types/store";
import { InjectionKey } from "vue";
import { createStore, useStore as baseUseStore, Store, Module } from "vuex";
import { userModule } from "./user";
import { textChatModule } from "./textChat";
import { mutations } from "./mutaions";
import { voiceChatModule } from "./voiceChat";

export const key: InjectionKey<Store<RootState>> = Symbol();

const defaultAudioConfig = {
  audio: null,
  paused: false,
  volume: 0.2,
  currentTime: 0,
};

export const store = createStore({
  state: () => ({
    darkTheme: true,
    progressLine: 0,
    isChannelBarOpen: false,
    user: null,
    group: null,
    textChat: null,
    voiceChat: null,
    voiceChatClient: null,
    audioMessage: defaultAudioConfig,
  }),
  mutations,
  modules: {
    user: userModule,
    group: groupModule,
    textChat: textChatModule,
    voiceChat: voiceChatModule,
  },
});

export function useStore() {
  return baseUseStore(key);
}

export function createModule<T>(fields: Module<T, RootState>) {
  return fields;
}
