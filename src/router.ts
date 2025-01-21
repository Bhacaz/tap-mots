import {createRouter, createWebHistory} from 'vue-router'

import Play from "./views/Play.vue";
import ListEditing from "./views/ListEditing.vue";

const routes = [
    { path: '/', component: Play },
    { path: '/list', component: ListEditing },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router