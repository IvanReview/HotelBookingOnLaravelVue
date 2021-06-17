<template>
    <v-dialog
        transition="dialog-bottom-transition"
        max-width="600"
    >
        <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary accent-4"
                   fab
                   small
                   dark
                   class="ma-2"
                   v-bind="attrs"
                   v-on="on"
            >
                <v-icon>mdi-magnify</v-icon>
            </v-btn>
        </template>

        <template v-slot:default="dialog">
            <v-card>
                <v-toolbar color="teal" dark>
                    Просмотр даных номера
                </v-toolbar>

                <v-card-text>
                    <v-card
                        max-width="375"
                        class="mx-auto my-5"
                    >
                        <v-img
                            :src="`/storage/${room.image}`"
                            height="200px"
                            dark
                        >
                            <v-row class="fill-height">
                                <v-card-title>
                                    <v-btn dark icon>
                                        <v-icon>mdi-chevron-left</v-icon>
                                    </v-btn>

                                    <v-spacer></v-spacer>

                                    <v-btn dark icon class="mr-4">
                                        <v-icon>mdi-pencil</v-icon>
                                    </v-btn>

                                    <v-btn dark icon>
                                        <v-icon>mdi-dots-vertical</v-icon>
                                    </v-btn>
                                </v-card-title>

                                <v-spacer></v-spacer>

                                <v-card-title class="white--text pl-12 pt-12">
                                    <div class="display-1 pl-12 pt-12">
                                        {{room.name}}
                                    </div>
                                </v-card-title>
                            </v-row>
                        </v-img>

                        <v-list two-line>

                            <v-divider inset></v-divider>

                            <v-list-item>
                                <v-list-item-icon>
                                    <v-icon color="teal">
                                        mdi-cash
                                    </v-icon>
                                </v-list-item-icon>

                                <v-list-item-content>
                                    <v-list-item-title>{{room.price}} Р</v-list-item-title>
                                    <v-list-item-subtitle>Цена</v-list-item-subtitle>
                                </v-list-item-content>
                            </v-list-item>

                            <v-divider inset></v-divider>

                            <v-list-item>
                                <v-list-item-icon>
                                    <v-icon color="teal">
                                        mdi-home
                                    </v-icon>
                                </v-list-item-icon>

                                <v-list-item-content>
                                    <v-list-item-title>{{room.comfort_level}}</v-list-item-title>
                                    <v-list-item-subtitle>Тип номера</v-list-item-subtitle>
                                </v-list-item-content>
                            </v-list-item>


                            <v-divider inset></v-divider>

                            <v-list-item>
                                <v-list-item-icon>
                                    <v-icon color="teal">
                                        mdi-human-queue
                                    </v-icon>
                                </v-list-item-icon>

                                <v-list-item-content>
                                    <v-list-item-title>{{room.amount_guests}}</v-list-item-title>
                                    <v-list-item-subtitle>Количество мест</v-list-item-subtitle>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list>
                        <v-divider inset></v-divider>
                        <v-list-item>

                            <v-list-item-icon>
                                <v-icon color="teal">
                                    mdi-image-multiple-outline
                                </v-icon>
                            </v-list-item-icon>


                            <v-list-item-content>
                                <v-list-item-title >Галерея</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                        <v-list-item>
                            <v-list-item-content>
                                <v-row >
                                    <p v-if="!room.gallery_images.length"> Изображения отсутствуют!</p>

                                    <v-col
                                        v-else
                                        v-for="image in room.gallery_images"
                                        :key="image.id"
                                        class="d-flex child-flex"
                                        cols="4"
                                    >
                                        <img :src="`/storage/${image.name}`"
                                             class="grey lighten-2"
                                             :lazy-src="`/storage/${image.name}`"
                                        >
                                    </v-col>
                                </v-row>
                            </v-list-item-content>
                        </v-list-item>
                    </v-card>
                </v-card-text>

                <v-card-actions class="justify-end">
                    <v-btn text @click="dialog.value = false">Close</v-btn>
                </v-card-actions>
            </v-card>
        </template>
    </v-dialog>
</template>

<script>
export default {
    name: "LookRoom",
    props: {
        room: {
            type: Object,
            default: function () {
                return {}
            },
        },
    },
    mounted() {

    }
}
</script>

<style scoped>

</style>
