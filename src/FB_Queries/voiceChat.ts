/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-nocheck

import { db } from "@/firebase";
import { Participant, VoiceChat } from "@/types";
import { RootState } from "@/types/store";
import {
  collection,
  setDoc,
  onSnapshot,
  doc,
  query,
  orderBy,
  getDoc,
  getDocs,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";

export const getAllVoiceChats = async (groupId: string, state: RootState) => {
  const chatsRef = collection<VoiceChat>(db, "groups", groupId, "voiceChats");
  const snapShot = await getDocs(chatsRef);
  const chats: VoiceChat[] = [];
  snapShot.forEach((snapShot) => chats.push({ ...snapShot.data(), id: snapShot.id }));
  state.group.voiceChats = chats;

  state.group.voiceChats.forEach((chat) => {
    const participantsRef = collection<Participant>(db, chatsRef.path, chat.id, "participants");
    const q = query(participantsRef, orderBy("joinedAt"));
    onSnapshot(q, (snapShot) => {
      const participants: Participant[] = [];
      snapShot.forEach((p) => participants.push(p.data()));
      chat.participants = participants;
    });
  });
};

export const getVoiceChat = async (groupId: string, chatId: string, state: RootState) => {
  const chatRef = doc(db, "groups", groupId, "voiceChats", chatId);
  onSnapshot(chatRef, (snapShot) => {
    state.voiceChat = { ...snapShot.data(), id: snapShot.id, groupId } as VoiceChat;
  });
};

export const addParticipant = async (groupId: string, chatId: string, participant: Participant) => {
  const participantRef = doc(
    db,
    "groups",
    groupId,
    "voiceChats",
    chatId,
    "participants",
    participant.userInfo.uid
  );

  const snapShot = await getDoc(participantRef);

  if (!snapShot.exists()) {
    setDoc(participantRef, participant);
  }
};

export const deleteParticipant = async (groupId: string, chatId: string, userUid: string) => {
  const docToDeleteRef = doc(db, "groups", groupId, "voiceChats", chatId, "participants", userUid);
  const snapShot = await getDoc(docToDeleteRef);

  if (snapShot.exists()) {
    deleteDoc(docToDeleteRef);
  }
};

export const setMuted = (groupId: string, chatId: string, userId: string, muted: boolean) => {
  const participantRef = doc(db, "groups", groupId, "voiceChats", chatId, "participants", userId);
  updateDoc(participantRef, { muted });
};
