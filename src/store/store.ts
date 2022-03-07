import { groupModule } from "./group";
import { RootState } from "@/types/store";
import { InjectionKey } from "vue";
import { createStore, useStore as baseUseStore, Store, Module } from "vuex";
import { userModule } from "./user";
import { TextChat, VoiceChatClient } from "@/types";
import { textChatModule } from "./textChat";
import { mutations } from "./mutaions";
import { voiceChatModule } from "./voiceChat";

export const key: InjectionKey<Store<RootState>> = Symbol();

export const store = createStore({
  state: () => ({
    darkTheme: true,
    user: {} as RootState["user"],
    group: {} as RootState["group"],
    textChat: {} as TextChat,
    voiceChat: null,
    voiceChatClient: {} as VoiceChatClient,
    progressLine: 0,
    audioMessage: {
      audio: null,
      paused: false,
      volume: 0.2,
    },
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
