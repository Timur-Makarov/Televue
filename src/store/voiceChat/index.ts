import { RootState } from "@/types/store";
import { createModule } from "../store";
import actions from "./actions";

export const voiceChatModule = createModule<RootState>({
  actions,
});
