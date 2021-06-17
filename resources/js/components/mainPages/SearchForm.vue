<template>
    <div class="search-form">
        <form  @submit.prevent = "searchRoom">
            <v-container >
                <v-row>
                    <v-col cols="12" sm="3">
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

                    <v-col cols="12" sm="3">
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

                    <v-col cols="12" sm="3">
                        <v-select
                            v-model="guestAmount"
                            :items="items"
                            label="Количество человек"
                            prepend-icon="mdi-account"
                        ></v-select>
                    </v-col>

                    <v-col cols="12" sm="3">
                        <v-btn
                            :loading="loading"
                            :disabled="loading"
                            color="purple"
                            class="mt-4 white--text"
                            type="submit"
                        >
                            Найти свободне номера
                             <v-icon right dark> mdi-send</v-icon>
                        </v-btn>
                    </v-col>
                    <v-col>
                        <v-btn icon fab color="green" @click="searchRoomInBd({})">
                            <v-icon>mdi-cached</v-icon>
                        </v-btn>
                    </v-col>
                </v-row>
            </v-container>
        </form>
    </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";


export default {
    name: "SearchForm",
    data: function () {
        return {
            items: [1, 2, 3, 4],

            guestAmount: 1,
            dateStart: '',
            dateEnd: '',

            menu1: false,
            menu2: false,

            loader: null,
            loading: false,
        }

    },
    methods: {
        ...mapActions([
            'searchRoomInBd'
        ]),

        searchRoom(){
            this.$emit('toggleLoader')
            let data = {dateStart: this.dateStart, dateEnd: this.dateEnd, guestAmount: this.guestAmount}

            this.searchRoomInBd(data).then(resp => {
                this.$emit('toggleLoader' )

                window.localStorage.setItem('bookingData', JSON.stringify(data))
            })

        }
    },
    computed: {
        ...mapGetters([

        ]),

        //установить начальные значения
        dateStartComp() {
            let date = new Date()
            /*date.getTime() - (date.getTimezoneOffset() * 60000)*/
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
            if (val <= this.dateStart) {
                let temp = new Date(this.dateStart)
                this.dateEnd = new Date(temp.getTime() + 86400000).toISOString().substr(0, 10)
            }
        },

        dateStart(val) {
            if (val >= this.dateEnd) {
                let temp = new Date(this.dateStart)
                this.dateEnd = new Date(temp.getTime() + 86400000).toISOString().substr(0, 10)
            }
        },

        loader () {
            const l = this.loader
            this[l] = !this[l]
            setTimeout(() => (this[l] = false), 3000)
            this.loader = null
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
