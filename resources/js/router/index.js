import { createRouter, createWebHistory } from 'vue-router'

import AdminPage from '@/pages/admin/index.vue'
import AdminLogin from '@/pages/admin/login.vue'
import ClientIndex from '@/pages/client/index.vue'
import ClientHall from '@/pages/client/hall.vue'
import ClientPayment from '@/pages/client/payment.vue'
import ClientTicket from '@/pages/client/ticket.vue'
import Page404 from '@/pages/404.vue'

const routes = [
    {
        path: '/admin',
        name: 'admin.index',
        component: AdminPage
    },
    {
        path: '/login',
        name: 'admin.login',
        component: AdminLogin
    },
    {
        path: '/',
        name: 'client.index',
        component: ClientIndex
    },
    {
        path: '/hall/:id',
        name: 'client.hall',
        component: ClientHall,
        props: true
    },
    {
        path: '/payment',
        name: 'client.payment',
        component: ClientPayment
    },
    {
        path: '/ticket',
        name: 'client.ticket',
        component: ClientTicket
    },
    {
        path: '/:pathMatch(.*)*',
        name: '404',
        component: Page404
    }

];

export default createRouter({
    history: createWebHistory(),
    routes
})
