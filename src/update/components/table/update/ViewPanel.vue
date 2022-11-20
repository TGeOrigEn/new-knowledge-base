<script setup lang="ts">
import Button from '../../buttons/Button.vue';
import Search from '../../fields/viewPanel/Search.vue'
import Filter from '../../fields/viewPanel/Filter.vue'
import Item from '../../fields/list/Item.vue';
import List from '../../fields/list/List.vue';
import Dropdown from '../../fields/viewPanel/Dropdown.vue';
import Header from '../Header.vue';
import { size } from '@/update/entities/table';
import { onBeforeMount, ref, onUpdated, nextTick, onMounted } from 'vue';

import { Command, Activity, Career, Person, Rank, Place, Link, FullPerson, FullActivity } from '@/update/entities/DataBase';

import BiographyCell from '../cells/BiographyCell.vue';
import EducationCell from '../cells/EducationCell.vue';
import ActivityCell from '../cells/ActivityCell.vue';
import PersonCard from '../../card/PersonCard.vue';
import CareerCell from '../cells/CareerCell.vue';
import RankCell from '../cells/RankCell.vue';
import TextCell from '../cells/TextCell.vue';
import TestMap from './TestMap.vue';

import { TextFilter, CareerFilter, PlaceFilter, RankFilter, EducationFilter, BiographyFilter } from '@/update/entities/Filter'
import MapCard from '../../card/MapCard.vue';

const fullPerson = ref<FullPerson[]>([]);

const search = ref("");

const forceUpdate = ref<Boolean>(false);

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

const map = ref(false);

const beforeMount = onBeforeMount(() => {
    refresh();
})

// async function refresh() {
//     person.value = [];
//     const response = await Command.select<Person>(Person.NAME);
//     if (response == undefined) return

//     for (var i = 0; i < response.length; i++)
//         person.value.push(await FullPerson.get(response[i].id));
// };

async function refresh() {
    const aActivity = await Command.select<Activity>(Activity.NAME);
    const aCareer = await Command.select<Career>(Career.NAME);
    const aPerson = await Command.select<Person>(Person.NAME);
    const aPlace = await Command.select<Place>(Place.NAME);
    const aRank = await Command.select<Rank>(Rank.NAME);
    const aLink = await Command.select<Link>(Link.NAME);

    activity.value = aActivity == undefined ? [] : aActivity;
    career.value = aCareer == undefined ? [] : aCareer;
    person.value = aPerson == undefined ? [] : aPerson;
    place.value = aPlace == undefined ? [] : aPlace;
    rank.value = aRank == undefined ? [] : aRank;
    link.value = aLink == undefined ? [] : aLink;

    fullPerson.value = [];
    person.value.forEach(person => {
        const bActivity = activity.value.filter(activity => activity.person_id == person.id);
        const bCareer = career.value.filter(career => career.person_id == person.id);
        const bRank = rank.value.filter(rank => rank.person_id == person.id);
        const fullActivity = bActivity.map(activity => new FullActivity(activity, place.value.filter(item => link.value.filter(link => link.activity_id == activity.id).map(link => link.place_id).includes(item.id))));
        fullPerson.value.push(new FullPerson(person, fullActivity, bCareer, bRank));
    });
}

