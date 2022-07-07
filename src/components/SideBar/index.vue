<template>
  <div class="sidebar z-10">
    <SideBarItem
      v-for="group of groups"
      :key="group.id"
      :image="group.imageURL"
      :tooltip="group.title"
      :groupId="group.id"
      :owner="group.owner === user?.uid"
      @click="handleGroupTransition(group.owner, group.id)"
    />
    <SideBarItem @click="isModalOpen = true" :icon="'plus'" :tooltip="'Add new group'" />
  </div>
  <Modal @close-modal="handleClose" :isModalOpen="isModalOpen">
    <Buttons v-if="!!!type" @set-type="handleType" />
    <CreateGroup @close-modal="handleClose" v-else-if="type === 'create'" />
    <JoinGroup @close-modal="handleClose" v-else-if="type === 'join'" />
  </Modal>
</template>

<script setup lang="ts">
import { ref, watchEffect, computed, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { db } from "@/firebase";
import { collection, query, where, onSnapshot, Unsubscribe } from "firebase/firestore";
import SideBarItem from "./Item.vue";
import { useStore } from "@/store/store";
import { Group } from "@/types/index";
import Buttons from "./ModalContent/Buttons.vue";
import CreateGroup from "./ModalContent/CreateGroup.vue";
import JoinGroup from "./ModalContent/JoinGroup.vue";
import Modal from "@/components/Modal/index.vue";

const router = useRouter();

const isModalOpen = ref(false);
const groups = ref([] as Group[]);
const type = ref("");
const unsub = ref({} as Unsubscribe);

const store = useStore();
const user = computed(() => store.state.user);

watchEffect(() => {
  if (user.value?.uid) {
    const q = query(collection(db, "groups"), where("members", "array-contains", user.value.uid));
    unsub.value = onSnapshot(q, (snapShot) => {
      groups.value = [];
      snapShot.forEach((c) =>
        //@ts-expect-error: Unreachable error
        groups.value.push({ ...c.data(), id: c.id })
      );
    });
  }
});

onUnmounted(() => (unsub.value ? unsub.value() : null));

const handleClose = () => {
  isModalOpen.value = false;
  type.value = "";
};

const handleType = (val: "create" | "join") => (type.value = val);
const handleGroupTransition = (ownerId: string, id: string) => {
  if (user.value?.uid !== ownerId) {
    router.push(`/group/${id}`);
  }
};
</script>

<style scoped></style>
