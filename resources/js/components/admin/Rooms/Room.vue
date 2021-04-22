<template>
    <tr>
        <td>{{room.id}}</td>
        <td>{{room.name}}</td>
        <td>{{room.comfort_level}}</td>
        <td>{{room.amount_guests}}</td>
        <td>{{room.price}} Р</td>
        <td>
            <!-- Просмотр -->
            <LookRoom :room = "room" />

            <!-- Редактирование -->
            <EditRoom :room = "room" />

            <!--Удаление-->
            <v-btn color="red" fab dark small @click="deleteRoom">
                <v-icon>mdi-trash-can</v-icon>
            </v-btn>

        </td>
    </tr>

</template>

<script>
import {mapActions, mapGetters} from "vuex";
import LookRoom from "./LookRoom";
import EditRoom from "./EditRoom";

export default {
    name: "Room",
    components: {EditRoom, LookRoom},
    props: {
        room: {},
    },
    data: function ()  {
        return {
            errors: [],
        }
    },
    computed: {
        ...mapGetters([
            'getRoomEditErrors'
        ])
    },
    methods: {
        ...mapActions([
            'updateDataInBd',
            'deleteRoomFromBd'
        ]),

        deleteRoom(){
            if (confirm('Точно??')) {
                this.deleteRoomFromBd(this.room.id)
            }
        }

    },

    mounted() {
        this.room_data = Object.assign({}, this.room)
    }
}
</script>

<style scoped>

</style>
