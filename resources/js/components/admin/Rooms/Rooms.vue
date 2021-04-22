<template>
	<div>
        <h1 class=" text-center">Номера</h1>

        <v-card class="mx-auto my-4" outlined>
            <v-list-item three-line>
                <v-list-item-content>
                    <div class="overline mb-4">
                        OVERLINE
                    </div>
                    <v-list-item-title class="headline mb-1">
                        Добавить комнату
                    </v-list-item-title>

                </v-list-item-content>

                <v-card-actions>

                <!--Создать комнату-->
                    <CreateRoom />
                </v-card-actions>
            </v-list-item>
        </v-card>

        <v-col
            class="d-flex"
            cols="12"
            sm="4"
        >
            <v-select
                :items="[5, 8, 10, 25, 50]"
                label="Количество Элементов на стр."
                v-model="itemsOnPage"
                v-on:change="paginateRooms"
            ></v-select>
        </v-col>
		<v-simple-table dark>
			<template v-slot:default>
				<thead>
					<tr>
						<th class="text-left">
							№
						</th>
						<th class="text-left">
							Название
						</th>
						<th class="text-left">
							Тип
						</th>
						<th class="text-left">
							Количество мест
						</th>
						<th class="text-left">
							Цена
						</th>
						<th class="text-left">
							Действие
						</th>
					</tr>
				</thead>

                <!--Тело-->
				<tbody>
					<Room v-for="room in getRoomsAdmin"
                          :key="room.id"
                          :room="room"
                    />
		        </tbody>
	        </template>
	    </v-simple-table>

        <!--Пагинация-->
        <template >
            <div class="pagination_rooms text-center">
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
    import {mapActions,mapGetters} from "vuex";
    import Room from "./Room";
    import CreateRoom from "./CreateRoom";

    export default {
        name: "Rooms",
        components: {CreateRoom, Room},

        data: function () {
            return {
                page: 1,
                last_page: 0,
                itemsOnPage: 5,
            }
        },
        watch: {
            page(){
                this.paginateRooms()
            }

        },
        computed: {
            ...mapGetters([
                'getRoomsAdmin'
            ])

        },
        methods: {
            ...mapActions([
                'fetchRooms'
            ]),

            paginateRooms() {
                this.fetchRooms({number_page: this.page, itemsOnPage: this.itemsOnPage })
                    .then(resp => this.last_page = resp)
            },

            createRoom() {

            },

            openGuestCard() {

            },

            editGuestCard() {

            }


        },
        beforeCreate() {

        },
        mounted() {

            this.fetchRooms({}).then(resp => this.last_page = resp)

        }
    }
</script>

<style>
    .pagination_rooms{
        margin-top: 50px;
    }
</style>
