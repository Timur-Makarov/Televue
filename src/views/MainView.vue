<template>
  <div class="flex h-full">
    <SideBar />
    <Empty />
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from "vue";
import { useStore } from "../store/store";
import Empty from "@/components/Empty/index.vue";
import SideBar from "@/components/SideBar/index.vue";

const store = useStore();
</script>
