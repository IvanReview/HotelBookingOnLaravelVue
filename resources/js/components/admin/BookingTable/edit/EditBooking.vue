<template>
    <v-dialog
        v-model="dialog"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
    >
        <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" fab small dark v-bind="attrs" v-on="on">
                <v-icon>mdi-pencil</v-icon>
            </v-btn>
        </template>


        <v-card>
            <v-toolbar dark color="primary">
                <v-btn icon dark @click="dialog = false">
                    <v-icon>mdi-close</v-icon>
                </v-btn>

                <v-toolbar-title>Редактировать бронь</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                    <v-btn dark text @click="updateData">
                        Обновить
                    </v-btn>
                </v-toolbar-items>
            </v-toolbar>

            <v-list three-line subheader>
                <v-card-text>
                    <v-card class = "my-1">
                        <v-card-title >
                            <span class="headline" style="width: 100%; text-align: center;">
                                Редактирование данных брони
                            </span>
                        </v-card-title>
                        <v-card-text>
                            <v-container style="width: 500px">
                                <v-row>
                                    <v-col cols="12" sm="6">
                                        <v-text-field
                                            label="Имя"
                                            v-model="booking_edit.guest.name"
                                            :error-messages="getErrorsEditBookingAdmin.name"
                                        ></v-text-field>
                                    </v-col>

                                    <v-col cols="12" sm="6" >
                                        <v-text-field
                                            label="Фамилия"
                                            hint=""
                                            v-model="booking_edit.guest.surname"
                                            :error-messages="getErrorsEditBookingAdmin.surname"
                                        ></v-text-field>
                                    </v-col>

                                    <v-col cols="12">
                                        <v-text-field
                                            label="Паспорт"
                                            required
                                            v-model="booking_edit.guest.passport"
                                            :error-messages="getErrorsEditBookingAdmin.passport"
                                        ></v-text-field>
                                    </v-col>

                                    <v-col cols="12">
                                        <v-text-field
                                            label="Email"
                                            required
                                            v-model="booking_edit.guest.email"
                                            hint="Не обязательно*"
                                            :error-messages="getErrorsEditBookingAdmin.email"
                                        ></v-text-field>
                                    </v-col>

                                    <v-col cols="12">
                                        <v-text-field
                                            label="Телефон"
                                            required
                                            value="8978159877"
                                            v-model="booking_edit.guest.phone"
                                            :error-messages="getErrorsEditBookingAdmin.phone"
                                        ></v-text-field>
                                    </v-col>


                                    <v-col cols="12">
                                        <v-switch
                                            v-model="booking_edit.status"
                                            label="Подтвердить бронь"
                                            color="primary"
                                            hide-details
                                        ></v-switch>
                                    </v-col>


                                    <v-col cols="12" sm="12">
                                        <v-app-bar-title>
                                            Данные номера
                                        </v-app-bar-title>
                                        <div class="my-1 subtitle-1">
                                            (Продлить/уменьшить пребывание)
                                        </div>

                                        <v-text-field
                                            label="Название номера"
                                            required
                                            v-model="booking_edit.room.name"
                                            disabled
                                        ></v-text-field>
                                    </v-col>

                                    <v-col cols="12" sm="12">
                                        <v-text-field
                                            label="Комфортность"
                                            required
                                            v-model="booking_edit.room.comfort_level"
                                            disabled
                                        ></v-text-field>
                                    </v-col>


                                    <!--/Дата начала-->
                                    <v-col cols="12" sm="6">
                                        <v-menu
                                            v-model="menu3"
                                            :close-on-content-click="false"
                                            :nudge-right="40"
                                            transition="scale-transition"
                                            offset-y
                                            min-width="auto"
                                        >
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-text-field
                                                    v-model="booking_edit.date_start"
                                                    label="Дата Заезда"
                                                    prepend-icon="mdi-calendar"
                                                    readonly
                                                    v-bind="attrs"
                                                    v-on="on"
                                                    header-color="red"
                                                    :error-messages="getErrorsEditBookingAdmin.bookingFailStart"
                                                ></v-text-field>
                                            </template>
                                            <v-date-picker
                                                v-model="booking_edit.date_start"
                                                header-color="primary"
                                                color="teal"
                                                locale="ru-RU"
                                                @input="menu3 = false"
                                            ></v-date-picker>
                                        </v-menu>
                                    </v-col>


                                    <!--//Дата окончания-->
                                    <v-col cols="12" sm="6">
                                        <v-menu
                                            v-model="menu4"
                                            :close-on-content-click="false"
                                            :nudge-right="40"
                                            transition="scale-transition"
                                            offset-y
                                            min-width="auto"
                                        >
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-text-field
                                                    v-model="booking_edit.date_end"
                                                    label="Дата выезда"
                                                    prepend-icon="mdi-calendar"
                                                    readonly
                                                    v-bind="attrs"
                                                    v-on="on"
                                                    :error-messages="getErrorsEditBookingAdmin.bookingFail"
                                                ></v-text-field>
                                            </template>
                                            <v-date-picker
                                                v-model="booking_edit.date_end"
                                                header-color="primary"
                                                locale="ru-RU"
                                                color="teal"
                                                @input="menu4 = false"
                                            ></v-date-picker>
                                        </v-menu>
                                    </v-col>
                                </v-row>

                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="blue darken-1" text @click="dialog = false">
                                        Close
                                    </v-btn>

                                    <v-btn color="blue darken-1" @click="updateGuestData()">
                                        <v-icon>mdi-pencil</v-icon> Редактировать
                                    </v-btn>
                                </v-card-actions>
                            </v-container>

                        </v-card-text>
                    </v-card>
                </v-card-text>

            </v-list>

            <v-divider></v-divider>


            <!--<h1 v-if="no_data" class="no-result">По указанным параметрам ничего не найдено ...</h1>-->

        </v-card>
    </v-dialog>

