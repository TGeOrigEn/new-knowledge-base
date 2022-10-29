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
        SelectField
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
    <Modal v-if="isOpen" title="Фильтрация столбца: Биография" :cancel="cancel">
        <Form title="Содержит:" />
        <TextField :disabled="true" label="Фамилия:"></TextField>
        <TextField label="Имя:"></TextField>
        <TextField label="Отчество:"></TextField>
        <TextField :disabled="true" label="Год рождения:"></TextField>
        <Form title="Равно:" />
        <TextField label="Фамилия:"></TextField>
        <TextField :disabled="true" label="Имя:"></TextField>
        <TextField :disabled="true" label="Отчество:"></TextField>
        <TextField label="Год рождения:"></TextField>
        <SelectField :options="optionsA" label="Вероисповедание:"></SelectField>
        <SelectField :options="optionsA" label="Происхождение:"></SelectField>

    </Modal>
    <Table :person="persons" :activity="activitys" :career="careers" :rank="ranks"></Table>
</template>

<style scoped>

</style>
