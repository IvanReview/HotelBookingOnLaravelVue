
import * as auth from "../helpers/http_service";

export default {
    state: {
        guests: [],
        errorsGuestEdit: []

    },
    actions: {

        fetchGuests({commit}, {number_page, itemsOnPage}) {

            let page_url = number_page ? `/api/auth/guests?page=${number_page}` : '/api/auth/guests'

            return axios.get(page_url, {
                params: {
                    items_on_page: itemsOnPage
                }
            })
                .then(response => {

                    commit('set_guests', response.data.data)
                    return response.data.last_page

                })
                .catch(error => {
                    console.log(error)

                })
        },

        updateGuestDataInBd({commit}, formData) {
            return axios({
                method: 'POST',
                url: `/api/auth/guests/${formData.get('id')}`,
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }})
                .then(response => {
                    commit('set_update_room_data', response.data)
                    commit('set_errors_room_edit', [])
                    return 200
            })
                .catch(error => {
                    return error.response
                })
        },

        async deleteGuestFromBd({commit}, id) {
            try{
                const response = await axios.delete(`/api/auth/guests/${id}`)
                commit('delete_guest', id)

            } catch (e) {
                console.log(e)
            }

        }


    },
    mutations: {

        set_guests(state, data) {
            state.guests = data
        },

        set_update_room_data(state, data){
            state.guests = state.guests.map(guest => {
                if(guest.id === data.id) {
                    return data
                }
                return guest
            })
        },

        delete_guest(state, id) {
            state.guests = state.guests.filter(item => item.id !== id)
        },

        set_errors_room_edit(state, errors) {
            state.errorsGuestEdit = errors
        },




    },

    getters: {

        getGuests(state) {
            return state.guests
        },

        getGuestEditErrors(state){
            return state.errorsGuestEdit
        },





    }
}
