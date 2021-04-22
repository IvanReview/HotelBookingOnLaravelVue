<template>
    <div class="formBooking">
        <h1 class="text-center mb-4">Данные Гостя</h1>

        <v-row justify="center" class="my-10">
            <v-col cols="12" sm="10" md="8" lg="6">
                <v-card ref="form">
                    <v-card-text>
                        <v-text-field
                            ref="name"
                            v-model="name"
                            :rules="[() => !!name || 'Поле обязательно для заполнения']"
                            :error-messages="errorMessages"
                            label="Имя"
                            placeholder="Имя.."
                            :counter="20"
                        ></v-text-field>

                        <v-text-field
                            ref="lastname"
                            v-model="lastname"
                            :rules="[ () => !!lastname || 'Поле обязательно для заполнения',
                        () => !!lastname && lastname.length <= 20 || 'Данное поле должно быть менее 20 символов' ]"
                            :error-messages="errorMessages"
                            :counter="20"
                            label="Фамилия"

                        ></v-text-field>

                        <v-text-field
                            v-model="email"
                            ref="email"
                            :rules="[ v => !!v || 'Поле E-mail обязательно для заполнения',
                          v => /.+@.+/.test(v) || 'Введите валидный E-mail']"
                            label="E-mail"
                            :error-messages="errorMessages"
                        ></v-text-field>

                        <vue-tel-input-vuetify
                            v-model="phone"
                            ref="phone"
                            :error-messages="errorMessages"
                            label="Номер телефона"
                            required
                            :onlyCountries="['GB', 'UA', 'RU', 'US', 'CZ']"
                            hint="Номер вводится без +7"
                            :rules="[ v => !!v || 'Поле обязательно для заполнения',
                         v => !!v && /[.0-9]+/.test(v) || 'Номер должен состоять из цифр']"
                        >
                        </vue-tel-input-vuetify>

                        <v-checkbox
                            v-model="checkbox"
                            ref="checkbox"
                            :rules="[v => !!v || 'Вы должны согласиться!']"
                            label="Согласны на обработку данных?"
                            :error-messages="errorMessages"
                            required
                        ></v-checkbox>
                    </v-card-text>


                    <v-divider class="mt-12"></v-divider>
                    <v-card-actions>
                        <v-btn to="/" text>
                            Назад
                        </v-btn>

                        <v-spacer></v-spacer>

                        <v-slide-x-reverse-transition>
                            <v-tooltip
                                v-if="formHasErrors"
                                left
                            >
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn
                                        icon
                                        class="my-0"
                                        v-bind="attrs"
                                        @click="resetForm"
                                        v-on="on"
                                    >
                                        <v-icon>mdi-refresh</v-icon>
                                    </v-btn>
                                </template>
                                <span>Обновить форму</span>
                            </v-tooltip>
                        </v-slide-x-reverse-transition>

                        <v-btn color="teal" class="px-5 my-2" large @click="submit">
                            <v-icon dark right> mdi-checkbox-marked-circle</v-icon>
                            Отправить
                        </v-btn>

                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>


<script>
import {mapActions, mapGetters} from "vuex";

export default {
    name: 'FormBooking',


    components: {},
    data: () => ({
        prodId: '',
        name: null,
        lastname: null,
        checkbox: false,
        email: null,
        phone: null,

        formHasErrors: false,
        errorMessages: '',

    }),
    computed: {
        form() {
            return {
                checkbox: this.checkbox,
                name: this.name,
                lastname: this.lastname,
                email: this.email,
                phone: this.phone,
            }
        },
    },

    watch: {
        name() {
            this.errorMessages = ''
        },
    },

    methods: {
        ...mapActions([
            'submitCustomerData'
        ]),

        resetForm() {
            this.errorMessages = []
            this.formHasErrors = false

            Object.keys(this.form).forEach(f => {

                this.$refs[f].reset()
            })
        },

        validate() {
            this.$refs.form.validate()
        },

        generateData() {

        },

        submit() {
            this.formHasErrors = false

            Object.keys(this.form).forEach(f => {
                //чтоб появилась кнопка сброса
                if (!this.form[f]) this.formHasErrors = true

                if (f !== 'phone') {
                    this.$refs[f].validate(true)
                } else {
                    this.$refs[f].$refs.input.validate(true)
                }
            })

            if (!this.formHasErrors ) {
                let bookingData = window.localStorage.getItem('bookingData');
                bookingData = JSON.parse(bookingData)

                let formData = new FormData
                formData.append('name', this.name)
                formData.append('surname', this.lastname)
                formData.append('email', this.email)
                formData.append('phone', this.phone)
                formData.append('room_id', this.$route.params.roomId)
                formData.append('date_start', bookingData.dateStart)
                formData.append('date_end', bookingData.dateEnd)
                formData.append('guest_amount', bookingData.guestAmount)

                this.submitCustomerData(formData).then(resp => {
                    if (resp.status === 200) {
                        this.$toasted.show('Номер успешно забронирован!!!')
                        this.$router.push('/')

                        window.localStorage.removeItem('bookingData')
                        this.$store.commit('set_rooms_user', {})
                    }
                })
            }


        },
    },

    created() {
        /*this.prodId = window.location.href.split('/')[4]*/

    },
    mounted() {

    }


}
</script>

<style>
    .formBooking{

    }
</style>
