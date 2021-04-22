<template>
    <tr>
        <td>{{index+1}}</td>
        <td>{{guest_prop.name}}</td>
        <td>{{guest_prop.surname}}</td>
        <td>{{guest_prop.phone}}</td>
        <td>{{guest_prop.passport | passportFilter }}</td>
        <td>2021-08-10</td>
        <td>2020-02-08</td>
        <td>
            <!-- Просмотр -->
            <LookGuest  :guest_prop="guest_prop"/>

            <!-- Редактирование -->
            <EditGuest :guest_prop="guest_prop"/>

            <!--Удаление-->
            <v-btn color="red" fab dark small @click="deleteGuest">
                <v-icon>mdi-trash-can</v-icon>
            </v-btn>
        </td>
    </tr>

</template>

<script>
import {mapActions} from "vuex";
import LookGuest from "./LookGuest";
import EditGuest from "./EditGuest";

export default {
    name: "Guest",
    components: {EditGuest, LookGuest},
    props: {
        guest_prop: {},
        index: 0,
    },
    data: function () {
        return {

        }
    },
    methods: {
        ...mapActions([
            'updateGuestDataInBd',
            'deleteGuestFromBd'
        ]),

        editGuestCard() {

        },

        deleteGuest() {
            if (confirm('Точно??')) {
                this.deleteGuestFromBd(this.guest_prop.id)
            }
        }

    },
    beforeCreate() {

    },
    mounted() {

    }
}
</script>

<style scoped>

</style>
