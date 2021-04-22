<template>
    <v-navigation-drawer
        app
        v-model="drawer"
        temporary
        class="primary"
        width="350"
    >

        <v-layout column align-center>
            <v-flex class="mt-5">
                <v-avatar color="indigo" size="100">
                    <img src="https://a.d-cd.net/1a424f2s-960.jpg" alt="">
                </v-avatar>
                <p class="white--text subheading mt-1"> My Name</p>
            </v-flex>
        </v-layout>

        <v-divider></v-divider>

        <v-list nav dense>
            <v-list-item-group
                v-model="group"
                active-class="deep-purple--text text--accent-4"
            >
                <router-link to='/' class="menu-item">
                    <v-list-item style="font-size: 5em">
                        <v-list-item-icon>
                            <v-icon>mdi-home</v-icon>
                        </v-list-item-icon>

                        <v-list-item-title>
                            На главную
                        </v-list-item-title>
                    </v-list-item>
                </router-link>
                <v-divider></v-divider>

                <router-link to='/admin' class="menu-item">
                    <v-list-item >
                        <v-list-item-icon>
                            <v-icon>mdi-table-sync</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title>
                            Главная Таблица
                        </v-list-item-title>

                        <v-badge v-if="new_booking" color="orange" :content="new_booking">
                            new
                        </v-badge>

                    </v-list-item>
                </router-link>

                <v-divider></v-divider>

                <router-link to='/admin/schedule' class="menu-item">
                    <v-list-item style="font-size: 5em">
                        <v-list-item-icon>
                            <v-icon>mdi-table-large</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title>
                            Главное расписание
                        </v-list-item-title>
                    </v-list-item>
                </router-link>

                <v-divider></v-divider>

                <router-link to='/admin/profile' class="menu-item">
                    <v-list-item>
                        <v-list-item-icon>
                            <v-icon>mdi-account-cowboy-hat</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title>
                            Профиль Администратора
                        </v-list-item-title>
                    </v-list-item>
                </router-link>

                <v-divider></v-divider>

                <router-link to='/admin/rooms' class="menu-item">
                    <v-list-item>
                        <v-list-item-icon>
                            <v-icon>mdi-garage</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title>
                            Номера
                        </v-list-item-title>
                    </v-list-item>
                </router-link>

                <router-link to='/admin/guest' class="menu-item">
                    <v-list-item>
                        <v-list-item-icon>
                            <v-icon>mdi-account-tie</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title>
                            Гости
                        </v-list-item-title>
                    </v-list-item>
                </router-link>

                <router-link to='/admin/users' class="menu-item">
                    <v-list-item>
                        <v-list-item-icon>
                            <v-icon>mdi-human-queue</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title>
                            Пользователи
                        </v-list-item-title>
                    </v-list-item>
                </router-link>

            </v-list-item-group>
        </v-list>
    </v-navigation-drawer>
</template>

<script>

import {mapActions, mapGetters} from "vuex";

export default {
    name: 'AdminSidebar',
    components: {},
    data: () => ({
        drawer: false,
        group: null,
        messages: 1,
        show: false,

        show_new: false,
    }),
    watch: {
        openBar() {
            this.drawer = this.openBar
        },

        drawer(val) {
            if (val === false) {
                this.$emit('clickBar')
            }
        }
    },
    computed: {
        ...mapGetters([
            'getBookingDataStatus'
        ]),

        new_booking() {
            let a = this.getBookingDataStatus.filter(item => item.status == 0).length

            return a
        }
    },
    props: {
        openBar: false,
    },
    methods: {
        ...mapActions([
            'getMainTableData'
        ])
    },
    mounted() {
        this.getMainTableData(0)


    }

}
</script>

<style>
.v-list--dense .menu-item .v-list-item .v-list-item__title {
		font-size: 17px;
        font-weight: bold;
	}
</style>
