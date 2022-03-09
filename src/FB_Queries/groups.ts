/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-nocheck

import { db, storage } from "@/firebase";
import { Group, TextChat, VoiceChat } from "@/types";
import { RootState } from "@/types/store";
import { updateProfile } from "firebase/auth";
import { collection, getDoc, onSnapshot, doc, updateDoc } from "firebase/firestore";
import { uploadBytesResumable, getDownloadURL, ref } from "firebase/storage";
import { v4 } from "uuid";
import { getAllVoiceChats } from "./voiceChat";

export const getGroup = async (groupId: string, userId: string, state: RootState) => {
  const groupRef = doc(db, "groups", groupId);
  const snapShot = await getDoc(groupRef);
  state.group = { ...snapShot.data(), id: snapShot.id } as Group;

  const textChatsRef = collection<TextChat>(db, "groups", groupId, "textChats");

  onSnapshot(textChatsRef, (snapShot) => {
    const tChats: TextChat[] = [];
    snapShot.forEach((c) => tChats.push({ ...c.data(), id: c.id }));
    state.group.textChats = tChats;
  });

  const voiceChatsRef = collection<VoiceChat>(db, "groups", groupId, "voiceChats");

  onSnapshot(voiceChatsRef, async () => {
    await getAllVoiceChats(state.group.id, state);
  });
};

export const updateGroupImage = async (groupId: string, val: File | string) => {
  if (typeof val !== "string") {
    const fileRef = ref(storage, `${groupId}/images/${v4()}`);

    await uploadBytesResumable(fileRef, val, {
      contentType: "image/jpg",
    });

    const url = await getDownloadURL(fileRef);

    const groupRef = doc(db, "groups", groupId);
    updateDoc(groupRef, { imageURL: url });
    return;
  }

  const groupRef = doc(db, "groups", groupId);
  updateDoc(groupRef, { imageURL: val });
};
