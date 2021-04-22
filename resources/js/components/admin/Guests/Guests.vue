<template>
    <div>
        <h1 class="text-center">Гости</h1>

        <v-col
            class="d-flex"
            cols="12"
            sm="4"
        >
            <v-select
                :items="[ 8, 10, 25, 50]"
                label="Количество Элементов на стр."
                v-model="itemsOnPage"
                v-on:change="paginateGuests"
            ></v-select>
        </v-col>
        <v-simple-table dark>
            <template v-slot:default>
                <thead>
                <tr>
                    <th class="text-left">
                        ID
                    </th>
                    <th class="text-left">
                        Имя
                    </th>
                    <th class="text-left">
                        Фимилия
                    </th>
                    <th class="text-left">
                        Телефон
                    </th>
                    <th>
                        Паспот
                    </th>
                    <th class="text-left">
                        Дата заезда
                    </th>
                    <th class="text-left">
                        Дата выезда
                    </th>
                    <th class="text-left">
                        Действие
                    </th>
                </tr>
                </thead>
                <tbody>
                    <Guest v-for="(guest, index) in getGuests"
                           :key="guest.id"
                           :guest_prop = guest
                           :index="index"
                    />
                </tbody>
            </template>
        </v-simple-table>

        <!--Пагинация-->
        <template >
            <div class="pagination-guests text-center">
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
    import Guest from "./Guest";
    import {mapActions, mapGetters} from "vuex";

    export default {
        name: "Guests",
        components: {Guest},
        data: function () {
            return {
                page: 1,
                last_page: 0,
                itemsOnPage: 8,

                items: [1, 2, 3, 4],
			   	guestAmount: 1,
			   	dateStart: new Date().toISOString().substr(0, 10),
			   	dateEnd: new Date().toISOString().substr(0, 10),
			   	menu3: false,
			    menu4: false,
            }
        },
        watch: {
            page() {
                this.paginateGuests()
            }
        },
        computed: {
          ...mapGetters([
              'getGuests'
          ])
        },
        methods: {
            ...mapActions([
                'fetchGuests'
            ]),

            openGuestCard() {

            },

            editGuestCard() {

            },

            paginateGuests() {
                this.fetchGuests({number_page: this.page, itemsOnPage: this.itemsOnPage})
                    .then(resp => this.last_page = resp)

            }


        },
        beforeCreate() {

        },
        mounted() {
            this.fetchGuests({}).then(resp => this.last_page = resp)

        }
    }
</script>

<style>
    .pagination-guests{
        margin-top: 50px;
    }
</style>
