<template>
    <tr>
        <td>{{book.id}}</td>
        <td>{{book.room.name}}</td>
        <td>{{book.guest.name}} {{book.guest.surname}}</td>
        <td>{{book.date_start}}</td>
        <td>{{book.date_end}}</td>
        <td>{{book.room.price * count_day}} Р</td>
        <td :class="{ notification: !Number(this.book.status)}">
            {{ Number(this.book.status) ? "Обработан" : "Новая Бронь"}}
        </td>
        <td>

            <LookBooking :booking = "book" />

            <EditBooking :booking_data = "book" />

            <v-btn color="red" fab dark small @click="deleteBooking">
                <v-icon>mdi-trash-can</v-icon>
            </v-btn>

        </td>
    </tr>
</template>

<script>
import {mapActions} from "vuex";
import LookBooking from "./show/LookBooking";
import EditBooking from "./edit/EditBooking";

export default {
    name: "TableItem",
    components: {EditBooking, LookBooking},
    data: () => ({
        isActive: true
    }),
    props: {
        book: {
            type: Object,
            default: function () {
                return {}
            },
        },
    },
    computed: {
        count_day(){
            let a = Date.parse(this.book.date_end) - Date.parse(this.book.date_start)
            return a / 86400000
        }
    },
    methods: {
        ...mapActions([
            'deleteBookingFromBd'
        ]),
        deleteBooking() {
            if (confirm('Точно??')) {

                this.deleteBookingFromBd(this.book.id)
            }

        }
    },
    mounted() {

    }
}
</script>

<style scoped>
    .notification{
        text-transform: uppercase;
        font-weight: bold;
        color: darkorange;
    }

</style>
