/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-nocheck

import { db, storage } from "@/firebase";
import { Message, TextChat } from "@/types";
import { RootState } from "@/types/store";
import { removeSendersAvatar } from "@/utils/Data Helpers/editData";
import {
  collection,
  addDoc,
  onSnapshot,
  doc,
  query,
  orderBy,
  limitToLast,
  getDocs,
} from "firebase/firestore";
import { v4 } from "uuid";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { Commit } from "vuex";
import { getUser } from "./user";

const MESSAGES_PER_PAGE = 15;

export const getTextChat = async (groupId: string, chatId: string, state: RootState) => {
  const chatRef = doc(db, "groups", groupId, "textChats", chatId);
  onSnapshot(chatRef, (snapShot) => {
    //@ts-expect-error: Unreachable Error
    state.textChat = { ...snapShot.data(), id: snapShot.id, messages: [], pageOfMessages: 1 };
  });

  const messagesRef = collection(db, chatRef.path, "messages");
  const q = query(messagesRef, limitToLast(MESSAGES_PER_PAGE), orderBy("createdAt"));
  onSnapshot(q, async (snapShot) => {
    const newMessages: Message[] = [];
    snapShot.forEach(async (mes) => {
      const newMessage = { ...mes.data(), id: mes.id };
      newMessages.push(newMessage);
    });

    if (state.textChat.pageOfMessages === 1) {
      state.textChat.messages = await removeSendersAvatar(newMessages);
    } else {
      state.textChat.messages.push((await removeSendersAvatar(newMessages))[MESSAGES_PER_PAGE - 1]);
    }
  });
};

export const addMessage = async (
  groupId: string,
  chatId: string,
  message: any,
  fileData: [File, "image" | "audio"] | undefined,
  commit: Commit
) => {
  if (!fileData && !message.text) return;

  const messagesRef = collection<Message>(db, "groups", groupId, "textChats", chatId, "messages");
  console.log(fileData, message);

  if (fileData) {
    const [file, type] = fileData;
    const fileRef = ref(storage, `${groupId}/textChats/${chatId}/${type}s/${v4()}`);

    const uploadTask = uploadBytesResumable(fileRef, file, {
      contentType: type == "image" ? "image/jpg" : "audio/mp3",
    });

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        commit("setProgress", (snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      },
      (error) => console.log(error.message),
      async () => {
        const url = await getDownloadURL(uploadTask.snapshot.ref);
        if (type == "image") message.imageURL = url;
        else message.audioURL = url;

        await addDoc(messagesRef, message);
        commit("setProgress", 0);
      }
    );
    return;
  } else {
    await addDoc(messagesRef, message);
  }
};

export const getMoreMessages = async (groupId: string, chatId: string, page: number) => {
  const messagesRef = collection<Message>(db, "groups", groupId, "textChats", chatId, "messages");
  const q = query(messagesRef, limitToLast(MESSAGES_PER_PAGE * page), orderBy("createdAt"));

  const snapShot = await getDocs(q);
  const messages: Message[] = [];

  snapShot.forEach(async (msg) => {
    const newMessage = { ...msg.data(), id: msg.id };
    messages.push(newMessage);
  });
  return await removeSendersAvatar(messages);
};

export const populateSender = async (sender: string) => {
  const user = await getUser(sender);
  return user;
};
