import { textChatActionTypes } from "@/types/store";

export interface ADD_MESSAGE_ACTION {
  type: textChatActionTypes.ADD_MESSAGE;
  payload: {
    groupId: string;
    chatId: string;
    messageData: {
      text: string;
      fileData?: [File, "image" | "audio"];
    };
  };
}
