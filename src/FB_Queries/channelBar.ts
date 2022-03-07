import { db } from "@/firebase";
import { getDoc, setDoc, doc } from "firebase/firestore";

export const addNewChat = async (type: "text" | "voice", title: string, groupId: string) => {
  const chatRef = doc(db, "groups", groupId, `${type}Chats`, title);
  const snapShot = await getDoc(chatRef);

  if (snapShot.exists()) {
    return "A chat with this title already exists!";
  } else {
    setDoc(chatRef, {
      title,
      createdAt: Date.now(),
    });
  }
};
