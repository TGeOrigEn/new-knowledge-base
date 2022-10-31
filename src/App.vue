<script lang="ts">
import axios from 'axios';
import { defineComponent } from 'vue'

import Table from "./components/Table.vue";
import Person from './entities/tables/person';
import env from './entities/settings'
import Modal from './components/window/Modal.vue';
import Form from './components/form/Form.vue';
import TextField from './components/fields/TextField.vue';
import SelectField from './components/fields/SelectField.vue';
import BiographyFilter from './components/filter/BiographyFilter.vue';
import EducationFilter from './components/filter/EducationFilter.vue';
import SimpleFilter from './components/filter/SimpleFilter.vue';

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
        }
    },
    components: {
        Form,
        Table,
        Modal,
        TextField,
        SelectField,
        BiographyFilter,
        EducationFilter,
        SimpleFilter
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
        cancel() {
            this.isOpen = false;
        }
    }
})
</script>

<template>
    <!-- <BiographyFilter :isOpen="true"></BiographyFilter> -->
    <!-- <EducationFilter :isOpen="true"></EducationFilter> -->
    <SimpleFilter :isOpen="true" title="Фильтрация столбца: Награды"></SimpleFilter>
    <Table :person="persons" :activity="activitys" :career="careers" :rank="ranks"></Table>
</template>

<style scoped>

</style>
