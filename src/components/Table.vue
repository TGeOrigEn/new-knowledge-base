<script lang="ts">
import { defineComponent } from 'vue';

import type Activity from '@/entities/tables/activity';
import type Career from '@/entities/tables/career';
import type Person from '@/entities/tables/person';
import type Rank from '@/entities/tables/rank';

import InforamtionCell from './cells/Inforamtion.vue';
import EducationCell from './cells/Education.vue';
import ActivityCell from './cells/Activity.vue';
import CareerCell from './cells/Career.vue';
import OtherCell from './cells/Other.vue';
import RankCell from './cells/Rank.vue';

import Header from './Header.vue';

import handle from '../scripts/hadnler';
import Menu from './Menu.vue';

export default defineComponent({
    mounted() {
        handle(document.getElementById('person-table')!, { handler: "column-resize-handler", headline: "headline" });
    },
    props: {
        person: {
            type: Array<Person>
        },
        career: {
            type: Array<Career>
        },
        activity: {
            type: Array<Activity>
        },
        rank: {
            type: Array<Rank>
        }
    },
    components: {
        InforamtionCell,
        EducationCell,
        ActivityCell,
        CareerCell,
        OtherCell,
        RankCell,
        Header,
        Menu
    }
});
</script>
        
<template>
    <table id="person-table">
        <thead>
            <tr class="headline">
                <Header :text="'№'"></Header>
                <Header :text="'БИО'">
                    <Menu></Menu>
                </Header>
                <Header :text="'Образование'"></Header>
                <Header :text="'Награды'"></Header>
                <Header :text="'Жалование'"></Header>
                <Header :text="'Имущество'"></Header>
                <Header :text="'Семейное положение'"></Header>
                <Header :text="'Карьера'"></Header>
                <Header :text="'Чин'"></Header>
                <Header :text="'Деятельность'"></Header>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item, index) in $props.person" :key="index">
                <td>{{index + 1}}</td>
                <InforamtionCell :person="item" />
                <EducationCell :person="item" />
                <OtherCell :value="item.awards" />
                <OtherCell :value="item.salary" />
                <OtherCell :value="item.property" />
                <OtherCell :value="item.marital_status" />
                <CareerCell :items="$props.career?.filter(element => element.person_id === item.id)" />
                <RankCell :items="$props.rank?.filter(element => element.person_id === item.id)" />
                <ActivityCell :items="$props.activity?.filter(element => element.person_id === item.id)" />
            </tr>
        </tbody>
    </table>
</template>
        
<style scoped>
table {
    display: block;
    border-collapse: separate;
    border-spacing: 0;
    max-height: 50vh !important;
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