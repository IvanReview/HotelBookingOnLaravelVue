<template>
    <div class="main-table">
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

        <v-row>
            <v-col
                class="d-flex"
                cols="6"
                sm="4"
            >
                <v-select
                    :items="[8, 10, 25, 50]"
                    label="Количество Элементов на стр."
                    v-model="itemsOnPage"
                    v-on:change="getBooking"
                ></v-select>
            </v-col>

            <v-col
                class="d-flex"
                cols="6"
                sm="4"
            >
                <v-select
                    :items="items"
                    label="Сортировка"
                    v-model="sortParams"
                    v-on:change="getBooking"
                    item-value="id"
                    item-text="name"
                ></v-select>
            </v-col>
        </v-row>

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
                    <td class="text-center py-5"
                        style="width: 100%"
                        v-if="!getBookingData.length"
                        colspan="2"
                    >
                        Нет забронированных номеров
                    </td>
                    <TableItem
                        v-else
                        v-for="item in getBookingData"
                        :key="item.id"
                        :book=" item"
                    />
                </tbody>
            </template>
        </v-simple-table>

        <!--Пагинация-->
        <template >
            <div class="pagination text-center">
                <v-pagination
                    v-model="page"
                    :length="last_page"
                    color="teal"
                    :total-visible="7"
                ></v-pagination>
            </div>
        </template>
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

            items: [
                {id:0 ,name: 'По дате создания(по убыв.)'}, {id:1, name: 'По дате создания(по возр.)'},
                {id:2, name: 'По статусу(Обраб)'}, {id:3, name: 'По статусу(Не Обраб)'}
            ],
            page: 1,
            last_page: 0,
            itemsOnPage: 8,
            sortParams: 0,
        }
    },
    computed: {
        ...mapGetters([
            'getBookingData'
        ])
    },
    watch: {
        page() {
            this.getBooking()
        }
    },
    methods: {
        ...mapActions([
            'getMainTableData'
        ]),

        getBooking() {
            this.getMainTableData({ number_page: this.page,
                    itemsOnPage: this.itemsOnPage,
                    sortParams: this.sortParams })
                .then(resp => this.last_page = resp)
        },


    },

    mounted () {

        this.getMainTableData({}).then(resp => this.last_page = resp)
    },

    }
</script>

<style scoped>
    .main-table{
        display: flex;
        flex-direction: column;
        height: 100%;
    }

</style>
