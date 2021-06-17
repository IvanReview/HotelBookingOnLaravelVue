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

                                <!--//изображения галлереи-->
                                <v-col cols="12" sm="12">

                                    <v-file-input
                                        show-size
                                        label="Загрузка изображений для галлереи"
                                        class="file_image"
                                        ref="updateRoomsGalleryImage"
                                        prepend-icon="mdi-camera"
                                        multiple
                                        v-on:change="attachImageUpdateRoomGallery($event)"
                                        :error-messages="errors.gallery_images"
                                    ></v-file-input>
                                </v-col>

                                <v-col  cols="12">

                                    <v-row ref="gallery_container_edit">

                                        <p v-if="!room_data.gallery_images.length && !fileStore.length"
                                           class="text-center px-4"
                                        >
                                            Изображения в галлереии отсутствуют!
                                        </p>

                                        <v-col
                                            v-else
                                            v-for="image in room_data.gallery_images"
                                            :key="image.id"
                                            class="d-flex child-flex"
                                            cols="4"
                                            @click="deleteDisplayOldImage"

                                        >
                                            <img :src="`/storage/${image.name}`"
                                                 class="grey lighten-2"
                                                 :lazy-src="`/storage/${image.name}`"

                                            >
                                        </v-col>
                                    </v-row>
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
                gallery_images: [],
            },

            fileStore: [],

            isLoading: false,
            alert: true,
            color: 'teal',
            text: '',
            snackbar: false,
            timeout: 4000,

            errors: [],
        }
    },
    watch: {

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
        //показать изображения галлереи после загрузки
        attachImageUpdateRoomGallery() {

            let files = this.$refs.updateRoomsGalleryImage.$refs.input.files

            let parentContainer = this.$refs.gallery_container_edit
            let container = parentContainer.querySelectorAll('.empty_container_edit')

            //если количество файлов > количества контейнеров добавляем еще
            if (container.length < files.length) {

                for (let index = 0; index < files.length - container.length; index++) {

                    let el = document.createElement('div')
                    el.classList.add("d-flex", "child-flex", "col", "col-4", "empty_container_edit")
                    parentContainer.append(el)
                }
                container = parentContainer.querySelectorAll('.empty_container_edit')
            }

            //проходимся по массиву файлов и вызыв методы показа изображения и удаления
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
                container.innerHTML = '<img class="image_item" src="">'

                //вставляем в img файл
                container.querySelector('img').setAttribute('src', reader.result)

                container.classList.remove('empty_container_edit')

            };
        },

        //удалить вновь добавленное изображение по клику
        deleteDisplayImage(addElemId, container) {

            container.addEventListener('click', () => {

                //сносим контаинер
                container.remove()

                //и файл из переменной
                delete this.fileStore[addElemId]
            })
        },

        //удалить старое изображение по клику
        deleteDisplayOldImage(elemId, container=false){

            this.room_data.gallery_images.splice(elemId, 1)
        },

        //Добавить Изображение методом перетаскивания
        dragAndDrop(areaWhenDragFile, inputFileField) {
            ['dragenter', 'dragover', 'dragleave', 'drop'].forEach((eventName, index) => {
                areaWhenDragFile.addEventListener(eventName, (e) => {
                    e.preventDefault()
                    e.stopPropagation()

                    if (index < 2) {
                        areaWhenDragFile.style.background = '#2196f3'
                    } else {
                        areaWhenDragFile.style.background = '#1e1e1e'

                        if (index === 3) {
                            //dataTransfer хранит объекты перетаскиваемые мышью
                            inputFileField.files = e.dataTransfer.files

                            //вызвать событие передаем change, а при событии change срабатывает уже другая функц загрузки изобр
                            inputFileField.dispatchEvent(new Event('change'))
                        }
                    }

                })
            })
        },

        //Обновить данные для номера
        updateData() {
            let file = this.fileStore.filter(item => item !== 'undefined')
            let old_image_id = this.room_data.gallery_images.map(item => item.id)
            let result_image_arr = file.concat(old_image_id)//сливаем новые изобр(файл) и старое(достат id)

            this.isLoading = 'orange'
            let formData = new FormData
            formData.append('id', this.room_data.id)
            formData.append('name', this.room_data.name)
            formData.append('price', this.room_data.price)
            formData.append('amount_guests', this.room_data.amount_guests)
            formData.append('comfort_level', this.room_data.comfort_level)
            formData.append('image', this.room_data.image)
            formData.append('_method', "PUT")

            if (result_image_arr.length){
                result_image_arr.forEach((image, index) => {

                    formData.append(`${'gallery_img'}[${index}]`, image)
                })
            }

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
    },

    updated() {

        if (this.$refs.updateRoomsGalleryImage && this.$refs.gallery_container_edit) {
            let inputFileFieldGallery = this.$refs.updateRoomsGalleryImage.$refs.input
            let areaWhenDragFile = this.$refs.gallery_container_edit

            this.dragAndDrop(areaWhenDragFile, inputFileFieldGallery)
        }

    }
}
</script>

<style scoped>

</style>
