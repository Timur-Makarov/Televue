import { RootState } from "../types/store";
import { storage, db } from "@/firebase";
import { User, UserInfo } from "firebase/auth";
import { doc, getDoc, onSnapshot, setDoc, updateDoc } from "firebase/firestore";
import { uploadBytesResumable, getDownloadURL, ref } from "firebase/storage";
import { v4 } from "uuid";

export const uploadUserAvatar = async (userId: string, file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const fileRef = ref(storage, `${userId}/avatars/${v4()}`);

    uploadBytesResumable(fileRef, file, { contentType: "image/jpg" })
      .then(() => {
        getDownloadURL(fileRef).then(resolve);
      })
      .catch(reject);
  });
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
  return user.data() as UserInfo;
};

export const subscribeToUser = async (uid: string, rootState: RootState) => {
  const userRef = doc(db, `users/${uid}`);
  onSnapshot(userRef, (snapShot) => {
    rootState.user = snapShot.data() as UserInfo;
  });
};

export const updateProfileImage = async (uid: string, photoURL: string) => {
  return new Promise((res) => {
    const userRef = doc(db, `users/${uid}`);
    updateDoc(userRef, { photoURL }).then(res);
  });
};
