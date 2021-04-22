<template>
    <div>

        <SearchForm @toggleLoader="show = !show" />

        <v-container>
            <h1 class="main-title">Наши номера</h1>

            <Loader v-if="show"/>

            <h3 class="no-room" v-else-if="!Object.keys(getRoomsUser).length">Выберите даты и количество гостей!</h3>

            <v-row v-else>
                <RoomsItem
                    v-for="room in getRoomsUser"
                    :key = "room[0].id"
                    :room = room[0]
                />
            </v-row>

        </v-container>
    </div>
</template>

<script>
import RoomsItem from "./RoomsItem";
import {mapActions, mapGetters} from "vuex";
import FormBooking from "./FormBooking";
import SearchForm from "./SearchForm";
import Loader from "../loader/Loader";


export default {
    name: "MainPage",
    components: {Loader, SearchForm, FormBooking, RoomsItem},
    data: () => ({
        show: false,
        rooms: []
    }),
    computed: {
        ...mapGetters([
            'getRoomsUser'
        ])
    },
    methods: {
        ...mapActions([
            'searchRoomInBd'
        ]),


        fetchRooms() {
            this.searchRoomInBd({})
        }
    },
    mounted() {
        /*this.fetchRooms()*/

    }

}
</script>

<style lang="scss">
    .main-title{
        text-align: center;
    }
    .no-room{
        width: 100%;
        margin: 40px;
        text-align: center;
        font-size: 40px;
        color: #673ab7;
    }


</style>
