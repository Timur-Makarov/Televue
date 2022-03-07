import { RootState } from "@/types/store";
import { ActionTree } from "vuex";
import { Group, TextChat, Message, Participant } from "@/types";
import { voiceChatActionTypes } from "@/types/store";
import { addParticipant, deleteParticipant, getVoiceChat, setMuted } from "@/FB_Queries/voiceChat";

const voiceChatActions: ActionTree<RootState, RootState> = {
  [voiceChatActionTypes.SET_VOICE_CHAT]: async ({ rootState }, { groupId, chatId, audioTrack }) => {
    await getVoiceChat(groupId, chatId, rootState);
  },
  [voiceChatActionTypes.ADD_PARTICIPANT]: async ({ rootState }, { groupId, chatId, UID }) => {
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
  },
  [voiceChatActionTypes.PARTICIPANT_LEFT]: ({ rootState }, { groupId, chatId }) => {
    deleteParticipant(groupId, chatId, rootState.user.uid);
  },
  [voiceChatActionTypes.SET_MUTED]: ({ rootState }, { groupId, chatId, muted }) => {
    setMuted(groupId, chatId, rootState.user.uid, muted);
  },
};

export default voiceChatActions;
