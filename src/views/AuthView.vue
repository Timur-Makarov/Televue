<template>
  <div class="font-mono bg-gray-400 h-full">
    <div class="container flex items-center h-full w-full">
      <div class="flex justify-center px-6 w-full">
        <div class="w-full xl:w-3/4 lg:w-11/12 flex">
          <Login v-if="type == 'login'" />
          <Registration v-else />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Login from "@/components/Auth/Login.vue";
import Registration from "@/components/Auth/Registration.vue";
import { useRoute } from "vue-router";
import { computed } from "vue";

const route = useRoute();
const type = computed(() => route.path.split("/")[1]);
</script>

<style scoped></style>
