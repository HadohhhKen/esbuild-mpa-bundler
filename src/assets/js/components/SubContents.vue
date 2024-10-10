<script setup lang="ts">
import { onMounted, ref } from 'vue';
import axios from 'axios';
const data = ref();
onMounted(async () => {
  try {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/photos?_=${Date.now()}`);
    const allData = response.data;
    data.value = allData.slice(0, 20);
  } catch (e) {
    console.error('Error fetching data:', e);
  }
});
</script>
<template>
  <ul class="gallery">
    <li v-for="item in data" :key="item.id">
      <img loading="lazy" :src="item.thumbnailUrl" alt="" width="1" height="1" />
    </li>
  </ul>
</template>
<style scoped lang="scss">
@use '../../css/base/index' as *;

.gallery {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  width: 95%;
  max-width: 1000px;
  margin-inline: auto;

  li {
    position: relative;
    width: 100%;
    height: 0;
    padding-top: 100%;

    img {
      @include absolute-full;
      object-fit: contain;
    }
  }
}
</style>