function filterSearch() {
    if (search.value === "") return fullPerson.value;
    const array: FullPerson[] = [];

    fullPerson.value.forEach(person => {
        if (person.person.surname.toLocaleLowerCase().includes(search.value.toLocaleLowerCase())) {
            array.push(person);
            return;
        }
        if (person.person.name.toLocaleLowerCase().includes(search.value.toLocaleLowerCase())) {
            array.push(person);
            return;
        }
        if (person.person.patronymic.toLocaleLowerCase().includes(search.value.toLocaleLowerCase())) {
            array.push(person);
            return;
        }
        if (person.person.date_birth.toLocaleLowerCase().includes(search.value.toLocaleLowerCase())) {
            array.push(person);
            return;
        }
        if (person.person.religion.toLocaleLowerCase().includes(search.value.toLocaleLowerCase())) {
            array.push(person);
            return;
        }
        if (person.person.origin.toLocaleLowerCase().includes(search.value.toLocaleLowerCase())) {
            array.push(person);
            return;
        }
        if (person.person.level_education.toLocaleLowerCase().includes(search.value.toLocaleLowerCase())) {
            array.push(person);
            return;
        }
        if (person.person.educational_institution.toLocaleLowerCase().includes(search.value.toLocaleLowerCase())) {
            array.push(person);
            return;
        }
        if (person.person.location_educational_institution.toLocaleLowerCase().includes(search.value.toLocaleLowerCase())) {
            array.push(person);
            return;
        }
        if (person.person.property.toLocaleLowerCase().includes(search.value.toLocaleLowerCase())) {
            array.push(person);
            return;
        }
        if (person.person.awards.toLocaleLowerCase().includes(search.value.toLocaleLowerCase())) {
            array.push(person);
            return;
        }
        if (person.person.salary.toLocaleLowerCase().includes(search.value.toLocaleLowerCase())) {
            array.push(person);
            return;
        }
        if (person.person.marital_status.toLocaleLowerCase().includes(search.value.toLocaleLowerCase())) {
            array.push(person);
            return;
        }
        person.rank.forEach(rank => {
            if (rank.degree.toLocaleLowerCase().includes(search.value.toLocaleLowerCase())) {
                if (!array.includes(person)) array.push(person);
                return;
            }
            if (rank.end_date.toLocaleLowerCase().includes(search.value.toLocaleLowerCase())) {
                if (!array.includes(person)) array.push(person);
                return;
            }
            if (rank.name.toLocaleLowerCase().includes(search.value.toLocaleLowerCase())) {
                if (!array.includes(person)) array.push(person);
                return;
            }
            if (rank.start_date.toLocaleLowerCase().includes(search.value.toLocaleLowerCase())) {
                if (!array.includes(person)) array.push(person);
                return;
            }
        })
        person.career.forEach(career => {
            if (career.post.toLocaleLowerCase().includes(search.value.toLocaleLowerCase())) {
                if (!array.includes(person)) array.push(person);
                return;
            }
            if (career.end_date.toLocaleLowerCase().includes(search.value.toLocaleLowerCase())) {
                if (!array.includes(person)) array.push(person);
                return;
            }
            if (career.place.toLocaleLowerCase().includes(search.value.toLocaleLowerCase())) {
                if (!array.includes(person)) array.push(person);
                return;
            }
            if (career.start_date.toLocaleLowerCase().includes(search.value.toLocaleLowerCase())) {
                if (!array.includes(person)) array.push(person);
                return;
            }
        })
        person.activity.forEach(activity => {
            if (activity.activity.description.toLocaleLowerCase().includes(search.value.toLocaleLowerCase())) {
                if (!array.includes(person)) array.push(person);
                return;
            }
            activity.place.forEach(place => {
                if (place.description.toLocaleLowerCase().includes(search.value.toLocaleLowerCase())) {
                    if (!array.includes(person)) array.push(person);
                    return;
                }
                if (place.name.toLocaleLowerCase().includes(search.value.toLocaleLowerCase())) {
                    if (!array.includes(person)) array.push(person);
                    return;
                }
            })
        })
    })

    return array;
}

const mounted = onUpdated(() => { size() });

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

    <MapCard v-if="map" :place="place" :readonly="false" :person="filterSearch()" :close="() => map = false"></MapCard>

    <!-- <TestMap :readonly="true" :person="filterSearch()"></TestMap> -->

    <div v-if="forceUpdate"></div>
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
                <Button :src="'/map.svg'" class="x-button-def" style="padding: 5px"
                    :onClick="() => map = true"></Button>
                <!-- <Filter style="margin-left: 5px; margin-right: 10px;">
                    <List>
                        <Item
                            v-for="item in ['Биография', 'Образование', 'Награды', 'Жалование', 'Имущество', 'Семейное положение']"
                            :text="item" :remove="() => { }" />
                    </List>
                    <Dropdown>
                        <Item v-for="item in ['Деятельность', 'Чин', 'Карьера']" :text="item" :width="'100%'" />
                    </Dropdown>
                </Filter> -->
                <Search v-model:value="search" :placeholder="'Поиск по тексту в таблице...'"
                    style="flex: 1; height: 20px; margin-left: auto;">
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
                        <!-- <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr> -->
                        <tr v-for="item in filterSearch()"
                            :ondblclick="() => { card.id = item.person.id; card.disabled = true; }">
                            <BiographyCell :person="item.person" />
                            <EducationCell :value="item.person" />
                            <TextCell :value="item.person.awards" />
                            <TextCell :value="item.person.salary" />
                            <TextCell :value="item.person.property" />
                            <TextCell :value="item.person.marital_status" />
                            <CareerCell :value="item.career" />
                            <RankCell :value="item.rank" />
                            <ActivityCell :place="item.activity" :value="item.activity" />
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