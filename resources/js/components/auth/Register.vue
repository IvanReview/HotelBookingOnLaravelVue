<template>
    <div>
        <v-app id="inspire">
            <v-main>
                <v-container class="fill-height" fluid>
                    <v-row align="center" justify="center">
                        <v-col cols="12" sm="8" md="4">
                            <v-card class="elevation-12" :loading="isLoading">
                                <v-toolbar color="primary" dark flat>
                                    <v-toolbar-title>Регистрация</v-toolbar-title>
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

                                    <v-form ref="form">
                                        <v-text-field
                                            label="Имя"
                                            prepend-icon="mdi-account"
                                            type="text"
                                            v-model="form.name"
                                            :error-messages="errors.name"
                                        ></v-text-field>
                                        <v-text-field
                                            label="E-mail"
                                            prepend-icon="mdi-email"
                                            type="email"
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

                                        <v-text-field
                                            id="password"
                                            label="Подтверждение пароля"
                                            prepend-icon="mdi-lock-question"
                                            type="password"
                                            v-model="form.password_confirmation"
                                            :error-messages="errors.password_confirmation"
                                        ></v-text-field>
                                    </v-form>

                                </v-card-text>
                                <v-card-actions>
                                    <router-link to="/login" class="ml-3">Уже имеете акаунт?</router-link>
                                    <v-spacer></v-spacer>
                                    <v-btn color="primary" @click="doRegister">
                                        <v-icon dark right>mdi-checkbox-marked-circle</v-icon>
                                        Отправить
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
                color="teal"
                absolute
                right
                shaped
                top
            >
                Регистрация прошла успешно!
                <template v-slot:action="{ attrs }">
                    <v-btn
                        text
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
export default {
    name: "Register",
    data: () => ({
        form: {
            name: '',
            email: '',
            password: '',
            password_confirmation: ''
        },
        errors: {},
        isLoading: false,
        snackbar: false,
        timeout: 4000,
    }),
    props: {
        source: String,
    },
    methods: {
        doRegister () {
            this.isLoading = 'orange'
            let formData = new FormData
            formData.append('name', this.form.name)
            formData.append('email', this.form.email)
            formData.append('password', this.form.password)
            formData.append('password_confirmation', this.form.password_confirmation)

            axios({
                method: 'POST',
                url: '/api/auth/register',
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }})
                .then(resp => {
                    this.form = {}
                    this.snackbar = true
                    this.$router.push('/login')
                    this.$refs.form.reset()
                })
                .catch(errors => {
                    this.errors = errors.response.data.errors
                    console.log(this.errors)
                })
                .finally(() => this.isLoading = false)


        }
    }
}
</script>

<style scoped>

</style>
