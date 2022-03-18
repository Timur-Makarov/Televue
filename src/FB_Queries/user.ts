/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-nocheck

import { RootState } from "./../types/store";
import { storage, db } from "@/firebase";
import { User, UserInfo } from "firebase/auth";
import { doc, getDoc, onSnapshot, setDoc, updateDoc } from "firebase/firestore";
import { uploadBytesResumable, getDownloadURL, ref } from "firebase/storage";
import { v4 } from "uuid";

export const uploadUserAvatar = async (userId: string, file: File) => {
  const fileRef = ref(storage, `${userId}/avatars/${v4()}`);

  await uploadBytesResumable(fileRef, file, {
    contentType: "image/jpg",
  });

  const url = await getDownloadURL(fileRef);
  return url;
};

export const userCreated = async (user: User, dn: string, photo: string) => {
  const newUser: UserInfo = {
    displayName: dn,
    email: user.email,
    phoneNumber: user.phoneNumber,
    photoURL: photo,
    providerId: user.providerId,
    uid: user.uid,
  };
  const newUserRef = doc(db, `users/${user.uid}`);
  setDoc(newUserRef, newUser);
};

export const getUser = async (uid: string) => {
  const userRef = doc(db, `users/${uid}`);
  const user = await getDoc(userRef);
  return user.data();
};

export const subscribeToUser = async (uid: string, rootState: RootState) => {
  const userRef = doc(db, `users/${uid}`);
  onSnapshot(userRef, (snapShot) => {
    rootState.user = snapShot.data()!;
  });
};

export const updateProfileImage = async (uid: string, photoURL: string) => {
  const userRef = doc(db, `users/${uid}`);
  await updateDoc(userRef, { photoURL });
};
