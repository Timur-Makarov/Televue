import { populateSender } from "@/FB_Queries/textChats";
import { Message } from "@/types";

export const removeSendersAvatar = async (messages: any[]) => {
  for (let i = 0; i < messages.length; i++) {
    const mes = messages[i];
    if (typeof mes.sender === "string") {
      mes.sender = await populateSender(mes.sender);
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

  return await removeSendersAvatar(res);
};
