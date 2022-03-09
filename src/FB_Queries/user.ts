import { storage } from "@/firebase";
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
