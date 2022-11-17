<script lang="ts">
import axios from 'axios';
import { defineComponent } from 'vue'

import env from './update/entities/settings'
import PersonCard from './update/components/card/PersonCard.vue';
import Table from './update/components/table/Table.vue';

export default defineComponent({
    mounted() {
        this.refresh();
    },
    data() {
        return {
            optionsA: ["1", "2", "3"],
            isOpen: true,
            persons: undefined,
            activitys: undefined,
            careers: undefined,
            ranks: undefined,
            places: undefined,
            links: undefined,
            value: "213123"
        }
    },
    components: {
        PersonCard,
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
            axios.get(`http://${env.SERVER_HOST}:${env.SERVER_PORT}/api/place/all`)
                .then(response => this.places = response.data);
            axios.get(`http://${env.SERVER_HOST}:${env.SERVER_PORT}/api/activity_place/all`)
                .then(response => this.links = response.data);
        },
        cancel() {
            this.isOpen = false;
            console.log(this.$data.persons);
        }
    }
})
</script>

<template>
    <!-- <PersonCard :refresh="refresh" v-if="isOpen" :id="2" :close="cancel" :readonly="false" :width="'700px'" :mask="true">
    </PersonCard> -->
    <!-- <Card :close="cancel" :value="value" title="Карточка личности" :isOpen="true"></Card> -->
    <!-- <EducationFilter :isOpen="true"></EducationFilter> -->
    <!-- <SimpleFilter :isOpen="true" title="Фильтрация столбца: Награды"></SimpleFilter> -->
    <!-- <OldTable :person="persons" :activity="activitys" :career="careers" :rank="ranks"></OldTable> -->
    <Table :refresh="refresh" :person="persons" :activity="activitys" :career="careers" :rank="ranks"></Table>
</template>

<style scoped>

</style>
