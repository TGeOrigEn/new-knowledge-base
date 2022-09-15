<script lang="ts">
import axios from 'axios';
import { defineComponent } from 'vue'

import Table from "./components/Table.vue";
import Person from './entities/tables/person';
import env from './entities/settings'

export default defineComponent({
    mounted() {
        this.refresh();
    },
    data() {
        return {
            persons: undefined,
            activitys: undefined,
            careers: undefined,
            ranks: undefined,
        }
    },
    components: {
        Table
    },

    methods: {
        refresh() {
            axios.get(`http://${env.SERVER_HOST}:${env.SERVER_PORT}/api/person/all`)
                .then(response => this.persons = response.data);
            axios.get(`http://${env.SERVER_HOST}:${env.SERVER_PORT}/api/activity/all`)
                .then(response => this.activitys = response.data);
            axios.get(`http://${env.SERVER_HOST}:${env.SERVER_PORT}/api/career/all`)
                .then(response => this.careers = response.data);
            axios.get(`http://${env.SERVER_HOST}:${env.SERVER_PORT}/api/rank/all`)
                .then(response => this.ranks = response.data);
        },
    }
})
</script>

<template>
    <Table :person="persons" :activity="activitys" :career="careers" :rank="ranks"></Table>
</template>

<style scoped>

</style>
