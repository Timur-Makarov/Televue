import { db } from "@/firebase";
import { getDoc, setDoc, doc } from "firebase/firestore";

export const addNewChat = (type: "text" | "voice", title: string, groupId: string) => {
  return new Promise((_, reject) => {
    const chatRef = doc(db, "groups", groupId, `${type}Chats`, title);
    getDoc(chatRef).then((snapShot) => {
      if (snapShot.exists()) {
        reject("A chat with this title already exists!");
      } else {
        setDoc(chatRef, { title, createdAt: Date.now() });
      }
    });
  });
};
