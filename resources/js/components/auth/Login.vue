<template>
    <div>
        <v-app id="inspire">
            <v-main>
                <v-container class="fill-height" fluid>
                    <v-row align="center" justify="center">
                        <v-col cols="12" sm="8" md="4">
                            <v-card class="elevation-12" :loading="isLoading">
                                <v-toolbar color="teal" dark flat>
                                    <v-toolbar-title>Войти</v-toolbar-title>
                                    <v-spacer></v-spacer>
                                    <v-tooltip bottom>
                                        <template v-slot:activator="{ on }">
                                            <v-btn
                                                :href="source"
                                                icon
                                                large
                                                target="_blank"
                                                v-on="on"
                                            >
                                                <v-icon>mdi-code-tags</v-icon>
                                            </v-btn>
                                        </template>
                                        <span>Source</span>
                                    </v-tooltip>
                                </v-toolbar>
                                <v-card-text>
                                    <v-form>
                                        <v-text-field
                                            label="E-mail"
                                            prepend-icon="mdi-account"
                                            type="text"
                                            v-model="form.email"
                                            :error-messages="errors.email"
                                        ></v-text-field>

                                        <v-text-field
                                            label="Пароль"
                                            prepend-icon="mdi-lock"
                                            type="password"
                                            v-model="form.password"
                                            :error-messages="errors.password"
                                        ></v-text-field>
                                    </v-form>
                                </v-card-text>
                                <v-card-actions>
                                    <router-link to="/register" class="ml-3">Регистрация</router-link>
                                    <v-spacer></v-spacer>
                                    <v-btn color="teal" @click="doLogin">
                                        <v-icon dark right>mdi-checkbox-marked-circle</v-icon> Войти
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-container>
            </v-main>
            <!--//всплывающее сообщение-->
            <v-snackbar
                v-model="snackbar"
                :timeout="timeout"
                :color="color"
                absolute
                right
                shaped
                top
            >
                {{text}}
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
        </v-app>
    </div>
</template>

<script>

import {mapActions} from 'vuex'
import * as auth from "../../helpers/http_service";

export default {
    name: "Login",
    data: () => ({
        form: {
            email: '',
            password: '',
            device_name: 'browser'
        },
        errors: {},
        color: 'teal',
        text: '',
        isLoading: false,
        snackbar: false,
        timeout: 5000,
    }),
    props: {
        source: String,
    },
    methods: {
        ...mapActions([
            'loginUser',
        ]),

        //Золигироваться
        doLogin () {
            this.isLoading = 'orange'
            let formData = new FormData
            formData.append('email', this.form.email)
            formData.append('password', this.form.password)
            formData.append('device_name', this.form.device_name)

            axios({
                method: 'POST',
                url: '/api/auth/login',
                data: formData,
                })
                .then(response => {

                    if (response.status === 200) {
                        window.localStorage.setItem('user', JSON.stringify(response.data.user))
                        window.localStorage.setItem('token', response.data.access_token)

                        this.$store.dispatch('authenticateAction', response.data.user)

                        this.form = {}
                        this.text = "Вы успешно вошли!"
                        this.snackbar = true
                        this.$router.push('/admin')
                        this.$refs.form.reset()
                    }
                })
                .catch(errors => {
                    switch (errors.response && errors.response.status) {
                        case 422:
                            this.errors = errors.response.data.errors;
                            //неверное сочетание логин пароль
                            if ( errors.response.data.errors.loginFail.length){
                                this.snackbar = true
                                this.color = 'red'
                                this.text = "Указанное сочетание логина и пароля не найдено!"
                            }
                            break;
                        case 500:
                            this.text = errors.response.data.message
                            break;
                        default:

                            break;
                    }
                }).finally(() => this.isLoading = false)



        }
    },
}
</script>

<style scoped>

</style>
