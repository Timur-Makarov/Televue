<template>
  <div v-show="isShown" class="window">
    <span @click="openInput(audioInputRef)"><i class="fa-solid fa-file-audio a" /></span>
    <span @click="openInput(imageInputRef)"><i class="fa-solid fa-file-image b" /></span>
    <span @click="handleRecorder" :class="{ microphone_active: recorder }"
      ><i class="fa-solid fa-microphone c"
    /></span>
  </div>
  <input accept="audio/*" type="file" hidden ref="audioInputRef" />
  <input accept="image/*" type="file" hidden ref="imageInputRef" />
</template>

<script setup lang="ts">
import { defineProps, ref, onMounted, onUnmounted, defineEmits } from "vue";
import fixWebmDuration from "webm-duration-fix";

defineProps({
  isShown: Boolean,
});

const emit = defineEmits<{
  (event: "setFile", file: File | Blob, type: "image" | "audio"): void;
}>();

const audioInputRef = ref<HTMLInputElement | null>(null);
const imageInputRef = ref<HTMLInputElement | null>(null);
const recorder = ref<MediaRecorder | null>(null);

const openInput = (ref: HTMLInputElement) => ref.click();

const handleFile = (e: any, type: "image" | "audio") => {
  emit("setFile", e.target.files[0], "image");
};

const handleRecorder = async () => {
  if (recorder.value) {
    recorder.value.stop();
    return;
  }
  const stream = await navigator.mediaDevices.getUserMedia({
    audio: true,
    video: false,
  });

  const options = { mimeType: "audio/webm" };
  const recordedChunks: Array<Blob> = [];
  recorder.value = new MediaRecorder(stream, options);

  recorder.value.addEventListener("dataavailable", (e) => {
    if (e.data.size > 0) {
      recordedChunks.push(e.data);
    }
  });

  recorder.value.addEventListener("stop", async (e) => {
    const blob = await fixWebmDuration(new Blob(recordedChunks));
    emit("setFile", blob, "audio");
    recorder.value = null;
  });

  recorder.value.start();
};

onMounted(() => {
  audioInputRef.value?.addEventListener("change", (e) => handleFile(e, "audio"));
  imageInputRef.value?.addEventListener("change", (e) => handleFile(e, "image"));
});

onUnmounted(() => {
  audioInputRef.value?.removeEventListener("change", (e) => handleFile(e, "audio"));
  imageInputRef.value?.removeEventListener("change", (e) => handleFile(e, "image"));
});
</script>

<style scoped>
.window {
  @apply absolute top-[-210%] left-0 h-24 w-52 rounded-md
         flex items-center justify-around dark:bg-gray-600
         bg-gray-500;
}
.a {
  @apply text-blue-300;
}

.b {
  @apply text-green-300;
}

.c {
  @apply text-red-900;
}

.a,
.b,
.c {
  @apply text-4xl cursor-pointer;
}

.microphone_active {
  @apply border-2 border-solid border-red-500 rounded-md
  p-2;
}
</style>