</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
    name: "EditBooking",
    data: function () {
        return {
            dialog: false,
            slider: false,

            menu3: false,
            menu4: false,
            isLoading: false,
            alert: true,
            color: 'teal',
            text: '',
            snackbar: false,
            timeout: 4000,

            booking_edit: {
                id: '',
                date_start:'',
                date_end: '',
                room_id: '',
                room: {},
                guest: {},
                status: Number(false),
            },

        }
    },
    props: {
        booking_data: {
            type: Object,
            default: {},
        }
    },
    computed: {
       ...mapGetters([
           'getErrorsEditBookingAdmin'
       ])
    },
    methods: {
        ...mapActions([
           'editDataForBookingAdmin'
        ]),

        updateData() {

        },

        updateGuestData() {

            let status = this.booking_edit.status ? 1 : 0
            let formData = new FormData
            formData.append('booking_id', this.booking_edit.id)
            formData.append('name', this.booking_edit.guest.name)
            formData.append('surname', this.booking_edit.guest.surname)
            /*formData.append('email', this.booking_edit.guest.email)*/
            formData.append('phone', this.booking_edit.guest.phone)
            formData.append('passport', this.booking_edit.guest.passport)
            formData.append('room_id', this.booking_edit.room.id)
            formData.append('guest_id', this.booking_edit.guest.id)
            formData.append('date_start', this.booking_edit.date_start)
            formData.append('date_end', this.booking_edit.date_end)
            formData.append('status', status)

            formData.append('_method', 'PUT')

            this.editDataForBookingAdmin(formData).then(resp => {
                if(resp.status === 200) {
                    this.dialog = false
                    this.$toasted.show('Данные обновленны!!!',{
                        position: "bottom-left",
                    })
                }
            })

        }
    },
    mounted() {
        this.booking_edit = {...this.booking_data, status: Number(this.booking_data.status)}

    }
}
</script>

<style scoped>
    .v-list-item{
        padding: 0;
    }

</style>
