<template>
    <div>
        <h1 class=" text-center">Главная таблица с данными</h1>

        <v-card class="mx-auto my-4" outlined>
            <v-list-item three-line>
                <v-list-item-content>
                    <div class="overline mb-4">
                        OVERLINE
                    </div>
                    <v-list-item-title class="headline mb-1">
                        Добавить бронь
                    </v-list-item-title>

                </v-list-item-content>

                <v-card-actions>
                    <!--всплывашка-->
                    <CreateBooking/>
                </v-card-actions>
            </v-list-item>
        </v-card>

        <v-divider></v-divider>

        <br>
        <v-simple-table dark>
            <template v-slot:default>
                <thead>
                <tr>
                    <th class="text-left">
                        №
                    </th>
                    <th class="text-left">
                        Название Номера
                    </th>
                    <th class="text-left">
                        Имя Клиента
                    </th>
                    <th class="text-left">
                        Дата Заселения
                    </th>
                    <th class="text-left">
                        Дата Выезда
                    </th>
                    <th class="text-left">
                         Деньги
                    </th>
                    <th class="text-left">
                        Статус
                    </th>
                    <th class="text-left">
                        Действие
                    </th>
                </tr>
                </thead>

                <!--Тело-->
                <tbody>
                    <TableItem
                        v-for="item in getBookingData"
                        :key="item.id"
                        :book=" item"
                    />
                </tbody>
            </template>
        </v-simple-table>

        <!--Пагинация-->
        <!--<template >
            <div class="pagination_rooms text-center">
                <v-pagination
                    v-model="page"
                    :length="last_page"
                    color="teal"
                    :total-visible="7"
                ></v-pagination>
            </div>
        </template>-->
    </div>

</template>

<script>
import TableItem from "./TableItem";
import {mapActions, mapGetters} from "vuex";
import CreateBooking from "./create/CreateBooking";
export default {
    name: "BookingTable",
    components: {CreateBooking, TableItem},
    data: function () {
        return {
            dialog: false,
            notifications: false,
            sound: true,
            widgets: false,

            page: 1,
            last_page: 0,
            itemsOnPage: 5,
        }
    },
    computed: {
        ...mapGetters([
            'getBookingData'
        ])
    },
    methods: {
        ...mapActions([
            'getMainTableData'
        ]),

        getData() {

        },


    },

    mounted () {

        this.getMainTableData()
    },

    }
</script>

<style scoped>

</style>
