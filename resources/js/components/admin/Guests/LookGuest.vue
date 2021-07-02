<template>
    <v-dialog
        transition="dialog-bottom-transition"
        max-width="600"
    >
        <template v-slot:activator="{ on, attrs }">
            <v-btn
                color="teal"
                fab
                small
                dark
                class="ma-2"
                @click="openGuestCard"
                v-bind="attrs"
                v-on="on"
            >
                <v-icon>mdi-television</v-icon>
            </v-btn>
        </template>

        <template v-slot:default="dialog">
            <v-card>
                <v-toolbar color="teal" dark>
                    <v-toolbar-title>Карточка просмотра данных гостя</v-toolbar-title>
                </v-toolbar>


                <v-card-text>
                    <v-card max-width="375" class="mx-auto my-5">
                        <v-img
                            src="https://cdn.vuetifyjs.com/images/lists/ali.png"
                            height="200px"
                            dark
                        >
                            <v-row class="fill-height">


                                <v-spacer></v-spacer>

                                <v-card-title class="white--text pl-3 pt-12 mt-7 text-center" style="width: 100%">
                                    <div class="display-1 pl-3 pt-12 mt-7 text-center" style="width: 100%">
                                        {{guest_prop.name}} {{guest_prop.surname}}
                                    </div>
                                </v-card-title>
                            </v-row>
                        </v-img>

                        <v-list two-line>
                            <v-list-item>
                                <v-list-item-icon>
                                    <v-icon color="teal">
                                        mdi-phone
                                    </v-icon>
                                </v-list-item-icon>

                                <v-list-item-content>
                                    <v-list-item-title>{{guest_prop.phone}}</v-list-item-title>
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
                                    <v-list-item-title>{{guest_prop.passport | passportFilter}}</v-list-item-title>
                                    <v-list-item-subtitle>Паспорт</v-list-item-subtitle>
                                </v-list-item-content>
                            </v-list-item>

                            <v-list-item>
                                <v-list-item-icon>
                                    <v-icon color="teal">
                                        mdi-home-floor-l
                                    </v-icon>
                                </v-list-item-icon>

                                <v-list-item-content>
                                    <v-list-item-title>Номер №1</v-list-item-title>
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
                                    <v-list-item-title>Комфорт</v-list-item-title>
                                    <v-list-item-subtitle>Комфортность номера</v-list-item-subtitle>
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
                                    <v-list-item-title>2020-20-80</v-list-item-title>
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
                                <v-list-item-title>2020-08-20</v-list-item-title>
                                <v-list-item-subtitle>Дата выезда</v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
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
    name: "LookGuest",
    props: {
        guest_prop: {},
    },
    methods: {
        openGuestCard() {

        },
    }
}
</script>

<style scoped>

</style>
