import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, deleteDoc } from "firebase/firestore";
import pkg from "agora-access-token";
import cors from "cors";
const { RtcTokenBuilder, RtcRole } = pkg;
import * as path from "path";

const firebaseConfig = {
  apiKey: "AIzaSyCO7klYJid9hbWw6hnYNU_WDhaGlg-gQRA",
  authDomain: "tele-v-u-e.firebaseapp.com",
  projectId: "tele-v-u-e",
  storageBucket: "tele-v-u-e.appspot.com",
  messagingSenderId: "711509364043",
  appId: "1:711509364043:web:4862a57ed07075061c6cce",
};

export const fApp = initializeApp(firebaseConfig);
export const db = getFirestore(fApp);

const app = express();
const server = createServer(app);
const io = new Server(server);
app.use(cors());

app.get("/token", (req, res) => {
  const chatId = req.query.chatId;
  const uid = Math.round(Math.random() * 1000);
  const expirationTimeInSeconds = 3600;
  const currentTimestamp = Math.floor(Date.now() / 1000);
  const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;

  const token = RtcTokenBuilder.buildTokenWithUid(
    "826d9fdfeafe40d2b2745019a5175ea2",
    "7b5d1854c87544f3821854a9953f1dc0",
    chatId,
    uid,
    RtcRole.PUBLISHER,
    privilegeExpiredTs
  );

  res.json({
    token,
    uid,
  });
});

app.use(express.static(path.join("server", "../dist")));
app.get("*", (req, res) => res.sendFile(path.resolve("server", "..", "dist", "index.html")));

io.on("connection", (socket) => {
  const data = {
    groupId: "",
    chatId: "",
    userId: "",
  };
  socket.on("disconnect", async () => {
    if (data.groupId) {
      const docToDeleteRef = doc(
        db,
        "groups",
        data.groupId,
        "voiceChats",
        data.chatId,
        "participants",
        data.userId
      );
      const snapShot = await getDoc(docToDeleteRef);

      if (snapShot.exists()) {
        deleteDoc(docToDeleteRef);
      }
    }
  });
  socket.on("chatData", ({ groupId, chatId, userId }) => {
    data.groupId = groupId;
    data.chatId = chatId;
    data.userId = userId;
  });
});

server.listen(process.env.PORT || 4000, () => {
  console.log("listening on post 4000");
});
