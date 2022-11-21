import { createApp } from 'vue'
import App from './App.vue'
import './assets/base.css'
import router from './update/entities/router';

const app = createApp(App).use(router).mount('#app');


