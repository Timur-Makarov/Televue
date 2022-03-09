<template>
  <Modal v-if="owner" @close-modal="isModalOpen = false" :isModalOpen="isModalOpen">
    <UploadPhoto :type="'group'" :id="groupId" :oldImage="image" />
  </Modal>
  <Menu v-if="owner" as="div" class="relative z-30">
    <div>
      <MenuButton class="sidebar-icon group">
        <i v-if="icon" class="fa-solid text-2xl" :class="{ [`fa-${icon}`]: icon }" />
        <img v-else :src="image" />
        <span class="sidebar-tooltip group-hover:scale-100">
          {{ tooltip }}
        </span>
      </MenuButton>
    </div>
    <transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <MenuItems
        class="origin-top-right absolute left-14 top-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
      >
        <MenuItem v-slot="{ active }">
          <router-link
            :to="`/group/${groupId}`"
            :class="[
              active ? 'bg-gray-100' : '',
              'block px-4 py-2 text-sm text-gray-700 cursor-pointer',
            ]"
            >Open</router-link
          >
        </MenuItem>
        <MenuItem v-slot="{ active }">
          <div
            :class="[
              active ? 'bg-gray-100' : '',
              'block px-4 py-2 text-sm text-gray-700 cursor-pointer',
            ]"
            @click="isModalOpen = true"
          >
            Update Image
          </div>
        </MenuItem>
      </MenuItems>
    </transition>
  </Menu>
  <div v-else class="sidebar-icon group" @click="emit('click')">
    <i v-if="icon" class="fa-solid text-2xl" :class="{ [`fa-${icon}`]: icon }" />
    <img v-else :src="image" />
    <span class="sidebar-tooltip group-hover:scale-100">
      {{ tooltip }}
    </span>
  </div>
</template>

<script setup lang="ts">
import UploadPhoto from "@/components/Modal/sharedModals/UploadPhoto.vue";
import Modal from "@/components/Modal/index.vue";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";
import { defineProps, ref, defineEmits } from "vue";

const isModalOpen = ref(false);
const emit = defineEmits<{
  (event: "click"): void;
}>();

defineProps({
  icon: String,
  image: String,
  groupId: String,
  owner: Boolean,
  tooltip: String,
});
</script>

<style scoped>
img {
  @apply rounded-3xl;
}
</style>
