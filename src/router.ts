import {createRouter, createWebHistory} from 'vue-router'

import Play from "./views/Play.vue";
import Words from "./views/Words.vue";

const routes = [
    { path: '/', component: Play },
    { path: '/words', component: Words },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router