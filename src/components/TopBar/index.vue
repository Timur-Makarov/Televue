<template>
  <div class="top-navigation relative">
    <i
      class="fa-solid fa-chevron-right chevron"
      @click="store.commit('setChannelBerIsOpen', true)"
    />
    <i class="title-hashtag fa-solid fa-hashtag" />
    <h5 class="title-text">{{ chatTitle }}</h5>

    <span @click="store.commit('setDarkTheme', !darkTheme)" class="mr-3">
      <i v-if="darkTheme" class="top-navigation-icon fa-solid fa-sun sm:text-3xl text-2xl" />
      <i v-else class="top-navigation-icon fa-solid fa-moon sm:text-3xl text-2xl" />
    </span>

    <div class="search">
      <input v-model="searchQuery" class="search-input" type="text" placeholder="Search..." />
      <i class="top-navigation-icon fa-solid fa-search text-xl" />
    </div>

    <UserAvatar />
  </div>
</template>

<script setup lang="ts">
import { computed, watch, defineEmits } from "vue";
import { useStore } from "@/store/store";
import UserAvatar from "./UserAvatar.vue";
import { useDebouncedRef } from "@/utils/helpers";

const emit = defineEmits<{
  (event: "queryUpdate", query: string): void;
}>();

const searchQuery = useDebouncedRef("", 230);
const store = useStore();
const chatTitle = computed(() => store.state.textChat?.title);
const darkTheme = computed(() => store.state.darkTheme);

watch([searchQuery], (newQuery) => emit("queryUpdate", newQuery[0]));
</script>

<style scoped>
.chevron {
  @apply absolute left-16 text-2xl bg-black text-white
  px-3 py-1 rounded-full ml-2 md:hidden block
  cursor-pointer;
}
</style>
