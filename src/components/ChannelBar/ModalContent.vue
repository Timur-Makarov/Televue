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
import { addNewChat } from "@/queries/channelBar";
import { computed } from "@vue/reactivity";

const store = useStore();
const errorMessage = ref("");
const groupId = computed(() => store.state.group?.id);

const props = defineProps({
  type: { type: String as PropType<"text" | "voice">, required: true },
});

const emit = defineEmits<{
  (event: "closeModal"): void;
}>();

const onSubmit = async ({ title }: { title: string }) => {
  if (groupId.value) {
    addNewChat(props.type, title, groupId.value)
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
