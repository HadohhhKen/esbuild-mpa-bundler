<script setup lang="ts">
import { onMounted, ref } from 'vue';
import axios from 'axios';
const data = ref();
onMounted(async () => {
  try {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?_=${Date.now()}`);
    const allData = response.data;
    data.value = allData.slice(0, 20);
  } catch (e) {
    console.error('Error fetching data:', e);
  }
});
</script>
<template>
  <ul class="posts">
    <li v-for="item in data" :key="item.id" class="posts__item">
      <div class="posts__title">{{ item.title }}</div>
      <div class="posts__desc">{{ item.body }}</div>
    </li>
  </ul>
</template>
<style scoped lang="scss">
@use '../../css/base/index' as *;

.posts {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  width: 95%;
  max-width: 1000px;
  padding-block: 60px;
  margin-inline: auto;

  .posts__item {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 20px;
    background-color: #fafafa;
  }

  .posts__title {
    font-weight: 700;
  }

  .posts__desc {
    flex-grow: 1;
  }
}
</style>
