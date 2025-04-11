import './bootstrap';

import Alpine from 'alpinejs';
import './accordeon.js';


window.Alpine = Alpine;

Alpine.start();

import { createApp } from 'vue';
import router from './router'
import AdminPage from '@/pages/admin/index.vue'

createApp({
    components: {
        AdminPage
    }
}).use(router).mount('#app')

