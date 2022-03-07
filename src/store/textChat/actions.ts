import { RootState } from "@/types/store";
import { ActionTree } from "vuex";
import { Group, TextChat, Message } from "@/types";
import { textChatActionTypes } from "@/types/store";
import { addMessage, getMoreMessages, getTextChat } from "@/FB_Queries/textChats";
import { ADD_MESSAGE_ACTION } from "@/types/textChat/actions";

const textChatActions: ActionTree<RootState, RootState> = {
  [textChatActionTypes.SET_TEXT_CHAT]: async ({ rootState }, { groupId, chatId }) => {
    await getTextChat(groupId, chatId, rootState);
  },
  [textChatActionTypes.ADD_MESSAGE]: async (
    { rootState, commit },
    { messageData }: ADD_MESSAGE_ACTION["payload"]
  ) => {
    const message: Message = {
      sender: {
        photoURL: rootState.user.photoURL || "",
        displayName: rootState.user.displayName || "",
        uid: rootState.user.uid,
      },
      text: messageData.text,
      createdAt: Date.now(),
    };

    await addMessage(
      rootState.group.id,
      rootState.textChat.id,
      message,
      messageData.fileData,
      commit
    );
  },
  [textChatActionTypes.GET_MORE_MESSAGES]: async ({ rootState }, page: number) => {
    const messages = await getMoreMessages(rootState.group.id, rootState.textChat.id, page);
    rootState.textChat.messages = messages;
  },
};

export default textChatActions;
