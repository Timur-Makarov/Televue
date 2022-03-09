import { AudioMessage, VoiceChat, VoiceChatClient } from "./index";
import { Group, TextChat } from ".";
import { UserInfo } from "firebase/auth";

export interface RootState {
  darkTheme: boolean;
  progressLine: number;
  isChannelBarOpen: boolean;
  user: UserInfo;
  group: Group;
  textChat: TextChat;
  voiceChat: VoiceChat | null;
  voiceChatClient: VoiceChatClient;
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
