import { RootState } from "@/types/store";
import { ActionTree } from "vuex";
import { TextChat, VoiceChat } from "@/types";
import { groupActionTypes } from "@/types/store";
import { getGroup } from "@/FB_Queries/groups";
import { getTextChat } from "@/FB_Queries/textChats";

const groupActions: ActionTree<RootState["group"], RootState> = {
  [groupActionTypes.SET_GROUP]: async (
    { rootState },
    payload: {
      groupId: string;
      userId: string;
    }
  ) => {
    await getTextChat(payload.groupId, "general", rootState);
    await getGroup(payload.groupId, payload.userId, rootState);
  },

  [groupActionTypes.SET_TEXT_CHATS]({ rootState }, chats: TextChat[]) {
    rootState.group.textChats = chats;
  },

  [groupActionTypes.SET_VOICE_CHATS]({ rootState }, chats: VoiceChat[]) {
    rootState.group.voiceChats = chats;
  },
};

export default groupActions;
