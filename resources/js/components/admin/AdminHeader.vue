<template>
    <div>
        <nav>
            <v-app-bar color="primary" dark app>

                <v-app-bar-nav-icon @click="isOpenTom"></v-app-bar-nav-icon>

                <v-toolbar-title class="">
                    <v-icon>mdi-home-city</v-icon>
                    Бронирование Гостиниц
                </v-toolbar-title>

                <v-spacer></v-spacer>

                <v-menu left bottom >
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn  v-bind="attrs" v-on="on" color="teal">
                            Потльзователь: {{getUser.name}}
                            <v-icon>mdi-dots-vertical</v-icon>
                        </v-btn>
                    </template>

                    <v-list >
                        <router-link to='/'>
                            <v-list-item @click="">
                                <v-list-item-icon>
                                    <v-icon color="white">mdi-home-city-outline</v-icon>
                                </v-list-item-icon>
                                <v-list-item-title>На главную</v-list-item-title>
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
                </v-menu>
            </v-app-bar>

            <AdminSidebar
                :openBar="isOpen"
                @clickBar='isOpen = false'
            ></AdminSidebar>
        </nav>
    </div>
</template>

<script>
import AdminSidebar from './AdminSidebar'
import {mapGetters} from "vuex";

export default {
    name: 'AdminHeader',
    components: {
        AdminSidebar
    },

    data: () => ({
        isOpen: false,
        group: null,
    }),
    watch: {
        isOpen() {

        }
    },
    computed: {
        ...mapGetters([
            'getUser',
            'getRole',
            'getIsLogged'
        ])
    },
    methods: {
        isOpenTom() {
            this.isOpen = true
        },

        logout() {
            localStorage.removeItem('token')
            localStorage.removeItem('user')
            axios.get('/api/auth/logout')
                .then(response => {

                    this.$store.dispatch('authenticateAction', response.data.user)

                    if (this.$route.path !== '/' ){
                        this.$router.push('/')
                    }
                })
                .catch(e => {
                    console.log(e)
                })


        }

    }
}
</script>
