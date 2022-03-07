import { Message } from "@/types";

export const removeSenderAvatars = (messages: Message[]) => {
  for (let i = 0; i < messages.length; i++) {
    const mes = messages[i];
    if (messages[i - 1] && mes.sender.uid == messages[i - 1].sender.uid) {
      mes.sender.photoURL = "";
    }
  }
  return messages;
};
