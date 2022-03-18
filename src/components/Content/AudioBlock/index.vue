<template>
  <div class="audio_block">
    <span @click="onAudioPlay"
      ><i
        class="fa-solid dark:text-gray-300 text-gray-700"
        :class="{
          'fa-pause': !paused && currentAudio?.src == src,
          'fa-play': paused || currentAudio?.src != src,
        }"
      ></i
    ></span>
    <input
      type="range"
      min="0"
      :max="totalTime"
      step="0.009"
      :value="trackTime"
      @change="onTimeRangeChange"
    />
    <div v-if="isVolumeInputShown" class="volume_input">
      <input type="range" min="0" step="0.01" max="1" :value="volume" @change="onVolumeChange" />
    </div>
    <span @click="isVolumeInputShown = !isVolumeInputShown">
      <i class="fa-solid fa-volume-up dark:text-gray-300 text-gray-700"></i>
    </span>
  </div>
</template>
<script setup lang="ts">
import { defineProps, watch, ref, computed } from "vue";
import { useStore } from "@/store/store";
const store = useStore();
const totalTime = ref(100);
const trackTime = ref(0);
const currentAudio = computed(() => store.state.audioMessage.audio);
const volume = computed(() => store.state.audioMessage.volume);
const paused = computed(() => store.state.audioMessage.paused);
const isVolumeInputShown = ref(false);
const props = defineProps({
  src: { type: String, required: true },
});
const onAudioPlay = () => {
  if (currentAudio.value) {
    if (currentAudio.value.src !== props.src) {
      currentAudio.value.pause();
      store.commit("setPaused", false);
    } else {
      if (paused.value) store.commit("setPaused", false);
      else store.commit("setPaused", true);
      return;
    }
  }
  const audio = new Audio(props.src);
  audio.onloadedmetadata = async () => {
    totalTime.value = audio.duration;
  };
  audio.ontimeupdate = () => {
    trackTime.value = audio.currentTime;
  };
  audio.onended = () => {
    trackTime.value = totalTime.value;
    store.commit("setPaused", true);
  };
  audio.volume = volume.value;
  audio.currentTime = trackTime.value;
  audio.play();
  store.commit("setAudio", audio);
};
const onTimeRangeChange = (event: any) => {
  if (currentAudio.value?.src === props.src) {
    currentAudio.value.currentTime = parseFloat(event.target.value);
  } else {
    trackTime.value = parseFloat(event.target.value);
  }
};
const onVolumeChange = (event: any) => {
  store.commit("setVolume", parseFloat(event.target.value));
  if (currentAudio.value) {
    currentAudio.value.volume = parseFloat(event.target.value);
  }
};
watch([paused], () => {
  if (currentAudio.value) {
    if (paused.value) {
      currentAudio.value.pause();
    } else {
      currentAudio.value.play();
    }
  }
});
</script>
<style scoped>
.audio_block {
  @apply bg-gray-200 dark:bg-gray-800 w-96 h-14 rounded-lg
  mt-1 flex items-center gap-4  px-3 py-2 relative;
}
.audio_block span {
  @apply hover:bg-slate-500 cursor-pointer rounded-full 
  py-1.5 px-2.5 flex items-center justify-center;
}
.volume_input {
  @apply absolute h-4 w-28 rounded-md right-[-14%] bottom-12 
          rotate-90 z-10 bg-black bg-opacity-50 px-1 flex
          items-center justify-center pb-1;
}
.volume_input input {
  @apply w-full h-2 rotate-180 z-20;
}
</style>
