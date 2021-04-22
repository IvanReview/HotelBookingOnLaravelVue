<template>
    <v-dialog
        transition="dialog-bottom-transition"
        v-model="dialog"
        max-width="600"
    >
        <template v-slot:activator="{ on, attrs }">
            <v-btn color="orange darken-4" fab small dark
                   class="ma-2"
                   v-bind="attrs"
                   v-on="on"
            >
                <v-icon>mdi-pencil</v-icon>
            </v-btn>

        </template>

        <v-card :loading="isLoading">
            <v-toolbar color="primary" dark>
                Карточка редактирования данных
            </v-toolbar>

            <v-card-text>
                <v-card class = "my-10">
                    <v-card-title >
									<span class="headline" style="width: 100%; text-align: center;">
										Редактирование данных номера
									</span>
                    </v-card-title>
                    <v-card-text>
                        <v-container>
                            <v-row>
                                <v-col cols="12" >
                                    <v-text-field label="Название номера"
                                                  required
                                                  prepend-icon="mdi-home"
                                                  v-model="room_data.name"
                                                  :error-messages="errors.name"

                                    >
                                    </v-text-field>
                                </v-col>

                                <v-col cols="12">
                                    <v-text-field label="Цена"
                                                  required
                                                  prepend-icon="mdi-cash"
                                                  v-model="room_data.price"
                                                  :error-messages="errors.price"
                                    ></v-text-field>
                                </v-col>

                                <v-col cols="12" sm="12">
                                    <v-select
                                        :items="['1', '2', '3', '4']"
                                        label="Количество гостей"
                                        prepend-icon="mdi-account-multiple-plus"
                                        required
                                        v-model="room_data.amount_guests"
                                        :error-messages="errors.amount_guests"
                                    ></v-select>
                                </v-col>
                                <v-col cols="12" sm="12">
                                    <v-autocomplete
                                        :items="['Эконом', 'Стандарт', 'Апартамент', 'Люкс', 'Студия']"
                                        label="Тип номера "
                                        prepend-icon="mdi-home-edit"
                                        v-model="room_data.comfort_level"
                                        :error-messages="errors.comfort_level"
                                    ></v-autocomplete>
                                </v-col>
                                <v-col cols="12" sm="12">
                                    <img :src="room_data.image ? `/storage/${room_data.image}` : `/storage/no_image.jpg`"
                                         ref="roomMainImage"
                                         width="100%"
                                    >
                                    <v-file-input
                                        show-size
                                        label="File input"
                                        ref="roomImage"
                                        v-on:change="attachImage($event)"
                                        :error-messages="errors.image"
                                    ></v-file-input>
                                </v-col>

                                <v-col cols="12">
                                    <v-card-title>Галерея Изображений </v-card-title>
                                </v-col>

                                <v-col
                                    v-for="n in 9"
                                    :key="n"
                                    class="d-flex child-flex"
                                    cols="4"
                                >

                                    <v-img
                                        :src="`https://picsum.photos/500/300?image=${n * 5 + 10}`"
                                        :lazy-src="`https://picsum.photos/10/6?image=${n * 5 + 10}`"
                                        aspect-ratio="1"
                                        class="grey lighten-2"
                                    >
                                        <template v-slot:placeholder>
                                            <v-row
                                                class="fill-height ma-0"
                                                align="center"
                                                justify="center"
                                            >
                                                <v-progress-circular
                                                    indeterminate
                                                    color="grey lighten-5"
                                                ></v-progress-circular>
                                            </v-row>
                                        </template>
                                    </v-img>
                                </v-col>
                            </v-row>

                        </v-container>
                    </v-card-text>
                </v-card>
            </v-card-text>
            <v-card-actions class="justify-end" ref="closeBtn">
                <v-btn text @click="dialog = false">
                    Close
                </v-btn>

                <v-btn  @click="updateData()" color="orange">
                    Update <v-icon dark right> mdi-checkbox-marked-circle </v-icon>
                </v-btn>
            </v-card-actions>


            <!--//всплывающее сообщение-->
            <v-snackbar
                v-model="snackbar"
                :timeout="timeout"
                :color="color"
                absolute
                left
                shaped
                bottom
            >
                {{text}}
            </v-snackbar>
        </v-card>
    </v-dialog>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
    name: "EditRoom",
    props: {
        room: {}
    },
    data: function ()  {
        return {
            dialog: false,
            room_data: {
                id:'',
                name: '',
                price: '',
                amount_guests: '',
                comfort_level: '',
                image: [],
            },
            isLoading: false,
            alert: true,
            color: 'teal',
            text: '',
            snackbar: false,
            timeout: 4000,

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
            'updateRoomInBd'
        ]),

        updateData() {
            this.isLoading = 'orange'
            let formData = new FormData
            formData.append('id', this.room_data.id)
            formData.append('name', this.room_data.name)
            formData.append('price', this.room_data.price)
            formData.append('amount_guests', this.room_data.amount_guests)
            formData.append('comfort_level', this.room_data.comfort_level)
            formData.append('image', this.room_data.image)
            formData.append('_method', "PUT")

            this.updateRoomInBd(formData)
                .then(response => {
                    if (response === 200) {
                        this.dialog = false
                        this.isLoading = false
                        this.errors = []
                    }
                    if (response.status === 422) {
                        switch (response.status) {
                            case 422:
                                this.errors = response.data.errors
                                console.log(this.errors)
                                break;
                            default:
                                console.log(error)
                                break;
                        }
                        this.snackbar = true
                        this.color = 'red'
                        this.text = "Заолните правильно поля формы"
                    }
                })

        },

        attachImage(file) {

            if (file) {
                this.room_data.image = file
                let reader = new FileReader();
                reader.readAsDataURL(file)

                reader.addEventListener('load',  () => {
                    this.$refs.roomMainImage.src = reader.result;
                })
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
