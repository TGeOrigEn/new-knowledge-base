<script setup lang="ts">
import Button from '../../buttons/Button.vue';
import Search from '../../fields/viewPanel/Search.vue'
import Filter from '../../fields/viewPanel/Filter.vue'
import Item from '../../fields/list/Item.vue';
import List from '../../fields/list/List.vue';
import Dropdown from '../../fields/viewPanel/Dropdown.vue';
import Header from '../Header.vue';
import { size } from '@/update/entities/table';
import { onBeforeMount, ref, onUpdated } from 'vue';

import { Command, Activity, Career, Person, Rank, Place, Link } from '@/update/entities/DataBase';

import BiographyCell from '../cells/BiographyCell.vue';
import EducationCell from '../cells/EducationCell.vue';
import ActivityCell from '../cells/ActivityCell.vue';
import PersonCard from '../../card/PersonCard.vue';
import CareerCell from '../cells/CareerCell.vue';
import RankCell from '../cells/RankCell.vue';
import TextCell from '../cells/TextCell.vue';

import { TextFilter, CareerFilter, PlaceFilter, RankFilter, EducationFilter, BiographyFilter } from '@/update/entities/Filter'

const activity = ref<Activity[]>([]);

const person = ref<Person[]>([]);

const career = ref<Career[]>([]);

const place = ref<Place[]>([]);

const link = ref<Link[]>([]);

const rank = ref<Rank[]>([]);

const card = ref({
    disabled: false,
    id: - 1
});

const beforeMount = onBeforeMount(() => {
    refresh();
})

function refresh() {
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

    Command.select<Place>(Place.NAME).then(response => {
        if (response == undefined) return;
        place.value = response;
    });

    Command.select<Link>(Link.NAME).then(response => {
        if (response == undefined) return;
        link.value = response;
    });
}

const mounted = onUpdated(() => size());

const filter = ref({
    activity: new TextFilter(),
    biography: new BiographyFilter(),
    career: new CareerFilter(),
    education: new EducationFilter(),
    rank: new RankFilter(),
    marital_status: new TextFilter(),
    salary: new TextFilter(),
    awards: new TextFilter(),
    property: new TextFilter(),
    place: new PlaceFilter(),
});

</script>

