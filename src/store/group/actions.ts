import { RootState } from "@/types/store";
import { ActionTree } from "vuex";
import { TextChat, VoiceChat } from "@/types";
import { groupActionTypes } from "@/types/store";
import { getGroup } from "@/queries/groups";
import { getTextChat } from "@/queries/textChats";

const groupActions: ActionTree<RootState["group"], RootState> = {
  [groupActionTypes.SET_GROUP]: async (
    { rootState },
    payload: {
      groupId: string;
      userId: string;
    }
  ) => {
    await getTextChat(payload.groupId, "general", rootState);
    await getGroup(payload.groupId, rootState);
  },

  [groupActionTypes.SET_TEXT_CHATS]({ rootState }, chats: TextChat[]) {
    if (rootState.group) {
      rootState.group.textChats = chats;
    }
  },

  [groupActionTypes.SET_VOICE_CHATS]({ rootState }, chats: VoiceChat[]) {
    if (rootState.group) {
      rootState.group.voiceChats = chats;
    }
  },
};

export default groupActions;
