import { RootState, userActionTypes } from "@/types/store";
import { createModule } from "../store";

export const userModule = createModule({
  mutations: {},
  actions: {
    [userActionTypes.SET_USER]: ({ rootState }, user: RootState["user"]) => {
      rootState.user = user;
    },
  },
});
