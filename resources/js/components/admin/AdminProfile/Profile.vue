<template>
	<div>
		<v-card class = "my-10" md="6">
			<v-card-title >
				<span class="headline" style="width: 100%; text-align: center;">
					Профиль Администратора
				</span>
			</v-card-title>
			<v-card-text>
				<v-container>
					<v-row justify="center" class="my-10">
						<v-col cols="12" md="12">
							<v-text-field label="Логин"
                                          required
                                          v-model="form_data.name"
                                          :error-messages="errors.name"
                            >
                            </v-text-field>
						</v-col>

						<v-col cols="12" >
							<v-text-field label="Email"
                                          required
                                          v-model="form_data.email"
                                          :error-messages="errors.email"
                            >
                            </v-text-field>
						</v-col>

						<v-col cols="12" md="6">
							<v-text-field label="Новый пароль"
                                          type="password"
                                          required
                                          v-model="form_data.password"
                                          :error-messages="errors.password"
                            >
                            </v-text-field>
						</v-col>
						<v-col cols="6" md-6>
							<v-text-field label="Подтвердите пароль "
                                          type="password"
                                          require
                                          v-model="form_data.password_confirmation"
                                          :error-messages="errors.password_confirmation"
                            >
                            </v-text-field>
						</v-col>


					</v-row>
				</v-container>
			</v-card-text>

			<v-card-actions class="mx-4 pb-6">
				<v-spacer></v-spacer>

				<v-btn class="pa-5 " color="blue darken-1" @click="updateAdminData">
					<v-icon class="pr-2" dark>mdi-pencil</v-icon>  Редактировать
				</v-btn>
			</v-card-actions>

            <!--//всплывающее сообщение-->
            <v-snackbar
                v-model="snackbar"
                :timeout="timeout"
                :color="color"
                absolute
                left
                shaped
                bottom
            >
                {{text}}
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
		</v-card>
	</div>
</template>


<script>
import {mapActions, mapGetters} from "vuex";

    export default {
        name: "Profile",
        components: {},

        data: function () {
            return {
                form_data: {
                    id: '',
                    name: '',
                    email: '',
                    password: '',
                    password_confirmation: '',
                },
                snackbar: false,
                timeout: 4000,
                color: '',
                text: '',
                errors: [],

            }
        },
        computed:{
          ...mapGetters([
              'getUser'
          ])
        },
        watch: {
        },
        methods: {
            ...mapActions([
            ]),

           	updateAdminData(){
                let formData = new FormData
                formData.append('name', this.form_data.name)
                formData.append('email', this.form_data.email)
                formData.append('_method', 'PUT')
                if (this.form_data.password || this.form_data.password_confirmation) {
                    formData.append('password', this.form_data.password)
                    formData.append('password_confirmation', this.form_data.password_confirmation)
                }

           		axios({
                    method: 'POST',
                    url: `/api/auth/users/${this.form_data.id}`,
                    data: formData,
                })
                    .then(response => {
                        window.localStorage.setItem('user', JSON.stringify(response.data))
                        this.$store.dispatch('authenticateAction', response.data)

                        this.snackbar = true
                        this.color = 'teal'
                        this.text = 'Данные изменены!'
                        this.errors = []
                    })
                    .catch(errors => {
                        this.errors = errors.response.data.errors
                        this.text = 'Ошибка при изменении данных'
                        this.snackbar = true
                        this.color = 'red'
                    })
           	}


        },
        beforeCreate() {

        },
        mounted() {
            console.log(this.getUser)
            this.form_data = this.getUser

        }
    }
</script>
