<template>
  <div class="flex h-full">
    <SideBar />
    <Content />
  </div>
</template>

<script setup lang="ts">
import Content from "@/components/Content/index.vue";
import SideBar from "@/components/SideBar/index.vue";
import { watchEffect, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { getGroup } from "@/FB_Queries/groups";
import { useStore } from "@/store/store";
import { groupActionTypes } from "@/types/store";
import { errorToast } from "@/utils/toasts";

const router = useRouter();
const route = useRoute();
const store = useStore();

const groupId = computed(() => String(route.params.groupId));
const userId = computed(() => store.state.user.uid);
const existedGroupId = computed(() => store.state.group.id);

watchEffect(async () => {
  if (userId.value && groupId.value !== existedGroupId.value) {
    try {
      store.dispatch(groupActionTypes.SET_GROUP, { groupId: groupId.value, userId: userId.value });
    } catch (err: any) {
      router.push("/");
      errorToast(err.message);
    }
  }
});
</script>
