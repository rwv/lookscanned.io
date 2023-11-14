<template>
  <n-image :src="imageURL" v-if="imageURL" style="display: block" />
  <div v-else class="image-placeholder">
    <n-skeleton width="100%" height="100%" />
  </div>
</template>

<script lang="ts" setup>
import { NImage, NSkeleton } from "naive-ui";
import { toRef } from "vue";
import { useObjectUrl } from "@vueuse/core";

const props = defineProps<{
  image?: Blob;
}>();

const image = toRef(props, "image");

const imageURL = useObjectUrl(image);
</script>

<style scoped>
.preview {
  width: 100%;
  height: 100%;
}

.image-placeholder {
  width: 100%;
  aspect-ratio: 409.88 / 530.42;
}
</style>
