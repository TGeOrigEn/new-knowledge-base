<script setup lang="ts">
import Button from '../../buttons/Button.vue';
import Search from '../../fields/viewPanel/Search.vue'
import Filter from '../../fields/viewPanel/Filter.vue'
import Item from '../../fields/list/Item.vue';
import List from '../../fields/list/List.vue';
import Dropdown from '../../fields/viewPanel/Dropdown.vue';
import Header from '../Header.vue';
import { size } from '@/update/entities/table';
import router from '@/update/entities/router';
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
import BiographyFilterCard from '../../card/filters/BiographyFilterCard.vue';

import { TextFilter, CareerFilter, PlaceFilter, RankFilter, EducationFilter, BiographyFilter } from '@/update/entities/Filter'
import MapCard from '../../card/MapCard.vue';
import TextFilterCard from '../../card/filters/TextFilterCard.vue';
import EducationFilterCard from '../../card/filters/EducationFilterCard.vue';
import CareerFilterCard from '../../card/filters/CareerFilterCard.vue';
import RankFilterCard from '../../card/filters/RankFilterCard.vue';
import PlaceFilterCard from '../../card/filters/PlaceFilterCard.vue';
import AuthorizationCard from '../../card/AuthorizationCard.vue';
import AlertCard from '../../card/AlertCard.vue';
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

    rank.value.forEach(item => {
        item.end_date = dateChange(item.end_date);
        item.start_date = dateChange(item.start_date);
    });

    career.value.forEach(item => {
        item.end_date = dateChange(item.end_date);
        item.start_date = dateChange(item.start_date);
    });

    fullPerson.value = [];
    person.value.forEach(person => {
        const bActivity = activity.value.filter(activity => activity.person_id == person.id);
        const bCareer = career.value.filter(career => career.person_id == person.id);
        const bRank = rank.value.filter(rank => rank.person_id == person.id);
        const fullActivity = bActivity.map(activity => new FullActivity(activity, place.value.filter(item => link.value.filter(link => link.activity_id == activity.id).map(link => link.place_id).includes(item.id))));
        fullPerson.value.push(new FullPerson(person, fullActivity, bCareer, bRank));
    });

    items.value = Array.from(fullPerson.value);

    filterSearch().then(e => { items.value = e; page.value = 1; });
}

async function filterSearch() {


    const s = Array.from(fullPerson.value);
    const array: FullPerson[] = [];

    if (search.value === "") return s.filter(person => filter(person));

    s.filter(person => filter(person)).forEach(person => {
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
                if (array.includes(person)) array.push(person);
                return;
            }
            if (rank.end_date.toLocaleLowerCase().includes(search.value.toLocaleLowerCase())) {
                if (array.includes(person)) array.push(person);
                return;
            }
            if (rank.name.toLocaleLowerCase().includes(search.value.toLocaleLowerCase())) {
                if (array.includes(person)) array.push(person);
                return;
            }
            if (rank.start_date.toLocaleLowerCase().includes(search.value.toLocaleLowerCase())) {
                if (array.includes(person)) array.push(person);
                return;
            }
        })
        person.career.forEach(career => {
            if (career.post.toLocaleLowerCase().includes(search.value.toLocaleLowerCase())) {
                if (array.includes(person)) array.push(person);
                return;
            }
            if (career.end_date.toLocaleLowerCase().includes(search.value.toLocaleLowerCase())) {
                if (array.includes(person)) array.push(person);
                return;
            }
            if (career.place.toLocaleLowerCase().includes(search.value.toLocaleLowerCase())) {
                if (array.includes(person)) array.push(person);
                return;
            }
            if (career.start_date.toLocaleLowerCase().includes(search.value.toLocaleLowerCase())) {
                if (array.includes(person)) array.push(person);
                return;
            }
        })
        person.activity.forEach(activity => {
            if (activity.activity.description.toLocaleLowerCase().includes(search.value.toLocaleLowerCase())) {
                if (array.includes(person)) array.push(person);
                return;
            }
            activity.place.forEach(place => {
                // if (place.description.toLocaleLowerCase().includes(search.value.toLocaleLowerCase())) {
                //     if (!array.includes(person)) array.push(person);
                //     return;
                // }
                if (place.name.toLocaleLowerCase().includes(search.value.toLocaleLowerCase())) {
                    if (array.includes(person)) array.push(person);
                    return;
                }
            })
        })
    })

    return array;
}

