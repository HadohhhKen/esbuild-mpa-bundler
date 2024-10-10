import { createApp } from 'vue';
import SubContents from './components/SubContents.vue';

document.addEventListener('DOMContentLoaded', () => {
  createApp(SubContents).mount('#sub-contents');
});
