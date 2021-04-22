<template>
    <v-app id="inspire1">

        <!-- Навбар -->
        <AdminHeader></AdminHeader>

        <v-main>
            <v-container>
                    <!-- сайдбар -->

                <!-- Контент  -->
                <router-view></router-view>

            </v-container>
        </v-main>
        <!-- футер -->
    </v-app>
</template>

<script>
    import AdminHeader from './AdminHeader'
    import {mapActions} from "vuex";
    import * as auth from  '../../helpers/http_service'

    export default {
        name: "AdminMain",
        components: {AdminHeader,},

        data: function () {
            return {
                isOpen: true,
                counter: 0,
            }
        },
        watch: {
        },
        methods: {
            ...mapActions([
            ]),



        },
        created() {
            //дефолтные заголовки для всех запросов
            axios.defaults.headers.common["Authorization"] = `Bearer ` + localStorage.getItem('token')
        },
        mounted() {


        }
    }
</script>

<style >
    #inspire1 a {
        color: #fff;
        text-decoration: none;

    }

</style>
