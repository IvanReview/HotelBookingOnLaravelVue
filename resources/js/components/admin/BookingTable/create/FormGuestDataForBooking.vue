<template>
        <v-dialog
            v-model="dialog"
            persistent
            max-width="600px"
        >
            <template v-slot:activator="{ on, attrs }">
                <v-btn
                    color="primary"
                    dark
                    v-bind="attrs"
                    v-on="on"
                    class="mx-5"
                >
                    <v-icon>mdi-plus</v-icon> Создать бронь
                </v-btn>
            </template>
            <v-card>
                <v-toolbar color="deep-purple darken-1" dark>
                    <v-card-title>
                        <span class="headline">Данные гостя для брони</span>
                    </v-card-title>
                </v-toolbar>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12"  >
                                <v-text-field
                                    label="Имя"
                                    required
                                    v-model="guest_data.name"
                                    placeholder="Имя.."
                                    :error-messages="getErrorsBookingAdmin.name"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" >
                                <v-text-field
                                    label="Фамилия"
                                    v-model="guest_data.surname"
                                    placeholder="Фамилия.."
                                    :error-messages="getErrorsBookingAdmin.surname"
                                ></v-text-field>
                            </v-col>

                            <v-col cols="12">
                                <v-text-field
                                    label="Email*"
                                    v-model="guest_data.email"
                                    placeholder="Email.."
                                    hint="По желанию"
                                    :error-messages="getErrorsBookingAdmin.email"
                                ></v-text-field>
                            </v-col>

                            <v-col cols="12">
                                <v-text-field
                                    label="Пасспорт"
                                    v-model="guest_data.passport"
                                    placeholder="Введите номер паспорта"
                                    hint="По желанию"
                                    :error-messages="getErrorsBookingAdmin.passport"
                                ></v-text-field>
                            </v-col>

                            <v-col cols="12">
                                <vue-tel-input-vuetify
                                    v-model="guest_data.phone"
                                    ref="phone"
                                    label="Номер телефона"
                                    required
                                    :onlyCountries="['GB', 'UA', 'RU', 'US', 'CZ']"
                                    hint="Номер вводится без +7"
                                    :error-messages="getErrorsBookingAdmin.phone"
                                >
                                </vue-tel-input-vuetify>
                            </v-col>

                        </v-row>
                    </v-container>

                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="red" @click="dialog = false">
                        Закрыть
                    </v-btn>
                    <v-btn color="blue darken-1" @click="createBooking">
                        Отправить
                        <v-icon right dark> mdi-send</v-icon>
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
    name: "FormGuestDataForBooking",
    data: () => ({
        dialog: false,
        guest_data:{
            name: '',
            passport: '',
            surname: '',
            email: '',
            phone: '',
        }
    }),
    props: {
        room: {
            type: Object,
            default: {},
        },

        bookingData: {
            type: Object,
            default: {}
        }

    },
    computed: {
        ...mapGetters([
            'getErrorsBookingAdmin'
        ])
    },
    methods: {
        ...mapActions([
            'submitCustomerDataForBookingAdmin'
        ]),

        createBooking() {
            let formData = new FormData
            formData.append('name', this.guest_data.name)
            formData.append('surname', this.guest_data.surname)
            formData.append('email', this.guest_data.email)
            formData.append('phone', this.guest_data.phone)
            formData.append('passport', this.guest_data.passport)
            formData.append('room_id', this.room.id)
            formData.append('date_start', this.bookingData.dateStart)
            formData.append('date_end', this.bookingData.dateEnd)
            formData.append('guest_amount', this.bookingData.guestAmount)


            this.submitCustomerDataForBookingAdmin(formData).then(resp => {
                if (resp.status === 200) {
                    this.$toasted.show('Номер успешно забронирован!!!',{
                        position: "bottom-left",
                    })

                    this.$emit('closeDialog')

                    setTimeout(() => {
                        this.dialog = false
                        this.$store.commit('set_searching_rooms_admin', [])
                        console.log(5566)
                    },5000)
                }
            })

        }
    }
}
</script>

<style scoped>

</style>
