<template>
  <div class="extraOutline p-4 bg-white w-max m-auto rounded-lg">
    <h3 class="text-center text-xl">Upload new image of the Group</h3>
    <div class="upload_modal">
      <img :src="imageSrc" />
      <div class="buttons">
        <button class="bg-blue-400" @click="openInput">Upload</button>
        <button :disabled="isLoading" class="bg-green-400" @click="onSubmit">
          {{ isLoading ? "Loading..." : "Save" }}
        </button>
        <button class="bg-yellow-400" @click="handleRandom">Random</button>
      </div>
    </div>
    <input accept="image/*" type="file" hidden ref="imageInputRef" />
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref, onMounted, onUnmounted, PropType } from "vue";
import { generateRandomAvatar } from "@/utils/authHelpers";
import { updateGroupImage } from "@/FB_Queries/groups";
import { uploadUserAvatar, updateProfileImage } from "@/FB_Queries/user";
import { useStore } from "@/store/store";

const props = defineProps({
  isModalOpen: { type: Boolean, required: true },
  oldImage: { type: String, required: true },
  id: { type: String, required: true },
  type: { type: String as PropType<"group" | "user">, required: true },
});

const imageSrc = ref<string | ArrayBuffer>(props.oldImage);
const imageInputRef = ref({} as HTMLInputElement);
const currFile = ref<File | null>(null);
const store = useStore();
const isLoading = ref(false);

const handleRandom = () => {
  imageSrc.value = generateRandomAvatar();
  currFile.value = null;
};
const openInput = () => imageInputRef.value?.click();
const handleFile = (e: any) => {
  const file = e.target.files[0];

  const reader = new FileReader();
  reader.onload = (ev) => {
    if (ev.target?.result) {
      imageSrc.value = ev.target.result;
    }
  };

  reader.readAsDataURL(file);
  currFile.value = file;
};

const onSubmit = async () => {
  isLoading.value = true;
  if (currFile.value) {
    if (props.type == "group") {
      await updateGroupImage(props.id, currFile.value);
    } else {
      const url = await uploadUserAvatar(store.state.user.uid, currFile.value);
      updateProfileImage(store.state.user.uid, url);
    }
  } else {
    if (props.type == "group") {
      await updateGroupImage(props.id, String(imageSrc.value));
    } else {
      updateProfileImage(store.state.user.uid, String(imageSrc.value));
    }
  }
  isLoading.value = false;
};

onMounted(() => imageInputRef.value?.addEventListener("change", handleFile));
onUnmounted(() => imageInputRef.value?.removeEventListener("change", handleFile));
</script>

<style scoped>
.upload_modal {
  @apply p-5 relative border-4 border-dotted 
  border-gray-300 rounded-lg w-96 flex flex-col
  items-center justify-between gap-6;
}

.upload_modal img {
  @apply w-36;
}

.buttons {
  @apply flex justify-around items-center
  w-full;
}

.buttons button {
  @apply px-6 py-3 rounded-2xl;
}
</style>
