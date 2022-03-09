import { getDoc, doc } from "firebase/firestore";
import { NavigationGuard } from "vue-router";
import { db, auth } from "@/firebase";
import { errorToast } from "@/utils/toasts";
import { JoinGroup } from "@/FB_Queries/create-join";

export const checkAuth = (
  to: any,
  from: any,
  next: (v?: string) => void,
  needToTransfer = true
) => {
  if (localStorage.getItem("user-uid")) {
    if (needToTransfer) {
      next();
    }
  } else {
    next("/login");
  }
};

export const docExistsGuard: NavigationGuard = async (to, from, next) => {
  checkAuth(to, from, next, false);
  const GroupRef = doc(db, "groups", String(to.params.groupId));
  const snapShot = await getDoc(GroupRef);

  if (!snapShot.exists()) {
    next("/");
    errorToast("Group with that ID does not exist!");
  } else {
    if (auth.currentUser?.uid) {
      if (!snapShot.data().members.includes(auth.currentUser.uid)) {
        JoinGroup(snapShot.id, auth.currentUser.uid);
      }
    }
    next();
  }
};
