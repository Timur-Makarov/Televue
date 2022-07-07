import { RootState } from "@/types/store";
import { ActionTree } from "vuex";
import { Participant } from "@/types";
import { voiceChatActionTypes } from "@/types/store";
import { addParticipant, deleteParticipant, getVoiceChat, setMuted } from "@/queries/voiceChat";

const voiceChatActions: ActionTree<RootState, RootState> = {
  [voiceChatActionTypes.SET_VOICE_CHAT]: async ({ rootState }, { groupId, chatId }) => {
    await getVoiceChat(groupId, chatId, rootState);
  },
  [voiceChatActionTypes.ADD_PARTICIPANT]: async ({ rootState }, { groupId, chatId, UID }) => {
    if (rootState.user) {
      const newParticipant: Participant = {
        userInfo: {
          displayName: rootState.user.displayName || "",
          photoURL: rootState.user.photoURL || "",
          uid: rootState.user.uid,
        },
        joinedAt: Date.now(),
        uid: String(UID),
        muted: false,
      };

      await addParticipant(groupId, chatId, newParticipant);
    }
  },
  [voiceChatActionTypes.PARTICIPANT_LEFT]: ({ rootState }, { groupId, chatId }) => {
    if (rootState.user) {
      deleteParticipant(groupId, chatId, rootState.user.uid);
    }
  },
  [voiceChatActionTypes.SET_MUTED]: ({ rootState }, { groupId, chatId, muted }) => {
    if (rootState.user) {
      setMuted(groupId, chatId, rootState.user.uid, muted);
    }
  },
};

export default voiceChatActions;
