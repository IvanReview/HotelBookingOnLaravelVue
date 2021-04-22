<template>
    <div class="search-form">
        <Loader v-if="loading" />

        <form v-else  @submit.prevent = "searchRoom">
            <v-container >
                <header>Найти нужные номера</header>
                <v-row>
                    <v-col cols="12" sm="6">
                        <v-menu
                            v-model="menu1"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            transition="scale-transition"
                            offset-y
                            min-width="auto"
                        >
                            <template v-slot:activator="{ on, attrs }">
                                <v-text-field
                                    v-model="dateStart"
                                    label="Дата Заезда"
                                    prepend-icon="mdi-calendar"
                                    readonly
                                    v-bind="attrs"
                                    v-on="on"
                                ></v-text-field>
                            </template>
                            <v-date-picker
                                v-model="dateStart"
                                header-color="purple darken-4"
                                locale="ru-RU"
                                @input="menu1 = false"
                            ></v-date-picker>
                        </v-menu>
                    </v-col>

                    <v-spacer></v-spacer>

                    <v-col cols="12" sm="6">
                        <v-menu
                            v-model="menu2"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            transition="scale-transition"
                            offset-y
                            min-width="auto"
                        >
                            <template v-slot:activator="{ on, attrs }">
                                <v-text-field
                                    v-model="dateEnd"
                                    label="Дата выезда"
                                    prepend-icon="mdi-calendar"
                                    readonly
                                    v-bind="attrs"
                                    v-on="on"
                                ></v-text-field>
                            </template>
                            <v-date-picker
                                v-model="dateEnd"
                                locale="ru-RU"
                                header-color="purple darken-3"
                                @input="menu2 = false"
                            ></v-date-picker>
                        </v-menu>
                    </v-col>

                    <v-spacer></v-spacer>

                    <v-col cols="12" sm="6">
                        <v-select
                            v-model="guestAmount"
                            :items="items"
                            label="Количество человек"
                            prepend-icon="mdi-account"
                        ></v-select>
                    </v-col>

                    <v-col cols="12" sm="6">
                        <v-select
                            v-model="comfortLevel"
                            :items="['Все категории','Эконом', 'Стандарт', 'Апартамент', 'Люкс', 'Студия']"
                            label="Комфортность Номера"
                            prepend-icon="mdi-account"
                        ></v-select>
                    </v-col>

                    <v-col cols="12" sm="6">
                        <v-btn
                            :loading="load"
                            :disabled="load"
                            color="primary"
                            class="mt-4 white--text"
                            type="submit"
                        >
                            Найти свободне номера
                            <v-icon right dark> mdi-send</v-icon>
                        </v-btn>
                    </v-col>

                </v-row>
            </v-container>
        </form>
    </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import Header from "../../mainPages/common/Header";
import Loader from "../../loader/Loader";


export default {
    name: "SearchFormForAdmin",
    components: {Loader, Header},
    data: function () {
        return {
            items: [1, 2, 3, 4],


            guestAmount: 1,
            dateStart: '',
            dateEnd: '',
            comfortLevel: 'Все категории',

            menu1: false,
            menu2: false,

            load: false,
            loading: false,
        }

    },
    methods: {
        ...mapActions([
            'searchRoomForBookingInAdmin'
        ]),

        searchRoom(){
            this.loading = true

            let data = {
                    dateStart: this.dateStart,
                    dateEnd: this.dateEnd,
                    guestAmount: this.guestAmount,
                    comfortLevel: this.comfortLevel
            }

            this.searchRoomForBookingInAdmin(data).then(resp => {
                this.loading = false


                if (Array.isArray(resp) && !resp.length) {
                    //если ничего не найдено
                    this.$emit('toggleSearchData', true)
                }
                else {
                    //Если что то найдено
                    this.$emit('toggleSearchData', false)
                    this.$emit('searchData', data)
                }
            })
        }
    },
    computed: {
        ...mapGetters([
        ]),

        //установить начальные значения
        dateStartComp() {
            let date = new Date()
            return new Date().toISOString().substr(0, 10)
        },

        dateEndComp() {
            let current = new Date()
            return new Date(current.getTime() + 86400000).toISOString().substr(0, 10)
        },
    },
    watch: {
        //переключать дату выезда, чтобы она всега была на день больше даты заезда
        dateEnd(val) {
            if (val < this.dateStart) {
                let temp = new Date(this.dateStart)
                this.dateEnd = new Date(temp.getTime() + 86400000).toISOString().substr(0, 10)
            }
        },

        dateStart(val) {
            if (val > this.dateEnd) {
                let temp = new Date(this.dateStart)
                this.dateEnd = new Date(temp.getTime() + 86400000).toISOString().substr(0, 10)
            }
        },
    },

    mounted() {
        this.dateStart = this.dateStartComp
        this.dateEnd = this.dateEndComp
    }
}
</script>

<style scoped>
.search-form{
    margin-top: 20px;
}

</style>
