import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from './router';
import 'amfe-flexible'; // 动态改变根字体大小
import { Image as VanImage } from 'vant';

const app = createApp(App);
app.use(router);
app.use(VanImage);
app.mount('#app');
