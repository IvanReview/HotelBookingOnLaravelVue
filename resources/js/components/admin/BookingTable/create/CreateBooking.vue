<template>

    <!--создание брони-->
    <v-row justify="center">
        <v-dialog
            v-model="dialog"
            fullscreen
            hide-overlay
            transition="dialog-bottom-transition"
        >
            <template v-slot:activator="{ on, attrs }">
                <v-btn color="teal" dark v-bind="attrs" v-on="on">
                    <v-icon>mdi-plus-outline</v-icon> Создать бронь
                </v-btn>
            </template>

            <v-card>
                <v-toolbar
                    dark
                    color="primary"
                >
                    <v-btn icon dark @click="dialog = false">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>

                    <v-toolbar-title>Создать бронь</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                        <v-btn dark text @click="updateData">
                            Обновить
                        </v-btn>
                    </v-toolbar-items>
                </v-toolbar>

                <v-list three-line subheader>

                    <!--Форма поиска брони-->
                    <SearchFormForAdmin @toggleSearchData="ToggleData"
                                        @searchData = "transitionBookingData"
                    />
                </v-list>

                <v-divider></v-divider>

                <v-container v-if="Object.keys(getRoomsAdminAfterSearch).length">
                    <v-toolbar color="deep-purple darken-1" dark>
                        <v-toolbar-title>Результаты поиска номеров</v-toolbar-title>
                    </v-toolbar>
                    <v-list>
                        <v-list-group
                            v-for="(rooms, name, index) in getRoomsAdminAfterSearch"
                            :key="index"
                            no-action
                        >
                            <template v-slot:activator>

                                <v-list-item-content>
                                    <v-list-item-title>
                                        {{index+1}}) {{name}}
                                    </v-list-item-title>
                                </v-list-item-content>
                                <v-icon>mdi-warehouse</v-icon>
                            </template>

                            <v-list-item
                                v-for="(room, index) in rooms"
                                :key="index"
                            >
                                <v-list-item-content>
                                    <v-list-item-title >
                                        {{room.name}} - Цена за ночь {{room.price}} P

                                        <!--Форма ввода данных гостя-->
                                        <FormGuestDataForBooking :room = "room"
                                                                 :bookingData = "booking_data"
                                                                 @closeDialog = "closeDialog"
                                        />

                                    </v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list-group>
                    </v-list>
                </v-container>

                <h1 v-if="no_data" class="no-result">По указанным параметрам ничего не найдено ...</h1>

            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
import SearchFormForAdmin from "../SearchFormForAdmin";
import {mapActions, mapGetters} from "vuex";
import FormGuestDataForBooking from "./FormGuestDataForBooking";

export default {
    name: "CreateBooking",
    components: {FormGuestDataForBooking, SearchFormForAdmin},

    data: function () {
        return {
            dialog: false,
            dialog1: false,
            notifications: false,
            sound: true,
            widgets: false,
            no_data: false,

            booking_data: {},
        }

    },
    computed: {
        ...mapGetters([
            'getRoomsAdminAfterSearch'
        ])
    },
    methods: {
        ...mapActions([
            'searchRoomForBookingInAdmin'
        ]),
        transitionBookingData(data) {
            this.booking_data = data
        },
        searchRoom() {

        },
        closeDialog() {
          console.log(555)
          this.dialog = false
        },

        ToggleData(toggle) {
            this.no_data = toggle
        },
        updateData() {
            this.$store.commit('set_searching_rooms_admin', {})
            this.no_data = false
        }
    },
    updated() {

    }
}
</script>

<style scoped>
    .no-result{
        width: 100%;
        text-align: center;
        margin-top: 40px;
    }

</style>
