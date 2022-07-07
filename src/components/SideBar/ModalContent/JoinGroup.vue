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
import { joinGroup } from "@/queries/create-join";
import { ref, defineEmits } from "vue";
import { useStore } from "@/store/store";
import { computed } from "@vue/reactivity";

const errorMessage = ref("");
const store = useStore();
const user = computed(() => store.state.user);

const emit = defineEmits<{
  (event: "closeModal"): void;
}>();

const onSubmit = async ({ groupId }: { groupId: string }) => {
  if (user.value) {
    joinGroup(groupId, user.value.uid)
      .then(() => emit("closeModal"))
      .catch((errMsg) => (errorMessage.value = errMsg));
  }
};
</script>

<style scoped>
h3 {
  @apply text-2xl text-center text-white mb-6;
}
</style>
