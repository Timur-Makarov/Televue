<template>
  <div>
    <h3>Add new {{ type === "voice" ? "Voice" : "Text" }} Chat</h3>
    <FormKit type="form" @submit="onSubmit" submit-label="Create">
      <FormKit
        type="text"
        name="title"
        :config="{ classes: { input: 'custom-input' } }"
        validation="required"
        :errors="[errorMessage]"
      />
    </FormKit>
  </div>
</template>

<script setup lang="ts">
import { defineEmits, defineProps, PropType, ref } from "vue";
import { useStore } from "@/store/store";
import { addNewChat } from "@/FB_Queries/channelBar";

const store = useStore();
const errorMessage = ref("");

const props = defineProps({
  type: { type: String as PropType<"text" | "voice">, required: true },
});

const emit = defineEmits<{
  (event: "closeModal"): void;
}>();

const onSubmit = async ({ title }: { title: string }) => {
  const answer = await addNewChat(props.type, title, store.state.group.id);
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
