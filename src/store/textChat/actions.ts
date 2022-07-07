import { ADD_MESSAGE_ACTION, RootState } from "@/types/store";
import { ActionTree } from "vuex";
import { textChatActionTypes } from "@/types/store";
import { addMessage, getMoreMessages, getTextChat } from "@/queries/textChats";
import { removeSenderAvatars } from "@/utils/Data Helpers/editData";
import { TextMessage } from "@/types";

const textChatActions: ActionTree<RootState, RootState> = {
  [textChatActionTypes.SET_TEXT_CHAT]: async ({ rootState }, { groupId, chatId }) => {
    await getTextChat(groupId, chatId, rootState);
  },
  [textChatActionTypes.ADD_MESSAGE]: async (
    { rootState, commit },
    { messageData }: ADD_MESSAGE_ACTION["payload"]
  ) => {
    const message: TextMessage = {
      sender: rootState.user!.uid,
      text: messageData.text,
      createdAt: Date.now(),
    };

    await addMessage(
      rootState.group!.id,
      rootState.textChat!.id,
      message,
      messageData.fileData,
      commit
    );
  },
  [textChatActionTypes.GET_MORE_MESSAGES]: async ({ rootState }, page: number) => {
    if (rootState.textChat && rootState.group) {
      const messages = await getMoreMessages(rootState.group.id, rootState.textChat.id, page);
      rootState.textChat.messages = messages;
    }
  },
  [textChatActionTypes.SET_MESSAGES_BACK]: async ({ rootState }) => {
    if (rootState.textChat) {
      rootState.textChat.messages = await removeSenderAvatars(rootState.textChat.messages);
    }
  },
};

export default textChatActions;
