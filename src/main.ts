import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from "./router.ts";
import Particles from "@tsparticles/vue3";
import { loadFull } from "tsparticles"

createApp(App)
    .use(router)
    .use(Particles, {
        init: async engine => {
            await loadFull(engine); // you can load the full tsParticles library from "tsparticles" if you need it
        },
    })
    .mount('#app')
