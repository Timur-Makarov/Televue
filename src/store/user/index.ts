import { subscribeToUser } from "@/queries/user";
import { userActionTypes } from "@/types/store";
import { createModule } from "../store";

export const userModule = createModule({
  actions: {
    [userActionTypes.SET_USER]: ({ rootState }, uid: string) => {
      if (uid) {
        subscribeToUser(uid, rootState);
      } else {
        rootState.user = null;
      }
    },
  },
});
