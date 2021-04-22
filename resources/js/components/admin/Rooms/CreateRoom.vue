<template>
    <v-dialog
        transition="dialog-bottom-transition"
        v-model="dialog"
        max-width="600"
    >
        <template v-slot:activator="{ on, attrs }">
            <v-btn color="teal" dark
                   class="ma-2"
                   v-bind="attrs"
                   v-on="on"
            >
                <v-icon>mdi-plus-outline</v-icon> Создать комнату
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
                            Создание номера
                        </span>
                    </v-card-title>
                    <v-card-text>
                        <v-container>
                            <v-row>
                                <v-col cols="12" >
                                    <v-text-field label="Название номера"
                                                  required
                                                  prepend-icon="mdi-home"
                                                  v-model="room_create.name"
                                                  :error-messages="errors.name"

                                    >
                                    </v-text-field>
                                </v-col>

                                <v-col cols="12">
                                    <v-text-field label="Цена"
                                                  required
                                                  prepend-icon="mdi-cash"
                                                  v-model="room_create.price"
                                                  :error-messages="errors.price"
                                    ></v-text-field>
                                </v-col>

                                <v-col cols="12" sm="12">
                                    <v-select
                                        :items="['1', '2', '3', '4']"
                                        label="Количество гостей"
                                        prepend-icon="mdi-account-multiple-plus"
                                        required
                                        v-model="room_create.amount_guests"
                                        :error-messages="errors.amount_guests"
                                    ></v-select>
                                </v-col>
                                <v-col cols="12" sm="12">
                                    <v-autocomplete
                                        :items="['Эконом', 'Стандарт', 'Апартамент', 'Люкс', 'Студия']"
                                        label="Тип номера "
                                        prepend-icon="mdi-home-edit"
                                        v-model="room_create.comfort_level"
                                        :error-messages="errors.comfort_level"
                                    ></v-autocomplete>
                                </v-col>

                                <!--//главное изображение-->
                                <v-col cols="12" sm="12">
                                    <img src=""
                                         ref="roomMainImage"
                                         width="100%">

                                    <v-file-input
                                        show-size
                                        label="Загрузка главного изображения"
                                        ref="roomImage"
                                        v-on:change="attachImage($event)"
                                        :error-messages="errors.image"
                                    ></v-file-input>
                                </v-col>

                                <v-divider></v-divider>

                                <!--//главное изображение-->
                                <v-col cols="12" sm="12">

                                    <v-file-input
                                        show-size
                                        label="Загрузка изображений для галлереи"
                                        ref="createRoomsGalleryImage"
                                        prepend-icon="mdi-camera"
                                        multiple
                                        v-on:change="attachImageCreateRoomGallery($event)"
                                        :error-messages="errors.image_gallery"
                                    ></v-file-input>
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
                    Закрыть
                </v-btn>

                <v-btn  @click="createData()" color="orange">
                    Создать <v-icon dark right> mdi-checkbox-marked-circle </v-icon>
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
    name: "CreateRoom",
    data: function ()  {
        return {
            dialog: false,
            room_create: {
                id:'',
                name: '',
                price: '',
                amount_guests: '',
                comfort_level: '',
                image: [],
                image_gallery: [],
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
            'createRoomInBd'
        ]),

        //показать изображения галлереи после загрузки
        attachImageCreateRoomGallery() {

            let files = this.$refs.createRoomsGalleryImage.files

            let parentContainer = document.querySelector('.gallery_container')
            let container = parentContainer.querySelectorAll('.empty_container')


            //если количество файлов > количества контейнеров добавляем еще
            if (container.length < files.length) {

                for (let index = 0; index < files.length - container.length; index++) {

                    let el = document.createElement('div')
                    el.classList.add('vg-dotted-square', 'vg-center', 'empty_container')
                    parentContainer.append(el)
                }
                container = parentContainer.querySelectorAll('.empty_container')
            }

            for (let i in files) {
                if (files.hasOwnProperty(i)) {

                    let addElemId = this.fileStore.push(files[i]) - 1

                    this.showImageGallery(files[i], container[i])

                    this.deleteDisplayImage(addElemId, container[i])
                }
            }
        },

        //непосредственно отображение изображения галлереи
        showImageGallery(file, container) {
            let reader = new FileReader()

            //содержимое контейнера удаляем
            container.innerHTML = ''

            reader.readAsDataURL(file);

            reader.onload = function (e) {

                //внутри контейнера создаем тег img
                container.innerHTML = '<img class="img_item" style="width: 70px" src="">'

                //вставляем в img файл
                container.querySelector('img').setAttribute('src', reader.result)

                container.classList.remove('empty_container')

            };
        },

        //удалить изображение по клику
        deleteDisplayImage(addElemId, container) {

            container.addEventListener('click', () => {

                //сносим контаинер
                container.remove()

                //и файл из переменной
                delete this.fileStore[addElemId]

                this.productCreate.gallery_img = this.fileStore.filter((file) => file !== "undefined")
            })
        },

        createData() {
            this.isLoading = 'orange'
            let formData = new FormData

            formData.append('name', this.room_create.name)
            formData.append('price', this.room_create.price)
            formData.append('amount_guests', this.room_create.amount_guests)
            formData.append('comfort_level', this.room_create.comfort_level)
            formData.append('image', this.room_create.image)

            this.createRoomInBd(formData)
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

        //привязать главное изображение
        attachImage(file) {

            if (file) {
                this.room_create.image = file
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
