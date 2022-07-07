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
import { useRoute, useRouter } from "vue-router";
import { computed, watch } from "vue";
import { useStore } from "@/store/store";

const route = useRoute();
const router = useRouter();
const type = computed(() => route.path.split("/")[1]);
const store = useStore();
const user = computed(() => store.state.user);

watch([user], () => {
  if (user.value) {
    router.push("/");
  }
});
</script>

<style scoped></style>
