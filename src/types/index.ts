import { IAgoraRTCClient, ILocalAudioTrack } from "agora-rtc-sdk-ng";
import { UserInfo } from "firebase/auth";

export interface MessageSender {
  displayName: string;
  photoURL: string;
  uid: string;
}

export interface User extends UserInfo {
  muted: boolean;
}

export interface Message {
  id?: string;
  text: string;
  sender: MessageSender;
  imageURL?: string;
  audioURL?: string;
  createdAt: number;
}

export interface TextChat {
  id: string;
  title: string;
  createdAt: number;
  messages: Message[];
  pageOfMessages: number;
}

export interface VoiceChat {
  id: string;
  title: string;
  createdAt: number;
  participants: Participant[];
  groupId: string;
}

export interface Group {
  id: string;
  title: string;
  owner: User["uid"];
  members: User["uid"][];
  imageURL: string;
  createdAt: number;
  textChats: Pick<TextChat, "id" | "title" | "createdAt">[];
  voiceChats: VoiceChat[];
}

export interface AudioMessage {
  paused: boolean;
  audio: HTMLAudioElement | null;
  volume: number;
}

export interface Participant {
  userInfo: {
    displayName: string;
    photoURL: string;
    uid: string;
  };
  joinedAt: number;
  uid: string;
  muted: boolean;
}

export interface VoiceChatClient {
  client: IAgoraRTCClient;
  audioTrack: ILocalAudioTrack;
}
