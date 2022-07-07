import { writeBatch, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { v4 } from "uuid";
import { getDefaultGroupData } from "@/utils/Data Helpers/defaultData";

export const createNewGroup = (userId: string, title: string) => {
  return new Promise((resolve, reject) => {
    const batch = writeBatch(db);
    const id = v4();

    const newGroupRef = doc(db, "groups", id);
    batch.set(newGroupRef, getDefaultGroupData(userId, title));

    const generalTextChat = doc(db, "groups", id, "textChats", "general");
    batch.set(generalTextChat, { title: "general", createdAt: Date.now() });

    const firstVoiceChat = doc(db, "groups", id, "voiceChats", "general");
    batch.set(firstVoiceChat, { title: "general", createdAt: Date.now() });

    batch.commit().then(resolve).catch(reject);
  });
};

export const joinGroup = async (groupId: string, userId: string) => {
  return new Promise((_, reject) => {
    const groupRef = doc(db, "groups", groupId);
    getDoc(groupRef).then((snapShot) => {
      if (snapShot.exists()) {
        const data = snapShot.data();

        if (data.members.includes(userId)) {
          return "You already in this Group";
        } else {
          data.members.push(userId);
          setDoc(groupRef, data);
        }
      } else {
        reject("Channel with this id does not exists");
      }
    });
  });
};
