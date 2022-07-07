import { AudioMessage, VoiceChat, VoiceChatClient } from "./index";
import { Group, TextChat } from ".";
import { UserInfo } from "firebase/auth";

export interface RootState {
  darkTheme: boolean;
  progressLine: number;
  isChannelBarOpen: boolean;
  user: null | UserInfo;
  group: null | Group;
  textChat: null | TextChat;
  voiceChat: null | VoiceChat;
  voiceChatClient: null | VoiceChatClient;
  audioMessage: AudioMessage;
}

export enum groupActionTypes {
  SET_GROUP = "SET_GROUP",
  SET_TEXT_CHATS = "SET_TextChats",
  SET_VOICE_CHATS = "SET_VoiceChats",
}

export enum textChatActionTypes {
  SET_TEXT_CHAT = "SET_TEXT_CHAT",
  ADD_MESSAGE = "ADD_MESSAGE",
  GET_MORE_MESSAGES = "GET_MORE_MESSAGES",
  SET_MESSAGES_BACK = "SET_MESSAGES_BACK",
}

export enum voiceChatActionTypes {
  SET_VOICE_CHAT = "SET_VOICE_CHAT",
  ADD_PARTICIPANT = "ADD_PARTICIPANT",
  GET_ALL_CHATS = "GET_ALL_CHATS",
  PARTICIPANT_LEFT = "PARTICIPANT_LEFT",
  SET_MUTED = "SET_MUTED",
}

export enum userActionTypes {
  SET_USER = "SET_USER",
}

export interface ADD_MESSAGE_ACTION {
  type: textChatActionTypes.ADD_MESSAGE;
  payload: {
    groupId: string;
    chatId: string;
    messageData: {
      text: string;
      fileData?: [File, "image" | "audio"];
    };
  };
}
