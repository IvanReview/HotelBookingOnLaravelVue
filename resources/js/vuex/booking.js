
export default {
    state: {
        booking: [],

        booking_status: [],

        errors_booking: [],
        errors_booking_admin: [],
        errors_edit_booking_admin: [],

    },
    actions: {

        //Бронировать и отправть данные поользователя
        async submitCustomerData({commit}, formData) {
            try {
                 const response = await axios({
                        method: 'POST',
                        url: '/api/booking-rooms',
                        data: formData,
                        headers: { 'Content-Type': 'multipart/form-data' }
                    })

                 return response

            } catch (e) {
                console.log(e)
            }

        },


        //Админка
        //данные брони для главной таблицы
        async getMainTableData({commit}, {number_page, itemsOnPage, sortParams, status = null}) {

            let page_url = number_page ? `/api/auth/booking?page=${number_page}` : '/api/auth/booking'

            try{
                const response = await axios.get(page_url, {
                    params: {
                        status: status,
                        items_on_page: itemsOnPage,
                        sort_params: sortParams,
                    }
                })

                if (status === null) commit('set_booking', response.data.data)
                    else commit('set_booking_status', response.data)

                return response.data.last_page

            } catch (e) {
                console.log(e)
            }
        },

        //Бронировать и отправть данные поользователя
        async submitCustomerDataForBookingAdmin({commit}, formData) {
            try {
                const response = await axios({
                    method: 'POST',
                    url: '/api/auth/booking',
                    data: formData,
                    headers: { 'Content-Type': 'multipart/form-data' }
                })

                commit('create_booking', response.data)
                /*commit('set_searching_rooms_admin', [])*/

                return response

            } catch (error) {
                switch (error.response.status) {
                    case 422:
                        commit('set_errors_create_booking_admin', error.response.data.errors)
                        break;
                    default:
                        console.log(error)
                        break;
                }
            }
        },

        //Обновить Брониронь и  данные поользователя
        async editDataForBookingAdmin({commit}, formData) {
            try {
                const response = await axios({
                    method: 'POST',
                    url: `/api/auth/booking/${formData.get('booking_id')}`,
                    data: formData,
                    headers: { 'Content-Type': 'multipart/form-data' }
                })


                commit('update_booking', response.data)
                commit('set_errors_edit_booking_admin', [])

                return response

            } catch (error) {
                switch (error.response.status) {
                    case 422:
                        commit('set_errors_edit_booking_admin', error.response.data.errors)
                        break;
                    default:
                        console.log(error)
                        break;
                }

                return error.response
            }
        },


        //Удалить бронь
        async deleteBookingFromBd({commit}, id) {
            try{
                const response = await axios.delete(`/api/auth/booking/${id}`)
                commit('delete_booking', id)

            } catch (e) {
                console.log(e)
            }
        }


    },
    mutations: {
        set_booking(state, data){
            state.booking = data
        },

        set_booking_status(state, data) {
            state.booking_status = data
        },

        create_booking(state, data) {
              state.booking.unshift(data)
        },

        //обновление брони
        update_booking(state, data) {
            state.booking = state.booking.map(item => {
                if (item.id === data.id) {
                    return data
                }
                return item
            })
        },

        delete_booking(state, id) {
            state.booking = state.booking.filter(item => item.id !== id)
        },

        set_errors_create_booking_admin(state, errors) {
            state.errors_booking_admin = errors
        },

        set_errors_edit_booking_admin(state, errors) {
            state.errors_edit_booking_admin = errors
        }



    },

    getters: {

        getBookingData(state){
            return state.booking
        },

        getBookingDataStatus(state){
            return state.booking_status
        },

        getErrorsBookingAdmin(state) {
            return  state.errors_booking_admin
        },

        getErrorsEditBookingAdmin(state) {
            return  state.errors_edit_booking_admin
        }

    }
}
