import { createRouter, createWebHistory } from 'vue-router'

import ViewPanel from '../components/table/update/ViewPanel.vue'
import MainPage from '../components/table/MainPage.vue'

export default createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/about', component: MainPage, alias: '/' },
        { path: '/table', component: ViewPanel }
    ]
});