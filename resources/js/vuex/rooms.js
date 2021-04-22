
import * as auth from "../helpers/paginate";

export default {
    state: {
        rooms: [],
        rooms_all: [],
        errorsRoomEdit: [],
        paginationRoomsAdmin: {},

        rooms_user: [],
        search_rooms_admin: [],

        errors_search_booking_admin: []

    },
    actions: {

        async searchRoomInBd({commit, state}, {dateStart, dateEnd, guestAmount}) {

             let page_url = '/api/search-rooms';

             try {
                 let response =  await axios.get(page_url, {
                     params: {
                         dateStart: dateStart,
                         dateEnd: dateEnd,
                         guestAmount: guestAmount,
                     }})

                 commit('set_rooms_user', response.data)
                 return response.data
             } catch (e) {
                 console.log(e)
             }

        },


        //Админка
        async searchRoomForBookingInAdmin({commit}, {dateStart, dateEnd, guestAmount, comfortLevel}){
            let page_url = '/api/auth/booking-search';

            try {
                let response =  await axios.get(page_url, {
                    params: {
                        dateStart: dateStart,
                        dateEnd: dateEnd,
                        guestAmount: guestAmount,
                        comfortLevel: comfortLevel,
                    }})

                commit('set_searching_rooms_admin', response.data)
                return response.data
            } catch (e) {
                console.log(e)
            }
        },

        //получить комнаты
        fetchRooms({commit}, {number_page, itemsOnPage}) {

            let page_url = number_page ? `/api/auth/rooms?page=${number_page}` : '/api/auth/rooms'

            return axios.get(page_url, {
                params: {
                    items_on_page: itemsOnPage
                }
            })
                .then(response => {
                    commit('set_rooms', response.data.data)
                    return response.data.last_page
                })
                .catch(error => {
                    console.log(error)
                })
        },

        //получить комнаты
        fetchAllRooms({commit}) {

            return axios.get(`/api/auth/rooms-all`)
                .then(response => {

                    commit('set_all_rooms', response.data)
                })
                .catch(error => {
                    console.log(error)
                })
        },

        //обновить все данные комнаты
        updateRoomInBd({commit}, formData) {
            return axios({
                method: 'POST',
                url: `/api/auth/rooms/${formData.get('id')}`,
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }})
                .then(response => {

                    commit('set_update_room_data', response.data)
                    return 200

                })
                .catch(error => {
                    return error.response
                })

        },

        createRoomInBd({commit}, formData) {
            return axios({
                method: 'POST',
                url: `/api/auth/rooms`,
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }})
                .then(response => {

                    commit('set_create_room_data', response.data)
                    return 200

                })
                .catch(error => {
                    return error.response
                })

        },

        //удаление
        async deleteRoomFromBd({commit}, id ) {
            try{
                const response = await axios.delete(`/api/auth/rooms/${id}`)
                commit('delete_room', id)

            } catch (e) {
                console.log(e)
            }
        }



    },
    mutations: {

        set_rooms(state, rooms) {
            state.rooms = rooms
        },

        set_all_rooms(state, rooms) {
            state.rooms_all = rooms
        },

        //поиск нужных комнат на главной странице
        set_rooms_user(state, rooms) {
            state.rooms_user = rooms
        },

        //поиск нужных комнат в админке
        set_searching_rooms_admin(state, rooms) {
            state.search_rooms_admin = rooms
        },

        //добавление новой комнаты
        set_create_room_data(state, room) {
            state.rooms.unshift(room)
        },


        //обновление данных комнаты
        set_update_room_data(state, room){
           state.rooms = state.rooms.map(item => {
                if (item.id === room.id) {
                    return room
                }
                return item
            })
        },

        delete_room(state, id){
            state.rooms = state.rooms.filter(item => item.id !== id)
        },

        set_errors_room_edit(state, errors) {
            state.errorsRoomEdit = errors
        }

    },

    getters: {

        getRoomsAdmin(state) {
            return state.rooms
        },

        getAllRoomsAdmin(state) {
            return state.rooms_all
        },

        getRoomsAdminAfterSearch(state) {
            return state.search_rooms_admin
        },

        getRoomsUser(state) {
            return state.rooms_user
        },

        getRoomEditErrors(state){
            return state.errorsRoomEdit
        },

        getPaginationRooms(state){
            return state.paginationRoomsAdmin
        }


    }
}
