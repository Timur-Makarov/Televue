export const getErrorMessageByFirebaseCode = (code: string) => {
  const messages = {
    "auth/email-already-in-use": "This email is already in use",
    "auth/user-not-found": "User with this email doesn't exists",
    "auth/invalid-password": "Invalid password",
    "auth/wrong-password": "Invalid password",
  };
  console.log(code);
  //@ts-expect-error: Unreachable code error
  return messages[code] || "Something went wrong";
};

export const generateRandomAvatar = () => {
  const sprites = ["male", "female", "human", "identicon", "bottts", "jdenticon", "gridy", "micah"];
  const randomIdx = Math.floor(Math.random() * sprites.length);
  const seed = Math.floor(Math.random() * 1000);
  return `https://avatars.dicebear.com/api/${sprites[randomIdx]}/${seed}.svg`;
};
