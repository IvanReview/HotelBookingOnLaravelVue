<template>
    <v-dialog
            transition="dialog-top-transition"
            max-width="600"
            v-model="dialog"
    >

        <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" fab small dark class="ma-2"
                v-bind="attrs"
                v-on="on"
            >
                <v-icon>mdi-pencil</v-icon>
            </v-btn>
        </template>

            <v-card :loading="isLoading">
                <v-toolbar color="primary" dark>
                    Карточка редактирования данных
                </v-toolbar>

                <v-card-text>
                    <v-card class = "my-1">
                        <v-card-title >
                            <span class="headline" style="width: 100%; text-align: center;">
                                Редактирование данных гостя
                            </span>
                        </v-card-title>
                        <v-card-text>
                            <v-container>
                                <v-row>
                                    <v-col cols="12" sm="6">
                                        <v-text-field
                                            label="Имя"
                                            required
                                            v-model="guest_edit.name"
                                            :error-messages="errors.name"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" >
                                        <v-text-field
                                            label="Фамилия"
                                            hint=""
                                            v-model="guest_edit.surname"
                                            :error-messages="errors.surname"
                                        ></v-text-field>
                                    </v-col>

                                    <v-col cols="12">
                                        <v-text-field
                                            label="Паспорт"
                                            required
                                            v-model="guest_edit.passport"
                                            :error-messages="errors.passport"
                                        ></v-text-field>
                                    </v-col>

                                    <v-col cols="12">
                                        <v-text-field
                                            label="Телефон"
                                            required
                                            value="8978159877"
                                            v-model="guest_edit.phone"
                                            :error-messages="errors.phone"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="12">
                                        <v-autocomplete
                                            :items="['Номер №1','Номер №2', 'Номер №3', 'Номер №4', 'Номер №5','Номер №6']"
                                            label="Название номера"
                                            value="Номер №1"
                                            required
                                            v-model="guest_edit.room_name"
                                        ></v-autocomplete>
                                    </v-col>

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
                                                    v-model="guest_edit.dateStart"
                                                    label="Дата Заезда"
                                                    prepend-icon="mdi-calendar"
                                                    readonly
                                                    v-bind="attrs"
                                                    v-on="on"
                                                    header-color="red"
                                                ></v-text-field>
                                            </template>
                                            <v-date-picker
                                                v-model="guest_edit.dateStart"
                                                header-color="primary"
                                                color="teal"
                                                locale="ru-RU"
                                                @input="menu3 = false"
                                            ></v-date-picker>
                                        </v-menu>
                                    </v-col>

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
                                                    v-model="guest_edit.dateEnd"
                                                    label="Дата выезда"
                                                    prepend-icon="mdi-calendar"
                                                    readonly
                                                    v-bind="attrs"
                                                    v-on="on"
                                                ></v-text-field>
                                            </template>
                                            <v-date-picker
                                                v-model="guest_edit.dateEnd"
                                                header-color="primary"
                                                locale="ru-RU"
                                                color="teal"
                                                @input="menu4 = false"
                                            ></v-date-picker>
                                        </v-menu>
                                    </v-col>
                                </v-row>
                            </v-container>
                            <small>*indicates required field</small>
                        </v-card-text>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" text @click="dialog = false">
                                Close
                            </v-btn>

                            <v-btn color="blue darken-1" @click="updateGuestData()">
                                <v-icon>mdi-pencil</v-icon> Редактировать
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-card-text>

                <!--всплывашкка-->
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
                </v-snackbar>
            </v-card>
    </v-dialog>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
    name: "EditGuest",
    data: function () {
        return {
            dialog: false,

            menu3: false,
            menu4: false,
            isLoading: false,
            alert: true,
            color: 'teal',
            text: '',
            snackbar: false,
            timeout: 4000,

            guest_edit: {
                dateStart: new Date().toISOString().substr(0, 10),
                dateEnd: new Date().toISOString().substr(0, 10),
            },

            errors: [],
        }
    },
    props: {
        guest_prop: {},
    },
    computed: {
      ...mapGetters([
          'getGuestEditErrors'
      ])
    },
    methods: {
        ...mapActions([
            'updateGuestDataInBd'
        ]),

        updateGuestData() {
            this.isLoading = 'orange'
            let formData = new FormData
            formData.append('id', this.guest_edit.id)
            formData.append('name', this.guest_edit.name)
            formData.append('surname', this.guest_edit.surname)
            formData.append('passport', this.guest_edit.passport)
            formData.append('phone', this.guest_edit.phone)
            formData.append('_method', "PUT")

            this.updateGuestDataInBd(formData)
                .then(response => {
                    if (response === 200) {
                        this.dialog = false
                        this.isLoading = false
                        this.errors = []
                    }
                    if (response.status === 422) {
                        switch (response.status) {
                            case 422:
                                this.errors = response.data.errors
                                break;
                            default:
                                console.log(error)
                                break;
                        }
                        this.snackbar = true
                        this.color = 'red'
                        this.text = "Заолните правильно поля формы"
                    }
                })
        },

    },
    mounted() {
        //копируем пропсы в новый объект
        this.guest_edit = {...this.guest_edit,...Object.assign({}, this.guest_prop)}
    }
}
</script>

<style scoped>

</style>
