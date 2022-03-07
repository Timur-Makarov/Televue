/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-nocheck

import { db } from "@/firebase";
import { Group, Participant, TextChat, VoiceChat } from "@/types";
import { RootState } from "@/types/store";
import { errorToast } from "@/utils/toasts";
import { collection, getDoc, orderBy, onSnapshot, doc, query } from "firebase/firestore";
import { NavigationGuard } from "vue-router";
import { getAllVoiceChats } from "./voiceChat";

export const getGroup = async (groupId: string, userId: string, state: RootState) => {
  const GroupRef = doc(db, "groups", groupId);
  const snapShot = await getDoc(GroupRef);
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

export const checkAuth = (
  to: any,
  from: any,
  next: (v?: string) => void,
  needToTransfer = true
) => {
  if (localStorage.getItem("user-uid")) {
    if (needToTransfer) {
      next();
    }
  } else {
    next("/login");
  }
};

export const docExistsGuard: NavigationGuard = async (to, from, next) => {
  checkAuth(to, from, next, false);
  const GroupRef = doc(db, "groups", String(to.params.groupId));
  const snapShot = await getDoc(GroupRef);

  if (!snapShot.exists()) {
    next("/");
    errorToast("Group with that ID does not exist!");
  } else {
    next();
  }
};
