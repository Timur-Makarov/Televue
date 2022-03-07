<template>
  <div class="sidebar-icon group">
    <i v-if="icon" class="fa-solid text-2xl" :class="{ [`fa-${icon}`]: icon }" />
    <img v-else :src="image" />
    <span class="sidebar-tooltip group-hover:scale-100">
      {{ tooltip }}
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    icon: String,
    image: String,
    tooltip: String,
  },
});
</script>

<style scoped>
img {
  @apply rounded-3xl;
}
</style>
