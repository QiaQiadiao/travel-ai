import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from './router';
import 'amfe-flexible'; // 动态改变根字体大小
import { Image as VanImage,Button,Uploader,ConfigProvider,Field, CellGroup,NavBar } from 'vant';
import 'vant/lib/index.css';
const app = createApp(App);
app.use(router);
app.use(VanImage);
app.use(Button);
app.use(Uploader);
app.use(ConfigProvider);
app.use(Field);
app.use(CellGroup);
app.use(NavBar);
app.mount('#app');
