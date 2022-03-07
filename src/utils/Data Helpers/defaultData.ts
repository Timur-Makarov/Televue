import { generateGroupImage } from "../staticImages";

export const getDefaultGroupData = (userId: string, title: string) => ({
  title,
  owner: userId,
  members: [userId],
  imageURL: generateGroupImage(title),
  createdAt: Date.now(),
});
