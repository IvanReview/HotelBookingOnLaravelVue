<template>
<div>
  <div class="toolbox">
    <v-btn color="teal" @click="updateFirstRow">Update first row</v-btn>
    <v-btn color="red" @click="changeZoomLevel">Change zoom level</v-btn>
  </div>
  <div class="gstc-wrapper" ref="gstc"></div>
</div>
</template>

<script>
import GSTC from 'gantt-schedule-timeline-calendar';
import { Plugin as TimelinePointer } from 'gantt-schedule-timeline-calendar/dist/plugins/timeline-pointer.esm.min.js';
import { Plugin as Selection } from 'gantt-schedule-timeline-calendar/dist/plugins/selection.esm.min.js';
import { Plugin as ItemResizing } from 'gantt-schedule-timeline-calendar/dist/plugins/item-resizing.esm.min.js';
import { Plugin as ItemMovement } from 'gantt-schedule-timeline-calendar/dist/plugins/item-movement.esm.min.js';
import 'gantt-schedule-timeline-calendar/dist/style.css';
import {mapActions, mapGetters} from "vuex";

let gstc, state;

// helper functions





// main component

export default {
    name: 'GSTC',
    data: function () {
        return{
            rooms: [],
            config: {}
        }
    },
    mounted() {

        /**
         * @type { import("gantt-schedule-timeline-calendar").Config }
         */

        setTimeout(() => {
            const config = {
                licenseKey: '====BEGIN LICENSE KEY====\nbkeOTB+PCR4V4ggNu8RDjYoYms8s/efAL8EhzNT09JhV/bQmnC3TtM1pUYU/0AzX+Cmko74QA6Ns0z1YrsqdeD4YANFFcGx19Mft2eZGJuMArAzQen+d8BNmyaaOiV9EVyG5d4JdjQg9X2R3CF2aAIHZMHZPL0QJkvaoOON8k9kYqlzE8VrVs4jFHRDVzJxBzbhpiAyDjbjI10Cg8ruiECZ8Y9WrYIxwUy5SQJVHdeFXvvkZoFSV3TEBN8kbCtKFsSBsdHrvL76eHAyCjiaNvTEbJO0HXBmaoAiRyGLSp2R+Ph4RFC+wykJwppCW3I31ngY/IVbY1hlNLaSMYYXgFA==||U2FsdGVkX1+qPJ8QxuVG7+4E02YkY2+3cqWpVphD2EKt4Dw73RIiuGZxQCPsp9xPoqxBUjAsVrXuQYX8OsYPdAt4mt8QVrMwP5shxTMq36o=\nib1IfCHGyJnidw0G4kqnfBYXUbj8wx0W4JvDzfsyhYHVa7Rb0Y2Bj+k953HWdL6Wxhj3gdswMXvIy7XPgDpmKudyrTg1+iP4OeFXMVwt60vMhWt65E3aLwjNyqsgiEO0S9Ap9Tl1rWHsNfj6qGTgvLlOoMS1zMZ8ueiwZreuGn7yprbPu+7h49OmUyajS0Vyh2WuA0am69xr82MEcntLcd7M/EyqBcd5eSxxhLXIVHYPkbaIG8+RS4RV6YIpIqvE41O8jTHU19xrBlie09sXWYzxpB15c0OqlVBv6l8HkCDHRu6LQbCT1gUI4hQ+55+7s1PhiVwLRt7f+UTrhNuhZA==\n====END LICENSE KEY====',
                plugins: [TimelinePointer(), Selection(), ItemResizing(), ItemMovement()],
                list: {
                    columns: {
                        data: {
                            [GSTC.api.GSTCID('id')]: {
                                id: GSTC.api.GSTCID('id'),
                                width: 60,
                                data: ({row}) => GSTC.api.sourceID(row.id),
                                header: {
                                    content: 'ID'
                                }
                            },
                            [GSTC.api.GSTCID('label')]: {
                                id: GSTC.api.GSTCID('label'),
                                width: 200,
                                data: 'label',
                                header: {
                                    content: 'Номера'
                                }
                            }
                        }
                    },
                    rows: this.generateRows()
                },
                chart: {
                    items: this.generateItems()
                }
            };

            state = GSTC.api.stateFromConfig(config);

            gstc = GSTC({
                element: this.$refs.gstc,
                state,
            });
        },2000)



    },

    beforeUnmount() {
        if (gstc) gstc.destroy();
    },

    methods: {
        ...mapActions([
            'fetchAllRooms',
            'getMainTableData'
        ]),


        updateFirstRow() {
            state.update(`config.list.rows.${GSTC.api.GSTCID('0')}`, row => {
                row.label = 'Changed dynamically';
                return row;
            });
        },

        changeZoomLevel() {
            state.update('config.chart.time.zoom', 21);
        },

        generateRows() {
            const rooms = this.getAllRoomsAdmin

            const rows = {};
            for (let i = 0; i < rooms.length; i++) {
                const id = GSTC.api.GSTCID(rooms[i].id.toString());
                rows[id] = {
                    id,
                    label: rooms[i].name
                }
            }
            return rows;
        },

        generateItems() {
            const booking = this.getBookingData
            const items = {};

            for (let i = 0; i < this.getBookingData.length; i++) {
                const id = GSTC.api.GSTCID(i.toString());
                const rowId = GSTC.api.GSTCID(booking[i].room_id).toString();

                items[id] = {
                    id,
                    label: booking[i].guest.name + " " + booking[i].guest.surname,
                    rowId,
                    time: {
                        start: new Date(booking[i].date_start).getTime(),
                        end: new Date(booking[i].date_end).getTime()
                    }
                }
            }
            return items;
        }

    },

    computed: {
        ...mapGetters([
            'getAllRoomsAdmin',
            'getBookingData'
        ])
    },
    created() {
        this.fetchAllRooms()
        this.getMainTableData({})

    }
};
</script>
<style scoped>
.gstc-component {
  margin: 0;
  padding: 0;
}
.toolbox{
  padding: 10px;
}
</style>