function showPage() {

    const s = Array.from(items.value).slice(page.value * 10 - 10, page.value * 10 + 1);

    return s;
}

function filter(person: FullPerson): boolean {
    var activity = true;
    var biography = true;
    var career = true;
    var education = true;
    var rank = true;
    var marital_status = true;
    var salary = true;
    var awards = true;
    var property = true;
    var place = false;

    if (propertyFilter.value != undefined) {
        if (propertyFilter.value.contains.length != 0) {
            property = person.person.property.toLocaleLowerCase().includes(propertyFilter.value.contains.toLocaleLowerCase());
        } else if (propertyFilter.value.equals.length != 0) property = person.person.property.toLocaleLowerCase() === propertyFilter.value.equals.toLocaleLowerCase();
    }

    if (awardsFilter.value != undefined) {
        if (awardsFilter.value.contains.length != 0) {
            property = person.person.awards.toLocaleLowerCase().includes(awardsFilter.value.contains.toLocaleLowerCase());
        } else if (awardsFilter.value.equals.length != 0) property = person.person.awards.toLocaleLowerCase() === awardsFilter.value.equals.toLocaleLowerCase();
    }

    if (salaryFilter.value != undefined) {
        if (salaryFilter.value.contains.length != 0) {
            salary = person.person.salary.toLocaleLowerCase().includes(salaryFilter.value.contains.toLocaleLowerCase());
        } else if (salaryFilter.value.equals.length != 0) salary = person.person.salary.toLocaleLowerCase() === salaryFilter.value.equals.toLocaleLowerCase();
    }

    if (marital_statusFilter.value != undefined) {
        if (marital_statusFilter.value.contains.length != 0) {
            marital_status = person.person.marital_status.toLocaleLowerCase().includes(marital_statusFilter.value.contains.toLocaleLowerCase());
        } else if (marital_statusFilter.value.equals.length != 0) marital_status = person.person.marital_status.toLocaleLowerCase() === marital_statusFilter.value.equals.toLocaleLowerCase();
    }

    if (activityFilter.value != undefined) {
        if (person.activity.length == 0) return false;

        if (activityFilter.value.contains.length != 0) {
            activity = person.activity.filter(item => item.activity.description.toLocaleLowerCase().includes(activityFilter.value!.contains.toLocaleLowerCase())).length != 0;
        } else if (activityFilter.value.equals.length != 0)
            activity = person.activity.filter(item => item.activity.description.toLocaleLowerCase().includes(activityFilter.value!.equals.toLocaleLowerCase())).length != 0;
    }

    career = fCareerFilter(person.career);
    rank = fRankFilter(person.rank);



    biography = fBiographyFilter(person.person);
    education = fEducationFilter(person.person);

    if (placeFilter.value != undefined) {
        if (person.activity.length == 0) return false;
        for (var i = 0; i < person.activity.length; i++) {
            if (fPlaceFilter(person.activity[i].place))
                place = true;
        }
    } else place = true;

    return activity && biography && place && career && education && rank && marital_status && salary && awards && property;
}

function fCareerFilter(career: Career[]) {
    if (careerFilter.value != undefined) {

        if (career.length == 0) return false;

        if (careerFilter.value.contains.post.length != 0) {

            if (career.filter(item => item.post.toLocaleLowerCase().includes(careerFilter.value!.contains.post.toLocaleLowerCase())).length == 0)
                return false;

        } else if (careerFilter.value.equals.post.length != 0)
            if (career.filter(item => item.post.toLocaleLowerCase() === (careerFilter.value!.equals.post.toLocaleLowerCase())).length == 0)
                return false;

        if (careerFilter.value!.equals.end_date.length != 0)
            if (career.filter(item => {
                var s = convertToDate(item.end_date);
                var d = convertToDate(dateChange(careerFilter.value!.equals.end_date))!;
                if (s == undefined) return false;
                return s <= d;
            }).length == 0)
                return false;

        if (careerFilter.value!.equals.start_date.length != 0)
        if (career.filter(item => {
                var s = convertToDate(item.start_date);
                var d = convertToDate(dateChange(careerFilter.value!.equals.start_date))!;
                if (s == undefined) return false;
                return s >= d;
            }).length == 0)
                return false;

        if (careerFilter.value!.equals.place.length != 0)
            if (career.filter(item => item.place.toLocaleLowerCase() === (careerFilter.value!.equals.place.toLocaleLowerCase())).length == 0)
                return false;
    }
    return true;
}

