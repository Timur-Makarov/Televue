import { populateSender } from "@/queries/textChats";
import { Message } from "@/types";

export const removeSenderAvatars = async (messages: Message[]) => {
  for (let i = 0; i < messages.length; i++) {
    const mes = messages[i];
    if (typeof mes.sender === "string") {
      const sender = await populateSender(mes.sender);
      if (sender) mes.sender = sender;
    }
    if (messages[i - 1] && mes.sender.uid == messages[i - 1].sender.uid) {
      mes.showSenderAvatar = false;
    } else {
      mes.showSenderAvatar = true;
    }
  }
  return messages as Message[];
};

export const getMessagesByQuery = async (messages: Message[], query: string) => {
  const res = messages.reduce<Message[]>((acc, mes) => {
    if (mes.text.toLowerCase().includes(query.toLowerCase())) {
      acc.push(mes);
    }
    return acc;
  }, []);

  return await removeSenderAvatars(res);
};
