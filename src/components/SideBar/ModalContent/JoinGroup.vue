<template>
  <div>
    <h3>Enter the ID of the Group</h3>
    <FormKit type="form" @submit="onSubmit" submit-label="Join" :errors="[errorMessage]">
      <FormKit
        type="text"
        name="groupId"
        :config="{ classes: { input: 'custom-input' } }"
        validation="required"
      />
    </FormKit>
  </div>
</template>

<script setup lang="ts">
import { JoinGroup } from "@/FB_Queries/create-join";
import { ref, defineEmits } from "vue";
import { useStore } from "@/store/store";

const errorMessage = ref("");
const store = useStore();

const emit = defineEmits<{
  (event: "closeModal"): void;
}>();

const onSubmit = async ({ groupId }: { groupId: string }) => {
  const answer = await JoinGroup(groupId, store.state.user.uid);
  if (answer) {
    errorMessage.value = answer;
  } else {
    emit("closeModal");
  }
};
</script>

<style scoped>
h3 {
  @apply text-2xl text-center text-white mb-6;
}
</style>
