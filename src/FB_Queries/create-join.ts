import { writeBatch, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { v4 } from "uuid";
import { getDefaultGroupData } from "@/utils/Data Helpers/defaultData";

export const CreateNewGroup = async (userId: string, title: string) => {
  const batch = writeBatch(db);
  const id = v4();

  const newGroupRef = doc(db, "groups", id);
  batch.set(newGroupRef, getDefaultGroupData(userId, title));

  const generalTextChat = doc(db, "groups", id, "textChats", "general");
  batch.set(generalTextChat, { title: "general", createdAt: Date.now() });

  const firstVoiceChat = doc(db, "groups", id, "voiceChats", "general");
  batch.set(firstVoiceChat, { title: "general", createdAt: Date.now() });

  await batch.commit();
};

export const JoinGroup = async (groupId: string, userId: string) => {
  const groupRef = doc(db, "groups", groupId);
  const snapShot = await getDoc(groupRef);

  if (snapShot.exists()) {
    const data = snapShot.data();

    if (data.members.includes(userId)) {
      return "You already in this Group";
    } else {
      data.members.push(userId);
      setDoc(groupRef, data);
    }
  } else {
    return "Channel with this id does not exists";
  }
};
