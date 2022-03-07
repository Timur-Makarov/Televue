import { RootState } from "@/types/store";
import { createModule } from "../store";
import actions from "./actions";

export const groupModule = createModule<RootState["group"]>({
  mutations: {},
  actions,
});
