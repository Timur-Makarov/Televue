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
import { CreateNewGroup } from "@/FB_Queries/create-join";

const store = useStore();

const emit = defineEmits<{
  (event: "closeModal"): void;
}>();

const onSubmit = async ({ title }: { title: string }) => {
  CreateNewGroup(store.state.user.uid, title);
  emit("closeModal");
};
</script>

<style scoped>
h3 {
  @apply text-2xl text-center text-white mb-6;
}
</style>
