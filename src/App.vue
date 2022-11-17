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
            person: undefined,
            activity: undefined,
            career: undefined,
            rank: undefined,
            place: undefined,
            link: undefined,
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
                .then(response => this.person = response.data);
            axios.get(`http://${env.SERVER_HOST}:${env.SERVER_PORT}/api/activity/all`)
                .then(response => this.activity = response.data);
            axios.get(`http://${env.SERVER_HOST}:${env.SERVER_PORT}/api/career/all`)
                .then(response => this.career = response.data);
            axios.get(`http://${env.SERVER_HOST}:${env.SERVER_PORT}/api/rank/all`)
                .then(response => this.rank = response.data);
            axios.get(`http://${env.SERVER_HOST}:${env.SERVER_PORT}/api/place/all`)
                .then(response => this.place = response.data);
            axios.get(`http://${env.SERVER_HOST}:${env.SERVER_PORT}/api/activity_place/all`)
                .then(response => this.link = response.data);
        },
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
    <Table :refresh="refresh" :person="person" :activity="activity" :career="career" :rank="rank"></Table>
</template>

<style scoped>

</style>
