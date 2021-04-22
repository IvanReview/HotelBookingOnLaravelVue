
require('./bootstrap');

import Vue from 'vue'
import App from "./components/App";
import router from "./router";
import store from "./vuex"
import Toasted from 'vue-toasted';

import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import '@mdi/font/css/materialdesignicons.css'
import vuetify from './plugins/vuetify'
import VueTelInputVuetify from 'vue-tel-input-vuetify/lib';

import passportFilter from "./filters/passportFilter";

Vue.use(VueTelInputVuetify, {
    vuetify,
});
Vue.use(Toasted, {
    theme: "bubble",
    position: "top-left",
    duration : 5000,
})

Vue.filter('passportFilter', passportFilter)


Vue.use(Vuetify)
const opts = {
    theme: { dark: true },
    icons: {iconfont: 'mdi'}
}




const app = new Vue({
    el: '#app',
    store,
    router,
    vuetify: new Vuetify(opts),
    components: {
        App
    }
});
