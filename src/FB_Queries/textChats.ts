import { db, storage } from "@/firebase";
import { Message, TextChat } from "@/types";
import { RootState } from "@/types/store";
import { removeSenderAvatars } from "@/utils/Data Helpers/editData";
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

const MESSAGES_PER_PAGE = 15;

export const getTextChat = async (groupId: string, chatId: string, state: RootState) => {
  const chatRef = doc(db, "groups", groupId, "textChats", chatId);
  onSnapshot(chatRef, (snapShot) => {
    //@ts-expect-error: Unreachable Error
    state.textChat = { ...snapShot.data(), id: snapShot.id, messages: [], pageOfMessages: 1 };
  });

  const messagesRef = collection<Message>(db, chatRef.path, "messages");
  const q = query(messagesRef, limitToLast(MESSAGES_PER_PAGE), orderBy("createdAt"));
  onSnapshot(q, (snapShot) => {
    const newMessages: Message[] = [];
    snapShot.forEach((mes) => {
      newMessages.push({ ...mes.data(), id: mes.id });
    });
    if (state.textChat.pageOfMessages === 1) {
      state.textChat.messages = removeSenderAvatars(newMessages);
    } else {
      state.textChat.messages.push(removeSenderAvatars(newMessages)[MESSAGES_PER_PAGE - 1]);
    }
  });
};

export const addMessage = async (
  groupId: string,
  chatId: string,
  message: Message,
  fileData: [File, "image" | "audio"] | undefined,
  commit: Commit
) => {
  if (!fileData && !message.text) return;

  const messagesRef = collection<Message>(db, "groups", groupId, "textChats", chatId, "messages");

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

  snapShot.forEach((msg) => messages.push({ ...msg.data(), id: msg.id }));
  return removeSenderAvatars(messages);
};
