<script lang="ts">
import axios from 'axios';
import { defineComponent } from 'vue'

import Table from "./components/Table.vue";
import env from './entities/settings'
import Modal from './components/window/Modal.vue';
import Text from './components/fields/Text.vue';
import Select from './components/fields/Select.vue';
import BiographyFilter from './components/filter/BiographyFilter.vue';
import EducationFilter from './components/filter/EducationFilter.vue';
import SimpleFilter from './components/filter/SimpleFilter.vue';
import Card from './components/Card.vue';
import PersonCard from './update/components/card/PersonCard.vue';

export default defineComponent({
    mounted() {
        this.refresh();
    },
    data() {
        return {
            optionsA: ["1", "2", "3"],
            isOpen: true,
            persons: axios.get(`http://${env.SERVER_HOST}:${env.SERVER_PORT}/api/person/all`)
                .then(response => this.persons = response.data),
            activitys: undefined,
            careers: undefined,
            ranks: undefined,
            places: undefined,
            value: "213123"
        }
    },
    components: {
        Table,
        Modal,
        Text,
        Select,
        BiographyFilter,
        EducationFilter,
        SimpleFilter,
        Card,
        PersonCard

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
        },
        cancel() {
            //this.isOpen = false;
            console.log(this.$data.persons);
        }
    }
})
</script>

<template>

    <PersonCard v-if="persons != undefined" :close="cancel" :place="places" :person="persons[0]" :activity="activitys" :rank="ranks"
        :career="careers" :readonly="false" :width="'700px'" :mask="true"></PersonCard>
    <!-- <Card :close="cancel" :value="value" title="Карточка личности" :isOpen="true"></Card> -->
    <!-- <EducationFilter :isOpen="true"></EducationFilter> -->
    <!-- <SimpleFilter :isOpen="true" title="Фильтрация столбца: Награды"></SimpleFilter> -->
    <Table :person="persons" :activity="activitys" :career="careers" :rank="ranks"></Table>
</template>

<style scoped>

</style>
