<script setup lang="ts">
import type Activity from '@/update/entities/tables/Activity';
import type Career from '@/update/entities/tables/Career';
import type Person from '@/update/entities/tables/Person';
import type Rank from '@/update/entities/tables/Rank';
import { onBeforeMount, onMounted, ref } from 'vue';

import ActivityCell from './cells/ActivityCell.vue';
import BiographyCell from './cells/BiographyCell.vue';
import CareerCell from './cells/CareerCell.vue';
import EducationCell from './cells/EducationCell.vue';
import RankCell from './cells/RankCell.vue';
import TextCell from './cells/TextCell.vue';

import Header from './Header.vue';

import handle from '../../entities/hadnler';
import PersonCard from '../card/PersonCard.vue';

const props = defineProps({
    refresh: { type: Function, required: true },
    activity: { type: Array<Activity>, required: true },
    person: { type: Array<Person>, required: true },
    career: { type: Array<Career>, required: true },
    rank: { type: Array<Rank>, required: true }
});

const mounted = onMounted(() => handle(document.getElementById('person-table')!, { handler: "column-resize-handler", headline: "headline" }))

const card = ref({
    id: 0,
    show: false,
});
</script>

<template>

    <PersonCard :width="'700px'" v-if="card.show" :refresh="refresh" :mask="true" :close="() => { card.show = false; }"
        :id="card.id">
    </PersonCard>
    <button style="margin: 20px;" :onClick="() => { card.id = 0; card.show = true; }">СОЗДАТЬ ЛИЧНОСТЬ</button>
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
            <tr :ondblclick="() => { card.id = item.id; card.show = true; }" v-for="(item, index) in person"
                :key="index">
                <BiographyCell :value="item" />
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