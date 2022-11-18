<script setup lang="ts">
import { onMounted, onBeforeMount, ref } from 'vue';

import { Command, Activity, Career, Person, Rank } from '@/update/entities/DataBase';

import BiographyCell from './cells/BiographyCell.vue';
import EducationCell from './cells/EducationCell.vue';
import ActivityCell from './cells/ActivityCell.vue';
import PersonCard from '../card/PersonCard.vue';
import CareerCell from './cells/CareerCell.vue';
import RankCell from './cells/RankCell.vue';
import TextCell from './cells/TextCell.vue';
import handle from '../../entities/hadnler';
import Header from './Header.vue';

const activity = ref<Activity[]>([]);

const person = ref<Person[]>([]);

const career = ref<Career[]>([]);

const rank = ref<Rank[]>([]);

const card = ref({
    disabled: false,
    id: - 1
});

const beforeMount = onBeforeMount(() => {
    Command.select<Activity>(Activity.NAME).then(response => {
        if (response == undefined) return;
        activity.value = response;
    });

    Command.select<Career>(Career.NAME).then(response => {
        if (response == undefined) return;
        career.value = response;
    });

    Command.select<Person>(Person.NAME).then(response => {
        if (response == undefined) return;
        person.value = response;
    });

    Command.select<Rank>(Rank.NAME).then(response => {
        if (response == undefined) return;
        rank.value = response;
    });
})

const mounted = onMounted(() => {
    handle(document.getElementById('person-table')!, { handler: "column-resize-handler", headline: "headline" });
});
</script>

<template>
    <PersonCard v-if="card.disabled" :readonly="false" :id="card.id" :close="() => card.disabled = false">
    </PersonCard>

    <button style="margin: 20px;" :onClick="() => { card.id = -1; card.disabled = true; }">СОЗДАТЬ ЛИЧНОСТЬ</button>

    <table id="person-table">
        <thead>
            <tr class="headline">
                <Header :name="'Биография'"></Header>
                <Header :name="'Образование'"></Header>
                <Header :name="'Награды'"></Header>
                <Header :name="'Жалование'"></Header>
                <Header :name="'Имущество'"></Header>
                <Header :name="'Семейное положение'"></Header>
                <Header :name="'Карьера'"></Header>
                <Header :name="'Чин'"></Header>
                <Header :name="'Деятельность'"></Header>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in person" :ondblclick="() => { card.id = item.id; card.disabled = true; }">
                <BiographyCell :person="item" />
                <EducationCell :value="item" />
                <TextCell :value="item.awards" />
                <TextCell :value="item.salary" />
                <TextCell :value="item.property" />
                <TextCell :value="item.marital_status" />
                <CareerCell :value="career?.filter(element => element.person_id === item.id)" />
                <RankCell :value="rank?.filter(element => element.person_id === item.id)" />
                <ActivityCell :value="activity?.filter(element => element.person_id === item.id)" />
            </tr>
        </tbody>
    </table>

</template>

<style scoped>
table {
    display: block;
    border-collapse: separate;
    border-spacing: 0;
    max-height: 80vh !important;
    overflow-y: auto;
    text-align: center;
}

table>thead>tr>th {
    position: sticky;
    padding: 0;
    top: 0;
}

table,
th,
tr,
td {
    height: 100%;
}

table {
    border: 1px solid black;
}

table>tbody>tr>td:not(:last-child) {
    border-right: 1px solid black;
}

table>tbody>tr:not(:last-child)>td {
    border-bottom: 1px solid black;
}

table>thead>tr>th:not(:last-child) {
    border-right: 1px solid black;
}

table>thead>tr>th {
    border-bottom: 1px solid black;
}
</style>