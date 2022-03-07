<template>
  <div class="top-navigation">
    <span class="title-hashtag"><i class="fa-solid fa-hashtag" /></span>
    <h5 className="title-text">{{ chatTitle }}</h5>

    <span @click="$store.commit('setDarkTheme', !$store.state.darkTheme)" class="mr-3">
      <i v-if="$store.state.darkTheme" class="top-navigation-icon fa-solid fa-sun text-3xl" />
      <i v-else class="top-navigation-icon fa-solid fa-moon text-3xl" />
    </span>

    <div class="search">
      <input
        v-model="searchQuery"
        className="search-input dark:text-gray-300 text-gray-700"
        type="text"
        placeholder="Search..."
      />
      <span class="top-navigation-icon"><i class="fa-solid fa-search text-xl" /></span>
    </div>

    <span class="top-navigation-icon"><i class="fa-solid fa-bell text-2xl" /></span>

    <UserAvatar />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, defineEmits } from "vue";
import { useStore } from "@/store/store";
import UserAvatar from "./UserAvatar.vue";
import { useDebouncedRef } from "@/utils/helpers";

const emit = defineEmits<{
  (event: "queryUpdate", query: string): void;
}>();

const searchQuery = useDebouncedRef("", 230);
const store = useStore();
const chatTitle = computed(() => store.state.textChat.title);

watch([searchQuery], (newQuery) => emit("queryUpdate", newQuery[0]));
</script>

<style scoped></style>