function fRankFilter(rank: Rank[]) {
    if (rankFilter.value != undefined) {

        if (rank.length == 0) return false;

        if (rankFilter.value.contains.name.length != 0) {
            if (rank.filter(item => item.name.toLocaleLowerCase().includes(rankFilter.value!.contains.name.toLocaleLowerCase())).length == 0)
                return false;
        } else if (rankFilter.value.equals.name.length != 0)
            if (rank.filter(item => item.name.toLocaleLowerCase() === (rankFilter.value!.equals.name.toLocaleLowerCase())).length == 0)
                return false;

        if (rankFilter.value!.equals.end_date.length != 0)
        if (rank.filter(item => {
                var s = convertToDate(item.end_date);
                var d = convertToDate(dateChange(rankFilter.value!.equals.end_date))!;
                if (s == undefined) return false;
                return s <= d;
            }).length == 0)
                return false;

        if (rankFilter.value!.equals.start_date.length != 0)
        if (rank.filter(item => {
                var s = convertToDate(item.start_date);
                var d = convertToDate(dateChange(rankFilter.value!.equals.start_date))!;
                if (s == undefined) return false;
                return s >= d;
            }).length == 0)
                return false;

        if (rankFilter.value!.equals.degree.length != 0)
            if (rank.filter(item => item.degree.toLocaleLowerCase() === (rankFilter.value!.equals.degree.toLocaleLowerCase())).length == 0)
                return false;
    }
    return true;
}

function fPlaceFilter(rank: Place[]) {
    if (placeFilter.value != undefined) {
        if (placeFilter.value.contains.name.length != 0) {
            if (rank.filter(item => item.name.toLocaleLowerCase().includes(placeFilter.value!.contains.name.toLocaleLowerCase())).length == 0)
                return false;
        } else if (placeFilter.value.equals.name.length != 0)
            if (rank.filter(item => item.name.toLocaleLowerCase() === (placeFilter.value!.equals.name.toLocaleLowerCase())).length == 0)
                return false;

        if (placeFilter.value.contains.description.length != 0) {
            if (rank.filter(item => item.description.toLocaleLowerCase().includes(placeFilter.value!.contains.description.toLocaleLowerCase())).length == 0)
                return false;
        } else if (placeFilter.value.equals.description.length != 0)
            if (rank.filter(item => item.description.toLocaleLowerCase() === (placeFilter.value!.equals.description.toLocaleLowerCase())).length == 0)
                return false;
    }
    return true;
}

function fEducationFilter(person: Person) {
    if (educationFilter.value != undefined) {
        if (educationFilter.value.contains.educational_institution.length != 0) {
            if (!person.educational_institution.toLocaleLowerCase().includes(educationFilter.value!.contains.educational_institution.toLocaleLowerCase()))
                return false;
        } else if (educationFilter.value.equals.educational_institution.length != 0)
            if (person.educational_institution.toLocaleLowerCase() !== (educationFilter.value!.equals.educational_institution.toLocaleLowerCase()))
                return false;

        if (educationFilter.value!.equals.level_education.length != 0)
            if (person.level_education.toLocaleLowerCase() !== (educationFilter.value!.equals.level_education.toLocaleLowerCase()))
                return false;

        if (educationFilter.value!.equals.location_educational_institution.length != 0)
            if (person.location_educational_institution.toLocaleLowerCase() !== educationFilter.value!.equals.location_educational_institution.toLocaleLowerCase())
                return false;
    }

    return true;
}

