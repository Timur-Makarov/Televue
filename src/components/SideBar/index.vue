<template>
  <div class="sidebar">
    <SideBarItem
      v-for="group of groups"
      :key="group.id"
      :image="group.imageURL"
      :tooltip="group.title"
      @click="handleGroupTransition(group.id)"
    />
    <SideBarItem @click="isModalOpen = true" :icon="'plus'" :tooltip="'Add new group'" />
  </div>
  <Modal @close-modal="isModalOpen = false" :isModalOpen="isModalOpen">
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

const isModalOpen = ref(false);
const groups = ref([] as Pick<Group, "title" | "imageURL" | "id">[]);
const store = useStore();
const unsub = ref({} as Unsubscribe);
const user = computed(() => store.state.user);
const router = useRouter();

watchEffect(() => {
  if (user.value.uid) {
    const q = query(collection(db, "groups"), where("members", "array-contains", user.value.uid));
    unsub.value = onSnapshot(q, (snapShot) => {
      groups.value = [];
      snapShot.forEach((c) =>
        groups.value.push({ title: c.data().title, imageURL: c.data().imageURL, id: c.id })
      );
    });
  }
});

onUnmounted(() => (unsub.value ? unsub.value() : null));

const handleClose = () => (isModalOpen.value = false);

const type = ref("");
const handleType = (val: "create" | "join") => (type.value = val);
const handleGroupTransition = (id: string) => router.push(`/group/${id}`);
</script>

<style scoped></style>
