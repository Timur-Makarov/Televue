<template>
  <Menu as="div" class="ml-3 relative">
    <div>
      <MenuButton
        class="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
      >
        <span class="sr-only">Open user menu</span>
        <img class="h-10 w-10 rounded-full" v-if="avatarURL" :src="avatarURL" alt="" />
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
        class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
      >
        <MenuItem v-slot="{ active }">
          <a
            href="#"
            :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']"
            >Your Profile</a
          >
        </MenuItem>
        <MenuItem v-slot="{ active }">
          <a
            href="#"
            :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']"
            >Settings</a
          >
        </MenuItem>
        <MenuItem v-slot="{ active }">
          <router-link
            to="/login"
            @click.prevent="handleSignOut"
            :class="[
              active ? 'bg-gray-100' : '',
              'block px-4 py-2 text-sm text-gray-700 cursor-pointer',
            ]"
            >Sign out</router-link
          >
        </MenuItem>
      </MenuItems>
    </transition>
  </Menu>
</template>

<script setup lang="ts">
import { ref, computed, watchEffect } from "vue";
import { useStore } from "@/store/store";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";
import { auth } from "@/firebase";

const store = useStore();
const avatarURL = ref("");
const user = computed(() => store.state.user);

watchEffect(() => (avatarURL.value = user.value.photoURL || ""));
const handleSignOut = () => auth.signOut();
</script>

<style scoped></style>
