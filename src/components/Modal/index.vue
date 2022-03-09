<template>
  <TransitionRoot as="template" :show="isModalOpen">
    <Dialog as="div" class="fixed z-10 inset-0 overflow-y-auto" @close="handleClose">
      <div
        class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
      >
        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="ease-in duration-200"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <DialogOverlay class="fixed inset-0 bg-gray-500 bg-opacity-50 transition-opacity" />
        </TransitionChild>

        <!-- This element is to trick the browser into centering the modal contents. -->
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true"
          >&#8203;</span
        >
        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          enter-to="opacity-100 translate-y-0 sm:scale-100"
          leave="ease-in duration-200"
          leave-from="opacity-100 translate-y-0 sm:scale-100"
          leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        >
          <div class="content_wrapper">
            <span @click="handleClose"><i class="fa-solid fa-xmark text-white text-lg" /></span>
            <slot></slot>
          </div>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref } from "vue";
import { Dialog, DialogOverlay, TransitionChild, TransitionRoot } from "@headlessui/vue";

const props = defineProps({
  isModalOpen: Boolean,
});

const emit = defineEmits<{
  (event: "closeModal"): void;
}>();

const handleClose = () => emit("closeModal");
</script>

<style scoped>
.content_wrapper {
  @apply inline-block align-bottom bg-gray-500
  rounded-lg text-left overflow-hidden 
  shadow-xl transform transition-all sm:my-8 sm:align-middle 
  sm:max-w-lg sm:w-full px-4 py-6 relative;
}

.content_wrapper > span {
  @apply absolute top-1 right-1 hover:bg-slate-700 rounded-3xl px-2 py-0.5 cursor-pointer;
}
</style>
