import Vue from 'vue'
import Vuex from 'vuex'
import users from "./users";
import rooms from './rooms'
import guests from './guests'
import booking from './booking'

Vue.use(Vuex);

export default new Vuex.Store({

    state: {
        count: 0,
        user: {}
    },

    actions: {


    },
    mutations: {

    },
    getters: {

    },

    modules: {
        users,
        rooms,
        guests,
        booking,
    }
})
