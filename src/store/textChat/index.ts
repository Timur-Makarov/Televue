import { Message } from "@/types";
import { RootState } from "@/types/store";
import { createModule } from "../store";
import actions from "./actions";

export const textChatModule = createModule<RootState>({
  actions,
});
