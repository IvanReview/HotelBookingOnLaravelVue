import Vue from 'vue'
import VueRouter from 'vue-router'
import * as auth from '../helpers/http_service'

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        component: () => import('../components/mainPages/MainWrapper.vue'),
        children: [
            {
                path: '/',
                name: 'MainPage',
                component: () => import('../components/mainPages/MainPage.vue'),
            },
            {
                path: '/form/:roomId',
                name: 'FormBooking',
                component: () => import('../components/mainPages/FormBooking.vue')
            },
        ]
    },

    {
        path: '/admin',
        component: () => import('../components/admin/AdminMain.vue'),
        meta: { requiresAuth: true },

        children: [
            {
                path: 'schedule',
                name: 'Schedule',
                meta: { requiresAuth: true },
                component: () => import('../components/admin/MainSchedule/BookingSchedule.vue'),
            },
            {
                path: '/',
                name: 'BookingTable',
                meta: { requiresAuth: true },
                component: () => import('../components/admin/BookingTable/BookingTable.vue'),
            },
            {
                path: 'profile',
                name: 'Profile',
                meta: { requiresAuth: true },
                component: () => import('../components/admin/AdminProfile/Profile.vue'),
            },
            {
                path: 'rooms',
                name: 'RoomsList',
                meta: { requiresAuth: true },
                component: () => import('../components/admin/Rooms/Rooms.vue'),
            },
            {
                path: 'guest',
                name: 'Guest',
                component: () => import('../components/admin/Guests/Guests.vue'),
            },
        ],
        /*  beforeEnter(to, from, next) {
              if(! auth.isLoggedIn()){
                  next('/login')
              }
              else if(auth.getUserRole() !== 'admin') {
                  next('/404')
              }
              else {
                  next()
              }

          }*/
    },

    {
        path: '*',
        name: 'NotFound404',
        component:  () => import('../components/errors/NotFound404.vue'),
    },

    {
        path: '/login',
        name: 'Login',
        component: () => import('../components/auth/Login.vue'),

    },

    {
        path: '/register',
        name: 'Register',
        component: () => import('../components/auth/Register.vue'),
    },





];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
    linkActiveClass: 'active'
});


router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {

        if (!auth.isLoggedIn()) {
            next({
                path: '/login',
                query: { redirect: to.fullPath }
            })
        }
        else if(auth.getProfile().role !== 'admin') {
            next('/404')
        }
        else {
            next()
        }

    }  else {
        next()
    }
})

export default router
