<template>
    <nav class="header">
        <v-app-bar app flat color="deep-purple" dark class="px-7">
            <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

            <v-toolbar-title class="">
                <v-icon>mdi-home-city</v-icon> Бронирование Гостиниц
            </v-toolbar-title>

            <v-spacer></v-spacer>



            <v-btn v-if="!getIsLogged" color="teal">
                <router-link to="/login">
                    <v-icon>mdi-home</v-icon>
                    Войти в Админпанель
                </router-link>
            </v-btn>


            <v-menu left bottom v-else>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn  v-bind="attrs" v-on="on">
                        Потльзователь: {{getUser.name}}
                        <v-icon>mdi-dots-vertical</v-icon>
                    </v-btn>
                </template>

                <v-list v-if="getRole === 'admin'">
                    <router-link to='/admin'>
                        <v-list-item @click="">
                            <v-list-item-icon>
                                <v-icon color="white">mdi-home-city-outline</v-icon>
                            </v-list-item-icon>
                            <v-list-item-title>Админка</v-list-item-title>
                        </v-list-item>
                    </router-link>

                    <router-link to=''>
                    <v-list-item @click="logout">
                        <v-list-item-icon>
                            <v-icon color="white">mdi-export</v-icon>
                        </v-list-item-icon>

                        <v-list-item-title class="white--text">
                            Выход
                        </v-list-item-title>
                    </v-list-item>
                    </router-link>
                </v-list>

                <v-list v-else>
                    <v-list-item @click="">
                        <v-list-item-icon>
                            <v-icon color="white">mdi-account-cancel-outline</v-icon>
                        </v-list-item-icon>

                        <v-list-item-title>
                            У вас нет никаких прав
                        </v-list-item-title>
                    </v-list-item>

                    <v-list-item @click="logout">
                        <v-list-item-icon>
                            <v-icon color="white">mdi-export</v-icon>
                        </v-list-item-icon>

                        <v-list-item-title class="white--text">
                            Выход
                        </v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>

            <!--//всплывающее сообщение-->
            <v-snackbar
                v-model="snackbar"
                :timeout="timeout"
                :color="color"
                absolute
                right
                shaped
                bottom
            >
                Вы успешно вышли из профиля!
                <template v-slot:action="{ attrs }">
                    <v-btn
                        text
                        color="black"
                        v-bind="attrs"
                        @click="snackbar = false"
                    >
                        Close
                    </v-btn>
                </template>
            </v-snackbar>
        </v-app-bar>

        <!--//Навбар-->
        <v-navigation-drawer app v-model="drawer" color="deep-purple">
            <v-list-item two-line>
                <v-list-item-avatar>
                    <img src="https://avatars0.githubusercontent.com/u/9064066?v=4&s=460">
                </v-list-item-avatar>
                <v-list-item-content>
                    <v-list-item-title>{{currentUser.name}}</v-list-item-title>
                    <v-list-item-subtitle>{{currentUser.email}}</v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>

            <v-divider></v-divider>

            <v-list nav dense>
                <v-list-item-group
                    v-model="group"
                    active-class="deep-purple--text text--accent-4"
                >
                    <router-link to='/admin'>
                        <v-list-item>
                            <v-list-item-icon>
                                <v-icon>mdi-home</v-icon>
                            </v-list-item-icon>
                            <v-list-item-title>
                                Админка
                            </v-list-item-title>
                        </v-list-item>
                    </router-link>


                    <router-link to=''>
                        <v-list-item @click="logout">
                            <v-list-item-icon>
                                <v-icon color="orange">mdi-power</v-icon>
                            </v-list-item-icon>
                            <v-list-item-title class="orange--text">
                                Выход
                            </v-list-item-title>
                        </v-list-item>
                    </router-link>

                </v-list-item-group>
            </v-list>
        </v-navigation-drawer>
    </nav>

</template>

<script>
import * as auth from '../../../helpers/http_service';
import {mapGetters} from "vuex";

export default {
    name: "Header",
    data: () => ({
        drawer: false,
        group: null,
        currentUser: {},

        color: 'teal',
        text: '',
        snackbar: false,
        timeout: 4000,
    }),
    computed: {
        ...mapGetters([
            'getUser',
            'getRole',
            'getIsLogged'
        ])
    },
    methods: {

        logout() {
            axios.get('/api/auth/logout')
                .then(response => {
                    localStorage.removeItem('token')
                    localStorage.removeItem('user')

                    this.$store.dispatch('authenticateAction', response.data.user)

                    if (this.$route.path !== '/' ){
                        this.$router.push('/')
                    }
                })
                .catch(e => {
                    console.log(e)
                })

        },
    },
    created() {

        axios.defaults.headers.common["Authorization"] = `Bearer ` + localStorage.getItem('token')

    }
}
</script>

<style scoped>


</style>
