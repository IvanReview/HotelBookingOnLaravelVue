import store from '../vuex'



//проверить залогирован ли пользователь
export function isLoggedIn() {

    return localStorage.getItem('token') != null
}


//получить профиль пользователя
export function getProfile() {
    const user = localStorage.getItem('user')
    if (! user) {
        return null
    }

    return JSON.parse(user)
}