function fBiographyFilter(person: Person) {
    if (biographyFilter.value != undefined) {

        if (biographyFilter.value.contains.name.length != 0) {
            if (!person.name.toLocaleLowerCase().includes(biographyFilter.value!.contains.name.toLocaleLowerCase()))
                return false;
        } else if (biographyFilter.value.equals.name.length != 0)
            if (person.name.toLocaleLowerCase() !== (biographyFilter.value!.equals.name.toLocaleLowerCase()))
                return false;

        if (biographyFilter.value.contains.date_birth.length != 0) {
            if (!person.date_birth.toLocaleLowerCase().includes(biographyFilter.value!.contains.date_birth.toLocaleLowerCase()))
                return false;
        } else if (biographyFilter.value.equals.date_birth.length != 0)
            if (person.date_birth.toLocaleLowerCase() !== (biographyFilter.value!.equals.date_birth.toLocaleLowerCase()))
                return false;

        if (biographyFilter.value.contains.origin.length != 0) {
            if (!person.origin.toLocaleLowerCase().includes(biographyFilter.value!.contains.origin.toLocaleLowerCase()))
                return false;
        } else if (biographyFilter.value.equals.origin.length != 0)
            if (person.origin.toLocaleLowerCase() !== (biographyFilter.value!.equals.origin.toLocaleLowerCase()))
                return false;

        if (biographyFilter.value.contains.patronymic.length != 0) {
            if (!person.patronymic.toLocaleLowerCase().includes(biographyFilter.value!.contains.patronymic.toLocaleLowerCase()))
                return false;
        } else if (biographyFilter.value.equals.patronymic.length != 0)
            if (person.patronymic.toLocaleLowerCase() !== (biographyFilter.value!.equals.patronymic.toLocaleLowerCase()))
                return false;

        if (biographyFilter.value.contains.surname.length != 0) {
            if (!person.surname.toLocaleLowerCase().includes(biographyFilter.value!.contains.surname.toLocaleLowerCase()))
                return false;
        } else if (biographyFilter.value.equals.surname.length != 0)
            if (person.surname.toLocaleLowerCase() !== biographyFilter.value!.equals.surname.toLocaleLowerCase())
                return false;

        if (biographyFilter.value!.equals.religion.length != 0)
            if (person.religion.toLocaleLowerCase() !== biographyFilter.value!.equals.religion.toLocaleLowerCase())
                return false;
    }
    return true;
}

const verified = ref(false);

const mounted = onUpdated(async () => {
    size();
    verified.value = await Command.verified();
});

const activityFilter = ref<TextFilter | undefined>();
const biographyFilter = ref<BiographyFilter | undefined>();
const careerFilter = ref<CareerFilter | undefined>();
const educationFilter = ref<EducationFilter | undefined>();
const rankFilter = ref<RankFilter | undefined>();
const marital_statusFilter = ref<TextFilter | undefined>();
const salaryFilter = ref<TextFilter | undefined>();
const awardsFilter = ref<TextFilter | undefined>();
const propertyFilter = ref<TextFilter | undefined>();
const placeFilter = ref<PlaceFilter | undefined>();

function init_activityFilter() {
    activityFilter.value = new TextFilter();
}

function init_rankFilter() {
    rankFilter.value = new RankFilter();
}

function init_propertyFilter() {
    propertyFilter.value = new TextFilter();
}

function init_awardsFilter() {
    awardsFilter.value = new TextFilter();
}

function init_salaryFilter() {
    salaryFilter.value = new TextFilter();
}

function init_marital_statusFilter() {
    marital_statusFilter.value = new TextFilter();
}

function init_biographyFilter() {
    biographyFilter.value = new BiographyFilter();
}

function init_careerFilter() {
    careerFilter.value = new CareerFilter();
}

function init_educationFilter() {
    educationFilter.value = new EducationFilter();
}

function init_placeFilter() {
    placeFilter.value = new PlaceFilter();
}

const displayed = ref({
    title: "",
    activityFilter: false,
    biographyFilter: false,
    careerFilter: false,
    educationFilter: false,
    rankFilter: false,
    textFilterState: false,
    placeFilter: false,
    authorizationCard: false,
    alertCard: false,
    textFilter: new TextFilter(),
    remove: () => { },
    close: () => { }
});

