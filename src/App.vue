<template>
  <router-view />
</template>

<script setup lang="ts">
import { onMounted, watchEffect } from "vue";
import { useStore } from "./store/store";
import { setTheme } from "@/utils/theme";
import { auth } from "@/firebase";
import { userActionTypes } from "./types/store";
import { getUser } from "./FB_Queries/user";

const store = useStore();

onMounted(() => {
  auth.onAuthStateChanged(async (user) => {
    if (user) localStorage.setItem("user-uid", user.uid);
    else localStorage.removeItem("user-uid");

    store.dispatch(userActionTypes.SET_USER, user?.uid);
  });
});
watchEffect(() => setTheme(store.state.darkTheme));
</script>

<style></style>
