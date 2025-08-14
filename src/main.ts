import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from './router';
import 'amfe-flexible'; // 动态改变根字体大小
import { Image as VanImage,Button,Uploader,ConfigProvider,Field, CellGroup,NavBar, Picker, Popup,Form ,Dialog} from 'vant';
import 'vant/lib/index.css';
import { createPinia } from 'pinia'
const pinia = createPinia()
const app = createApp(App);
app.use(pinia)
app.use(router);
app.use(VanImage);
app.use(Button);
app.use(Uploader);
app.use(ConfigProvider);
app.use(Field);
app.use(CellGroup);
app.use(NavBar);
app.use(Picker);
app.use(Popup);
app.use(Form);
app.use(Dialog);
app.mount('#app');
