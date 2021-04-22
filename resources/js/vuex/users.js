import * as auth from '../helpers/http_service';
import axios from "axios";

let profile = auth.getProfile();
let isLogged = auth.isLoggedIn();

export default {
    state: {
        users: [],
        user: profile ? profile : {},

        isLoggedIn: isLogged ? isLogged : null,

    },
    actions: {

        loginUser({commit}, formData) {

        },

        getUser() {
            axios.get('/api/user')
                .then(response => {

                })
                .catch(e => {
                    console.log(e)
                })
        },

        authenticateAction({commit}, user) {
            commit('authenticate', user)
        }

        /*receiveUsers({commit}) {
            return  axios({
                method: 'GET',
                url: '/api/admin/users',
                headers: {
                    'Authorization': 'Bearer ' + auth.getAccessToken()
                }})
                .then((response) => {
                    commit('set_users', response.data.data)
                    return true

                })
                .catch((error) => {
                    console.log(error)
                })

        },*/



    },
    mutations: {

        authenticate(state, payload) {
            state.isLoggedIn = auth.isLoggedIn()

            if(state.isLoggedIn){
                state.user = payload
            } else {
                state.user = {}
            }
        },

        set_users(state, users) {
            state.users = users
        },

        update_users_to_state(state, {user, index}) {
            state.users.splice(index, 1, user)
        },

        profile_update_errors(state, errors) {
            state.userError = errors
        }


    },

    getters: {
        getUsers(state) {
            return state.users
        },

        getUser(state) {
            return state.user
        },

        getRole(state){
            return state.user.role
        },
        getIsLogged(state) {
            return state.isLoggedIn
        },
        getProfile(state) {
            return state.profile
        }



    }
}
