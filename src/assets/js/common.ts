import { createApp } from 'vue';
import CommonHeader from './components/CommonHeader.vue';
import CommonFooter from './components/CommonFooter.vue';

document.addEventListener('DOMContentLoaded', () => {
  createApp(CommonHeader).mount('#common-header');
  createApp(CommonFooter).mount('#common-footer');
});
