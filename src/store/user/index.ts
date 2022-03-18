import { subscribeToUser } from "@/FB_Queries/user";
import { userActionTypes } from "@/types/store";
import { UserInfo } from "firebase/auth";
import { createModule } from "../store";

export const userModule = createModule({
  mutations: {},
  actions: {
    [userActionTypes.SET_USER]: ({ rootState }, uid: string) => {
      if (uid) {
        subscribeToUser(uid, rootState);
      } else {
        rootState.user = {} as UserInfo;
      }
    },
  },
});