<template>
    <PersonCard v-if="card.disabled" :readonly="false" :id="card.id" :close="() => card.disabled = false">
    </PersonCard>

    <div style="padding: 5px;">
        <div class="nav">
            <Button class="x-button-nav" :text="'Описание'"></Button>
            <Button class="x-button-nav" :text="'Инструкция'"></Button>
            <Button :disabled="true" class="x-button-nav" :text="'База знаний'"></Button>
            <Button class="x-button-nav" :text="'Карта'"></Button>
        </div>
    </div>

    <div>
        <div>
            <div style="width: 97vw; margin-left: auto; margin-right: auto; display: flex; align-items: center;">
                <Button class="x-button-def " :src="'/plus.svg'"
                    :onClick="() => { card.id = -1; card.disabled = true; }"></Button>
                <Button :src="'/refresh.svg'" class="x-button-def" :onClick="refresh"></Button>
                <Filter style="margin-left: 5px; margin-right: 10px;">
                    <List>
                        <Item
                            v-for="item in ['Биография', 'Образование', 'Награды', 'Жалование', 'Имущество', 'Семейное положение']"
                            :text="item" :remove="() => { }" />
                    </List>
                    <Dropdown>
                        <Item v-for="item in ['Деятельность', 'Чин', 'Карьера']" :text="item" :width="'100%'" />
                    </Dropdown>
                </Filter>
                <Search :placeholder="'Поиск по тексту в таблице...'" style="flex: 1; height: 20px; margin-left: auto;">
                </Search>
            </div>
            <div
                style="margin-top: 5px; border: 1px solid #85858560; width: 97vw; overflow: auto; margin-left: auto; margin-right: auto;">
                <table id="table-head" style="width: 100%; border: 0px solid black;">
                    <thead>
                        <tr>
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
                </table>
                <table id="table-body" style="width: 100%; border: 0">
                    <tbody style="width: 100%; display: block; max-height: 75vh; overflow: auto;">
                        <tr v-for="item in person" :ondblclick="() => { card.id = item.id; card.disabled = true; }">
                            <BiographyCell :person="item" />
                            <EducationCell :value="item" />
                            <TextCell :value="item.awards" />
                            <TextCell :value="item.salary" />
                            <TextCell :value="item.property" />
                            <TextCell :value="item.marital_status" />
                            <CareerCell :value="career?.filter(element => element.person_id === item.id)" />
                            <RankCell :value="rank?.filter(element => element.person_id === item.id)" />
                            <ActivityCell
                                :place="place.filter(element => link.filter(element => activity?.filter(element => element.person_id === item.id).map(element => element.id).includes(element.activity_id)).map(element => element.place_id).includes(element.id))"
                                :value="activity?.filter(element => element.person_id === item.id)" />
                        </tr>
                    </tbody>
                </table>
            </div>
            <div style="display:none;">
                <div
                    style="background-color: #f8f9fa; align-items: center;  text-align: center;  justify-content: center;  margin-top: 15px; border: 1px solid #85858560; width: max-content; display: flex; margin-left: auto; margin-right: auto;">
                    <div style="background-color: #f8f9fa;    display: flex; align-items: center; margin-right: auto;">
                        <Button style="transform:rotate(180deg); padding: 7.5px;" class="x-button-def"
                            src="/double-arrow.svg"></Button>
                        <Button style="transform:rotate(90deg)" class="x-button-def" src="/arrow.svg"></Button>
                        <Search style="width: 17px; text-align: center;"></Search>
                        <div> из 20</div>
                        <Button style="transform:rotate(270deg)" class="x-button-def" src="/arrow.svg"></Button>
                        <Button style="transform:rotate(0deg); padding: 7.5px;" class="x-button-def"
                            src="/double-arrow.svg"></Button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.x-button-nav {
    height: 100%;
    border-radius: 0;
    width: auto;
    margin: 0;
    padding-left: 100px;
    padding-right: 100px;
    border-top: 0;
    border-bottom: 0;
}

.nav>button:first-child {
    border-left: 0;
}

.nav>button {
    border-right: 0;
}

.nav>button:hover {
    border-color: #85858560;
}


.nav {
    justify-content: flex-end;
    align-items: center;
    width: fit-content;
    display: flex;
    flex-direction: row;
    margin: 10px;
    height: 50px;
    width: max-content;
    background-color: #f8f9fa;
    border: 1px solid #85858560;

    margin-left: auto;
    margin-right: auto;
}

.x-button-def {
    width: 32px;
    height: 32px;
    padding: 5px;
    flex: 0 0 32px;
}

th {
    background-color: #f8f9fa;
    padding: 5px;
}

td {
    background-color: #f8f9fa;
    padding: 5px;
}

tr:hover td {
    background-color: #d4d4d460;
}

td,
th {
    height: 100%;
    position: relative;
}

td span {
    min-width: 100px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: inherit;
    display: block;
}

th span {
    min-width: 100px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: inherit;
    display: block;
}

table {
    border: 1px solid #85858560;
    border-collapse: separate;
    border-spacing: 0;
    overflow-y: auto;
    text-align: center;
    table-layout: unset;
    width: 100%;
}

table>tbody>tr>td:first-child {
    border-left: 0px solid #85858560;
}

table>tbody>tr>td:not(:last-child) {
    border-right: 1px solid #85858560;
}

table>tbody>tr:not(:last-child)>td {
    border-bottom: 1px solid #85858560;
}

table>tbody>tr:last-child>td {
    border-bottom: 0px solid #85858560;
}

table>thead>tr>th {
    border-bottom: 1px solid #85858560;
}

table>thead>tr>th:not(:last-child) {
    border-right: 1px solid #85858560;
}
</style>