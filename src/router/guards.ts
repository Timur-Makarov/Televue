import { getDoc, doc } from "firebase/firestore";
import { NavigationGuard, RouteLocationNormalized } from "vue-router";
import { db, auth } from "@/firebase";
import { errorToast, successToast } from "@/utils/toasts";
import { joinGroup } from "@/queries/create-join";

export const checkAuth = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
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
        joinGroup(snapShot.id, auth.currentUser.uid)
          .then(() => successToast("You successfully joined the chat"))
          .catch(() => errorToast("Something went wrong joining the chat"));
      }
    }
    next();
  }
};
