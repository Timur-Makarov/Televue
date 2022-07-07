<template>
  <div class="extraOutline p-4 bg-white w-max m-auto rounded-lg">
    <h3 class="text-center text-xl">Upload new image of the Group</h3>
    <div class="upload_modal">
      <img :src="String(imageSrc)" />
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
import { updateGroupImage } from "@/queries/groups";
import { uploadUserAvatar, updateProfileImage } from "@/queries/user";
import { useStore } from "@/store/store";
import { computed } from "@vue/reactivity";

const props = defineProps({
  oldImage: { type: String, required: true },
  type: { type: String as PropType<"group" | "user">, required: true },
});

const imageSrc = ref<string | ArrayBuffer>(props.oldImage);
const imageInputRef = ref({} as HTMLInputElement);
const currFile = ref<File | null>(null);
const isLoading = ref(false);

const store = useStore();
const user = computed(() => store.state.user);
const groupId = computed(() => store.state.group?.id);

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
  if (user.value && groupId.value) {
    if (currFile.value) {
      if (props.type == "group") {
        await updateGroupImage(groupId.value, currFile.value);
      } else {
        const url = await uploadUserAvatar(user.value.uid, currFile.value);
        updateProfileImage(user.value.uid, url);
      }
    } else {
      if (props.type == "group") {
        await updateGroupImage(groupId.value, String(imageSrc.value));
      } else {
        updateProfileImage(user.value.uid, String(imageSrc.value));
      }
    }
  }
  isLoading.value = true;

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
