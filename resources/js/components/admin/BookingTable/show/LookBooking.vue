<template>
    <v-dialog transition="dialog-bottom-transition" max-width="600">
        <template v-slot:activator="{ on, attrs }">
            <v-btn color="teal" fab small dark  v-bind="attrs" v-on="on">
                <v-icon>mdi-television</v-icon>
            </v-btn>
        </template>

        <template v-slot:default="dialog">
            <v-card>
                <v-toolbar color="teal" dark>
                    <v-toolbar-title>Данные брони</v-toolbar-title>
                </v-toolbar>

                <v-card-text>
                    <v-card max-width="375" class="mx-auto my-5">

                        <v-list two-line>
                            <v-list-item>
                                <v-list-item-icon>
                                    <v-icon color="teal">
                                        mdi-account-multiple
                                    </v-icon>
                                </v-list-item-icon>

                                <v-list-item-content>
                                    <v-list-item-title>{{booking.guest.name}} {{booking.guest.surname}}</v-list-item-title>
                                    <v-list-item-subtitle>Имя Фамилия</v-list-item-subtitle>
                                </v-list-item-content>
                            </v-list-item>
                            <v-divider inset></v-divider>
                            <v-list-item>
                                <v-list-item-icon>
                                    <v-icon color="teal">
                                        mdi-phone
                                    </v-icon>
                                </v-list-item-icon>

                                <v-list-item-content>
                                    <v-list-item-title>{{booking.guest.phone}}</v-list-item-title>
                                    <v-list-item-subtitle>Телефон</v-list-item-subtitle>
                                </v-list-item-content>

                                <v-list-item-icon>
                                    <v-icon>mdi-message-text</v-icon>
                                </v-list-item-icon>
                            </v-list-item>

                            <v-divider inset></v-divider>

                            <v-list-item>
                                <v-list-item-icon>
                                    <v-icon color="teal">
                                        mdi-account-box-multiple
                                    </v-icon>
                                </v-list-item-icon>

                                <v-list-item-content>
                                    <v-list-item-title>{{booking.guest.passport}}</v-list-item-title>
                                    <v-list-item-subtitle>Паспорт</v-list-item-subtitle>
                                </v-list-item-content>
                            </v-list-item>

                            <v-divider inset></v-divider>

                            <v-list-item>
                                <v-list-item-icon>
                                    <v-icon color="teal">
                                        mdi-home-floor-l
                                    </v-icon>
                                </v-list-item-icon>

                                <v-list-item-content>
                                    <v-list-item-title>{{booking.room.name}}</v-list-item-title>
                                    <v-list-item-subtitle>Название номера</v-list-item-subtitle>
                                </v-list-item-content>
                            </v-list-item>

                            <v-divider inset></v-divider>

                            <v-list-item>
                                <v-list-item-icon>
                                    <v-icon color="teal">
                                        mdi-home
                                    </v-icon>
                                </v-list-item-icon>

                                <v-list-item-content>
                                    <v-list-item-title>{{booking.room.comfort_level}}</v-list-item-title>
                                    <v-list-item-subtitle>Комфортность номера</v-list-item-subtitle>
                                </v-list-item-content>
                            </v-list-item>

                            <v-divider inset></v-divider>

                            <v-list-item>
                                <v-list-item-icon>
                                    <v-icon color="teal">
                                        mdi-cash
                                    </v-icon>
                                </v-list-item-icon>

                                <v-list-item-content>
                                    <v-list-item-title>{{booking.room.price}} P</v-list-item-title>
                                    <v-list-item-subtitle>Цена за ночь</v-list-item-subtitle>
                                </v-list-item-content>
                            </v-list-item>


                            <v-divider inset></v-divider>

                            <v-list-item>
                                <v-list-item-icon>
                                    <v-icon color="teal">
                                        mdi-arrow-right
                                    </v-icon>
                                </v-list-item-icon>

                                <v-list-item-content>
                                    <v-list-item-title>{{booking.date_start}}</v-list-item-title>
                                    <v-list-item-subtitle>Дата заезда</v-list-item-subtitle>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list>

                        <v-list-item>
                            <v-list-item-icon>
                                <v-icon color="teal">
                                    mdi-arrow-left
                                </v-icon>
                            </v-list-item-icon>

                            <v-list-item-content>
                                <v-list-item-title>{{booking.date_end}}</v-list-item-title>
                                <v-list-item-subtitle>Дата выезда</v-list-item-subtitle>
                            </v-list-item-content>

                        </v-list-item>

                        <v-divider inset></v-divider>

                        <v-list-item>
                            <v-list-item-icon>
                                <v-icon color="teal">
                                    mdi-currency-usd
                                </v-icon>
                            </v-list-item-icon>

                            <v-list-item-content>
                                <v-list-item-title>{{count_day * booking.room.price}} Р</v-list-item-title>
                                <v-list-item-subtitle>Общая цена</v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                        <v-divider inset></v-divider>
                    </v-card>
                </v-card-text>

                <v-card-actions class="justify-end">
                    <v-btn text @click="dialog.value = false">Close</v-btn>
                </v-card-actions>
            </v-card>
        </template>
    </v-dialog>
</template>

<script>
export default {
    name: "LookBooking",
    data: function () {
        return {
            settings: [],
        }
    },
    computed: {
        count_day(){
            let a = Date.parse(this.booking.date_end) - Date.parse(this.booking.date_start)
            return a/86400000
        }
    },
    props: {
        booking: {
            type: Object,
            default: function () {
                return {}
            },
        },
    },
}
</script>

<style scoped>


</style>
