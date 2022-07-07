<template>
  <div>
    <h3>Set the Title to Your new Channel</h3>
    <FormKit type="form" @submit="onSubmit" submit-label="Create">
      <FormKit
        type="text"
        name="title"
        :config="{ classes: { input: 'custom-input' } }"
        validation="required"
      />
    </FormKit>
  </div>
</template>

<script setup lang="ts">
import { defineEmits } from "vue";
import { useStore } from "@/store/store";
import { createNewGroup } from "@/queries/create-join";
import { computed } from "@vue/reactivity";

const store = useStore();
const user = computed(() => store.state.user);

const emit = defineEmits<{
  (event: "closeModal"): void;
}>();

const onSubmit = async ({ title }: { title: string }) => {
  if (user.value) {
    createNewGroup(user.value.uid, title).then(() => emit("closeModal"));
  }
};
</script>

<style scoped>
h3 {
  @apply text-2xl text-center text-white mb-6;
}
</style>
