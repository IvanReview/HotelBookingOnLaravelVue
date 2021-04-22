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
                licenseKey: '====BEGIN LICENSE KEY====\\nRNjpnrMuOuCiyRKqHOVj9VTarCrnQ5z1I4J5PC2qcZVsKprng5uI8ILgvcp6zpHRD/Nrwb2mwHYzM/+kPdc3eGCjk0niPuJTyNWg/vCzew7yFTStdmozI2hRHY2e1o6WjMVDTqEr+4XxJNBNqP7yjgQh3QRSSoxh8exl/4tDeqft7pNGDvZ1N4hViu/ezMLKmLeQQ2Y5Z9gN/dAFr8ZZ4KmYJmNVnALDGaLAfsfMmtxKOqi/c1t0h5nASsQwOzOu3Sds+9DkZkw7KT4FlPkKg/4rd4AJb61LOwrJDB12S2kjuvngUXjh60dWN3l89ppCW1aARZu9oW2pByVO7mMfnw==||U2FsdGVkX1/mS21580EF6IsU+yBS2hhptTfeTiKVWzulGVWyyOalRVnx40BJw4UgoJ3wkeC/tddPMtZv0sCxtqvjV7fTTjTjaThVxjtHvgc=\\nimRcDgUtCZKCSUWpMdkbIhSiFscabmfIZ6Rg/4KaTLDkTXpIJmEe1F3taLdRQZrK91rucgGUZ33g5wsB1SwSvZnmnCF1qiviDiAXiz9UPFhJy8Psy6cNq/FdkSgWCwshJhzyT87uZS+hNiXt1EwlM01+XT8x9BzxM3bxJiW2x+wY1bzl6akBPdeEVlEhaq7dGxEGCUuX3fGD8s+EYM+9oR27z1FliXb6LaRiuSYhBoMShphuI2vC8LuyLvoReK02/dtS7gkEbXZPEIZ+QgtLH2nn+Iev7Vdk0yjsIssap/jEKW9rvfls/kA9XfTevBvW8sx7RZKkaaQR16oLgkBcWQ==\\n====END LICENSE KEY====',
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
        this.getMainTableData()

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
