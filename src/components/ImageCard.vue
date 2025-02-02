<script setup>
defineProps({
  image_data: Object,
});
</script>

<template>
  <div class="hover:scale-95 duration-300">
    <img
      v-lazy="{ src: image_data.download_url }"
      :alt="`Done by: {{ image_data.author }}`"
      class="rounded-sm h-[20rem] w-[30rem]"
    />
    <div class="p-2 rounded-2xl bg-slate-200 w-fit mt-2">
      <span class="font-semibold"> {{ image_data.author }}</span>
    </div>
  </div>
</template>

<style scoped></style>
