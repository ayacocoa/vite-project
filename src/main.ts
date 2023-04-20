import { createApp } from 'vue'
import App from './App.vue'
import router from './router/route'

import { Icon, NavBar,Toast } from 'vant';

const app = createApp(App)
app.use(router)
app.use(NavBar).use(Icon).use(Toast);
app.mount('#app')


