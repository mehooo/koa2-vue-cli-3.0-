import Vue from 'vue'
import router from './routers/router'
import store from './store/store'
import App from './App.vue'
import './plugins/element.js'
import './assets/theme/index.css'

import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios,axios);

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app');
