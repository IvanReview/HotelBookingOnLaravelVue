<template>
    <v-col cols="12" sm="6">
        <v-card
            :loading="loading"
            class="mx-auto my-12"
            max-width="374"
        >
            <template slot="progress">
                <v-progress-linear
                    color="deep-purple"
                    height="10"
                    indeterminate
                ></v-progress-linear>
            </template>

            <v-img height="250" :src="room.image ? `/storage/${room.image}` : `/storage/no_image.jpg`"></v-img>

            <v-card-title>Номер - {{room.comfort_level}}</v-card-title>

            <v-card-text>
                <v-row
                    align="center"
                    class="mx-0"
                >
                    <v-rating
                        :value="4.5"
                        color="amber"
                        dense
                        half-increments
                        readonly
                        size="14"
                    ></v-rating>

                    <div class="grey--text ml-4">
                        4.5 (413)
                    </div>
                </v-row>

                <div class="my-4 subtitle-1">
                    Стоимость одной ночи - {{ room.price }} ₽
                </div>

                <div>Номер повышенной комфортности с рабочей зоной.</div>
            </v-card-text>

            <v-divider class="mx-4"></v-divider>

            <v-card-title>Tonight's availability</v-card-title>

            <v-card-text>
                <v-chip-group
                    v-model="selection"
                    active-class="deep-purple accent-4 white--text"
                    column
                >
                    <v-chip>5:30PM</v-chip>

                    <v-chip>7:30PM</v-chip>

                    <v-chip>8:00PM</v-chip>

                    <v-chip>9:00PM</v-chip>
                </v-chip-group>
            </v-card-text>

            <v-card-actions class="d-flex justify-space-between mb-2">

                <div class="my-2 float-left">
                    <v-btn
                        color="teal"
                        dark
                        large
                        @click="reserve(room.id)"
                    >
                        Забронировать
                    </v-btn>
                </div>

                <div class="my-2 mx-2 float-left">

                    <v-dialog
                        transition="dialog-bottom-transition"
                        max-width="600"
                    >
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn
                                color="deep-purple darken-1"
                                v-bind="attrs"
                                v-on="on"
                                large
                                @click="showGallery(room.id)"
                            >
                                <v-icon>mdi-magnify</v-icon>
                            </v-btn>
                        </template>
                        <template v-slot:default="dialog">
                            <v-card>
                                <v-toolbar
                                    color="primary"
                                    dark
                                >
                                    Галлерея
                                </v-toolbar>
                                <v-card-text>

                                    <div class="text-h2 py-12 d-flex justify-space-between">
                                        <v-btn
                                            text
                                            color="primary"
                                            @click="prevImage"
                                        >
                                            <v-icon color="teal">mdi-arrow-left</v-icon>
                                        </v-btn>
                                        <img style="max-height: 350px; max-width: 80%"
                                             :src="image ? `/storage/${image}`  : `/storage/no_image.jpg`"
                                        >
                                        <v-btn
                                            text
                                            color="primary"
                                            @click="nextImage()"
                                        >
                                            <v-icon color="teal">mdi-arrow-right</v-icon>
                                        </v-btn>
                                    </div>

                                    <p v-if="!room_data.gallery_images.length" class="d-flex justify-content-center">
                                        Изображения галлереи отсутствуют
                                    </p>

                                    <v-row v-else ref="gallery_container_ref">
                                        <v-col
                                            v-for="(image, index)  in room_data.gallery_images"
                                            :key="index"
                                            class="d-flex child-flex empty_container"
                                            cols="2"
                                            ref="empty_container"

                                        >
                                            <img :src="image.name ?  `/storage/${image.name}` : `/storage/no_image.jpg`">

                                        </v-col>
                                    </v-row>

                                </v-card-text>

                                <v-card-actions class="justify-end">
                                    <v-btn
                                        text
                                        @click="dialog.value = false"
                                    >Close</v-btn>
                                </v-card-actions>
                            </v-card>
                        </template>
                    </v-dialog>
                </div>
            </v-card-actions>
        </v-card>
    </v-col>
</template>


<script>

export default {
    name: 'RoomsItem',
    components: {},

    data: function () {
        return {
            loading: false,
            selection: 1,
            room_data: this.room,
            image: this.room.image,

            nex_image_num: 0,
            count: 0,
        }
    },
    methods: {
        reserve(roomId) {
            this.loading = true

            setTimeout(() => {
                this.loading = false
                this.$router.push({path: `/form/${roomId}`,  query: { plan: 'private' }})
            }, 1000)
        },

        nextImage() {

            if (this.room_data.gallery_images.length && this.room_data.gallery_images[this.count]) {

                this.image = this.room_data.gallery_images[this.count].name

                this.count++
            } else {
                this.count = 0
                this.image = this.room.image
            }
        },

        prevImage() {

            if (this.room_data.gallery_images.length && this.room_data.gallery_images[this.count]) {

                this.image = this.room_data.gallery_images[this.count].name

                this.count--
            } else {
                this.count = this.room_data.gallery_images.length - 1
                this.image = this.room.image
            }
        },

        showGallery(roomId) {

        }
    },
    props: {
        room: {},
    },

    mounted() {

    }
}
</script>
