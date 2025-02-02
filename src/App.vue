<script setup>
// Imports

import ImageCard from "@/components/ImageCard.vue";
import image_service from "@/services/image_service.js";
import { useInfiniteScroll } from "@vueuse/core";
import { ref, useTemplateRef } from "vue";

// Variables

const current_page = ref(1);
const items_page = ref(12);
let loader = ref(false);
const el = useTemplateRef("ele");

let images = ref([]);

// Methods

let get_images = async (page, limit) => {
  await image_service
    .get_images(page, limit)
    .then((res) => {
      images.value = res.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

let update_images = async (page, limit) => {
  if (loader.value) return;

  loader.value = true;
  await image_service
    .get_images(page + 1, limit)
    .then((res) => {
      setTimeout(() => {
        current_page.value++;
        images.value.push(...res.data);

        loader.value = false;
        console.log(images.value);
      }, 200);
    })

    .catch((error) => {
      console.log(error);
    });
};

let remove_image = (id_removed) => {
  const filtered_out = images.value.filter((image) => {
    return image.id !== id_removed;
  });

  images.value = filtered_out;
};

// Sideeffects

useInfiniteScroll(
  el,
  () => {
    update_images(current_page.value, items_page.value);
  },
  {
    distance: 1,
  }
);

get_images(current_page.value, items_page.value);
</script>

<template>
  <div
    ref="ele"
    class="bg-zinc-50 p-5 grid place-items-center grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 overflow-auto h-screen"
  >
    <ImageCard
      @click="remove_image(image.id)"
      v-for="image in images"
      :key="image.id"
      :image_data="image"
    ></ImageCard>

    <div
      v-if="loader"
      class="absolute left-10 bottom-20 px-4 py-2 rounded-xl bg-green-300 max-w-max"
    >
      <span class="font-semibold">Loading more images</span>
    </div>
  </div>
</template>

<style scoped></style>