function dateChange(e: string): string {
    if (e.length == 0) return "НЕИЗВЕСТНО";

    const zeroPad = (num: number, places: number) => String(num).padStart(places, '0')

    let date = new Date(e);
    let month = date.getMonth();
    let day = date.getDate();
    let year = date.getFullYear();
    return zeroPad(day, 2) + '.' + zeroPad(month + 1, 2) + '.' + zeroPad(year, 4);
}

function exitFromAccount() {
    localStorage.setItem('token', '');
    displayed.value.alertCard = false;
}

async function openAccountWindow() {
    if (await Command.verified())
        displayed.value.alertCard = true;
    else displayed.value.authorizationCard = true;
}

const page = ref(1);

const items = ref<FullPerson[]>([]);

function convertToDate(e: string) {
    if (e.trim() === "НЕИЗВЕСТНО".trim()) return;

    var s = e.split('.').map(s => parseInt(s));

    return new Date(s[2], s[1] - 1, s[0]);
}

</script>

<template>
    <div style="width: 100%; height: 100vh; background-color: #f0f0f0;">
        <AlertCard v-if="displayed.alertCard" :message="'Вы действительнно хотите выйти из аккаунта?'" :mask="true"
            :close="() => displayed.alertCard = false" :exit="exitFromAccount">
        </AlertCard>

        <AuthorizationCard v-if="displayed.authorizationCard" :close="() => displayed.authorizationCard = false">
        </AuthorizationCard>

        <TextFilterCard v-if="displayed.textFilterState" :title="displayed.title" :filter="displayed.textFilter"
            :close="displayed.close" :remove="displayed.remove">
        </TextFilterCard>

        <CareerFilterCard v-if="displayed.careerFilter" :title="displayed.title" :filter="careerFilter!"
            :close="() => { filterSearch().then(e => { items = e; page = 1; }); displayed.close(); }"
            :remove="() => { filterSearch().then(e => { items = e; page = 1; }); displayed.remove(); }">
        </CareerFilterCard>

        <RankFilterCard v-if="displayed.rankFilter" :title="displayed.title" :filter="rankFilter!"
            :close="() => { filterSearch().then(e => { items = e; page = 1; }); displayed.close(); }"
            :remove="() => { filterSearch().then(e => { items = e; page = 1; }); displayed.remove(); }">
        </RankFilterCard>

        <PlaceFilterCard v-if="displayed.placeFilter" :title="displayed.title" :filter="placeFilter!"
            :close="() => { filterSearch().then(e => { items = e; page = 1; }); displayed.close(); }"
            :remove="() => { filterSearch().then(e => { items = e; page = 1; }); displayed.remove(); }">
        </PlaceFilterCard>

        <EducationFilterCard v-if="displayed.educationFilter" :title="displayed.title" :filter="educationFilter!"
            :close="() => { filterSearch().then(e => { items = e; page = 1; }); displayed.close(); }"
            :remove="() => { filterSearch().then(e => { items = e; page = 1; }); displayed.remove(); }">
        </EducationFilterCard>

        <BiographyFilterCard v-if="displayed.biographyFilter" :title="displayed.title" :filter="biographyFilter!"
            :close="() => { filterSearch().then(e => { items = e; page = 1; }); displayed.close(); }"
            :remove="() => { filterSearch().then(e => { items = e; page = 1; }); displayed.remove(); }">>
        </BiographyFilterCard>

        <PersonCard v-if="card.disabled" :readonly="!verified" :id="card.id" :close="() => card.disabled = false">
        </PersonCard>

        <MapCard v-if="map" :place="place" :readonly="!verified" :person="items" :close="() => map = false">
        </MapCard>

        <div v-if="forceUpdate"></div>
        <div style="padding: 5px; z-index: -1000;">
            <div class="nav">
                <div style="padding-left: 10px; font-size: 18px; font-weight: bold">База знаний</div>
                <div style=" margin-left: auto; display: flex;">
                    <router-link :to="'/'"><Button :text="'Главная'"
                            style="padding: 5px; height: 30px; text-align: center;"></Button></router-link>
                    <Button :src="'/info.svg'" class="x-button-def"
                        style=" padding: 5px; width: 30px; height: 30px; flex: 0, 0, 30px;"></Button>
                    <Button :src="'/user.svg'" class="x-button-def" style="width: 30px; height: 30px; flex: 0, 0, 30px;"
                        :onClick="openAccountWindow"></Button>
                </div>
            </div>
        </div>

        <div>
            <div>
                <div style="width: 97vw; margin-left: auto; margin-right: auto; display: flex; align-items: center;">
                    <Button :disabled="!verified" class="x-button-def " :src="'/plus.svg'"
                        :onClick="() => { card.id = -1; card.disabled = true; }"></Button>
                    <Button :src="'/refresh.svg'" class="x-button-def" :onClick="refresh"></Button>
                    <Button :src="'/map.svg'" class="x-button-def" style="padding: 5px"
                        :onClick="() => map = true"></Button>
                    <Filter style="margin-left: 0px; margin-right: 5px;">

                        <Item v-if="biographyFilter != undefined" :readonly="false"
                            :open="() => { displayed.title = 'Фильтр: Биография'; displayed.remove = () => { displayed.biographyFilter = false; biographyFilter = undefined; }; displayed.close = () => displayed.biographyFilter = false; displayed.biographyFilter = true; }"
                            :text="'Биография'"
                            :remove="() => { biographyFilter = undefined; filterSearch().then(e => { items = e; page = 1; }); }" />

                        <Item v-if="educationFilter != undefined" :readonly="false"
                            :open="() => { displayed.title = 'Фильтр: Образование'; displayed.remove = () => { displayed.educationFilter = false; educationFilter = undefined; }; displayed.close = () => displayed.educationFilter = false; displayed.educationFilter = true; }"
                            :text="'Образование'"
                            :remove="() => { educationFilter = undefined; filterSearch().then(e => { items = e; page = 1; }); }" />

                        <Item v-if="awardsFilter != undefined" :readonly="false"
                            :open="() => { displayed.textFilter = awardsFilter!; displayed.title = 'Фильтр: Награды'; displayed.remove = () => { displayed.textFilterState = false; awardsFilter = undefined; }; displayed.close = () => displayed.textFilterState = false; displayed.textFilterState = true; }"
                            :text="'Награды'"
                            :remove="() => { awardsFilter = undefined; filterSearch().then(e => { items = e; page = 1; }); }" />

                        <Item v-if="salaryFilter != undefined" :readonly="false"
                            :open="() => { displayed.textFilter = salaryFilter!; displayed.title = 'Фильтр: Жалование'; displayed.remove = () => { displayed.textFilterState = false; salaryFilter = undefined; }; displayed.close = () => displayed.textFilterState = false; displayed.textFilterState = true; }"
                            :text="'Жалование'"
                            :remove="() => { salaryFilter = undefined; filterSearch().then(e => { items = e; page = 1; }); }" />

                        <Item v-if="propertyFilter != undefined" :readonly="false"
                            :open="() => { displayed.textFilter = propertyFilter!; displayed.title = 'Фильтр: Имущество'; displayed.remove = () => { displayed.textFilterState = false; propertyFilter = undefined; }; displayed.close = () => displayed.textFilterState = false; displayed.textFilterState = true; }"
                            :text="'Имущество'"
                            :remove="() => { propertyFilter = undefined; filterSearch().then(e => { items = e; page = 1; }); }" />

                        <Item v-if="marital_statusFilter != undefined" :readonly="false"
                            :open="() => { displayed.textFilter = marital_statusFilter!; displayed.title = 'Фильтр: Семейное положение'; displayed.remove = () => { displayed.textFilterState = false; marital_statusFilter = undefined; }; displayed.close = () => displayed.textFilterState = false; displayed.textFilterState = true; }"
                            :text="'Семейное положение'"
                            :remove="() => { marital_statusFilter = undefined; filterSearch().then(e => { items = e; page = 1; }); }" />

                        <Item v-if="careerFilter != undefined" :readonly="false"
                            :open="() => { displayed.title = 'Фильтр: Карьера'; displayed.remove = () => { displayed.careerFilter = false; careerFilter = undefined; }; displayed.close = () => displayed.careerFilter = false; displayed.careerFilter = true; }"
                            :text="'Карьера'"
                            :remove="() => { careerFilter = undefined; filterSearch().then(e => { items = e; page = 1; }); }" />

                        <Item v-if="rankFilter != undefined" :readonly="false"
                            :open="() => { displayed.title = 'Фильтр: Чин'; displayed.remove = () => { displayed.rankFilter = false; rankFilter = undefined; }; displayed.close = () => displayed.rankFilter = false; displayed.rankFilter = true; }"
                            :text="'Чин'"
                            :remove="() => { rankFilter = undefined; filterSearch().then(e => { items = e; page = 1; }); }" />

                        <Item v-if="activityFilter != undefined" :readonly="false"
                            :open="() => { displayed.textFilter = activityFilter!; displayed.title = 'Фильтр: Деятельность'; displayed.remove = () => { displayed.textFilterState = false; activityFilter = undefined; }; displayed.close = () => displayed.textFilterState = false; displayed.textFilterState = true; }"
                            :text="'Деятельность'"
                            :remove="() => { activityFilter = undefined; filterSearch().then(e => { items = e; page = 1; }); }" />

                        <Item v-if="placeFilter != undefined" :readonly="false"
                            :open="() => { displayed.title = 'Фильтр: Место'; displayed.remove = () => { displayed.placeFilter = false; placeFilter = undefined; }; displayed.close = () => displayed.placeFilter = false; displayed.placeFilter = true; }"
                            :text="'Место'"
                            :remove="() => { placeFilter = undefined; filterSearch().then(e => { items = e; page = 1; }); }" />

                        <Dropdown
                            v-if="activityFilter == undefined || biographyFilter == undefined || careerFilter == undefined || educationFilter == undefined || rankFilter == undefined || marital_statusFilter == undefined || salaryFilter == undefined || awardsFilter == undefined || propertyFilter == undefined || placeFilter == undefined">

                            <Item v-if="biographyFilter == undefined" :readonly="false"
                                :open="() => { init_biographyFilter(); displayed.title = 'Фильтр: Биография'; displayed.remove = () => { displayed.biographyFilter = false; biographyFilter = undefined; }; displayed.close = () => displayed.biographyFilter = false; displayed.biographyFilter = true; }"
                                :text="'Биография'" :width="'100%'" />

                            <Item v-if="educationFilter == undefined" :readonly="false"
                                :open="() => { init_educationFilter(); displayed.title = 'Фильтр: Образование'; displayed.remove = () => { displayed.educationFilter = false; educationFilter = undefined; }; displayed.close = () => displayed.educationFilter = false; displayed.educationFilter = true; }"
                                :text="'Образование'" :width="'100%'" />

                            <Item v-if="awardsFilter == undefined" :readonly="false"
                                :open="() => { init_awardsFilter(); displayed.textFilter = awardsFilter!; displayed.title = 'Фильтр: Награды'; displayed.remove = () => { displayed.textFilterState = false; awardsFilter = undefined; }; displayed.close = () => displayed.textFilterState = false; displayed.textFilterState = true; }"
                                :text="'Награды'" :width="'100%'" />

                            <Item v-if="salaryFilter == undefined" :readonly="false"
                                :open="() => { init_salaryFilter(); displayed.textFilter = salaryFilter!; displayed.title = 'Фильтр: Жалование'; displayed.remove = () => { displayed.textFilterState = false; salaryFilter = undefined; }; displayed.close = () => displayed.textFilterState = false; displayed.textFilterState = true; }"
                                :text="'Жалование'" :width="'100%'" />

                            <Item v-if="propertyFilter == undefined" :readonly="false"
                                :open="() => { init_propertyFilter(); displayed.textFilter = propertyFilter!; displayed.title = 'Фильтр: Имущество'; displayed.remove = () => { displayed.textFilterState = false; propertyFilter = undefined; }; displayed.close = () => displayed.textFilterState = false; displayed.textFilterState = true; }"
                                :text="'Имущество'" :width="'100%'" />

                            <Item v-if="marital_statusFilter == undefined" :readonly="false"
                                :open="() => { init_marital_statusFilter(); displayed.textFilter = marital_statusFilter!; displayed.title = 'Фильтр: Семейное положение'; displayed.remove = () => { displayed.textFilterState = false; marital_statusFilter = undefined; }; displayed.close = () => displayed.textFilterState = false; displayed.textFilterState = true; }"
                                :text="'Семейное положение'" :width="'100%'" />

                            <Item v-if="careerFilter == undefined" :readonly="false"
                                :open="() => { init_careerFilter(); displayed.title = 'Фильтр: Карьера'; displayed.remove = () => { displayed.careerFilter = false; careerFilter = undefined; }; displayed.close = () => displayed.careerFilter = false; displayed.careerFilter = true; }"
                                :text="'Карьера'" :width="'100%'" />

                            <Item v-if="rankFilter == undefined" :readonly="false"
                                :open="() => { init_rankFilter(); displayed.title = 'Фильтр: Чин'; displayed.remove = () => { displayed.rankFilter = false; rankFilter = undefined; }; displayed.close = () => displayed.rankFilter = false; displayed.rankFilter = true; }"
                                :text="'Чин'" :width="'100%'" />

                            <Item v-if="activityFilter == undefined" :readonly="false"
                                :open="() => { init_activityFilter(); displayed.textFilter = activityFilter!; displayed.title = 'Фильтр: Деятельность'; displayed.remove = () => { displayed.textFilterState = false; activityFilter = undefined; }; displayed.close = () => displayed.textFilterState = false; displayed.textFilterState = true; }"
                                :text="'Деятельность'" :width="'100%'" />

                            <Item v-if="placeFilter == undefined" :readonly="false"
                                :open="() => { init_placeFilter(); displayed.title = 'Фильтр: Место'; displayed.remove = () => { displayed.placeFilter = false; placeFilter = undefined; }; displayed.close = () => displayed.placeFilter = false; displayed.placeFilter = true; }"
                                :text="'Место'" :width="'100%'" />

                        </Dropdown>
                    </Filter>
                    <Search v-model:value="search" :placeholder="'Поиск по тексту в таблице...'"
                        style="flex: 1; height: 20px; margin-left: auto;">

                    </Search>
                    <Button :src="'/search.svg'" class="x-button-def"
                        :onClick="() => filterSearch().then(e => { items = e; page = 1; })"></Button>
                </div>
                <div
                    style="margin-top: 5px; background-color: #f8f9fa; border: 1px solid #85858560; max-height: 80vh; min-height: 80vh; width: 97vw; overflow: auto; margin-left: auto; margin-right: auto;">
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
                        <tbody style="width: 100%; display: block; overflow: auto;">
                            <tr v-for="item in showPage()"
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
                <div>
                    <div
                        style="background-color: #f8f9fa; align-items: center;  text-align: center;  justify-content: center;  margin-top: 15px; border: 1px solid #85858560; width: max-content; display: flex; margin-left: auto; margin-right: auto;">
                        <div
                            style="background-color: #f8f9fa;    display: flex; align-items: center; margin-right: auto;">
                            <Button @click="() => { page = 1 }" style="transform:rotate(180deg); padding: 7.5px;"
                                class="x-button-def" src="/double-arrow.svg"></Button>
                            <Button @click="() => { if (page > 1) page-- }" style="transform:rotate(90deg)"
                                class="x-button-def" src="/arrow.svg"></Button>
                            <div>{{ page }} из {{ Math.floor(items.length / 10) == 0 ? 1 : Math.floor(items.length / 10)
                            }}</div>
                            <Button @click="() => { if (page < Math.floor(items.length / 10)) page++ }"
                                style="transform:rotate(270deg)" class="x-button-def" src="/arrow.svg"></Button>
                            <Button
                                @click="() => { page = Math.floor(items.length / 10) == 0 ? 1 : Math.floor(items.length / 10) }"
                                style="transform:rotate(0deg); padding: 7.5px;" class="x-button-def"
                                src="/double-arrow.svg"></Button>
                        </div>
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


.nav {
    align-items: center;
    display: flex;
    flex-direction: row;
    margin: 10px;
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