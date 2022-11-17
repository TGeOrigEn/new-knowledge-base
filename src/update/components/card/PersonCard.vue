<script setup lang="ts">
import Activity from '@/update/entities/tables/Activity';
import Career from '@/update/entities/tables/Career';
import Rank from '@/update/entities/tables/Rank';
import Place from '@/update/entities/tables/Place';
import type Link from '@/update/entities/tables/Link';

import Person from '@/update/entities/tables/Person';

import ButtonGroup from '../buttons/ButtonGroup.vue';
import Window from '../windows/Window.vue';
import Body from '../windows/Body.vue';
import Footer from '../windows/Footer.vue';
import Button from '../buttons/Button.vue';
import Section from '../Section.vue';

import TextAreaField from '../fields/TextAreaField.vue';
import SelectField from '../fields/SelectField.vue';
import TextField from '../fields/TextField.vue';
import { ref, onUpdated, onBeforeUnmount, onBeforeMount } from 'vue';
import DropdownField from '../fields/dropdown/DropdownField.vue';
import List from '../fields/list/List.vue';
import env from '../../entities/settings'

import ActivityCard from './ActivityCard.vue';
import CareerCard from './CareerCard.vue';
import RankCard from './RankCard.vue';
import Item from '../fields/list/Item.vue';
import AlertCard from './AlertCard.vue';
import axios from 'axios';

const props = defineProps({
    id: Number,
    refresh: { type: Function, required: true },
    close: { type: Function, required: true },

    readonly: Boolean,
    mask: Boolean,
    width: String
});

const educationOptions = ref(["Нет образования", "Начальное образование", "Домашнее образование", "Среднее образование", "Среднее военное образование", "Высшее образование", "Высшее военное образование"]);
const religionOptions = ref(["Православное", "Римско-католическое", "Евангельско-лютеранское", "Иное"]);
const locationOptions = ref(["Неизвестно", "Европейская часть", "Сибирь"]);

const beforeMount = onBeforeMount(() => {
    axios.get(`http://${env.SERVER_HOST}:${env.SERVER_PORT}/api/person`, { params: { id: props.id } })
        .then(response => { const value = response.data[0]; if (value == undefined) data.value.person = new Person(Person.EMPTY); else data.value.person = response.data[0]; });
    axios.get(`http://${env.SERVER_HOST}:${env.SERVER_PORT}/api/activity`, { params: { person_id: props.id } })
        .then(response => data.value.activity = response.data);
    axios.get(`http://${env.SERVER_HOST}:${env.SERVER_PORT}/api/career`, { params: { person_id: props.id } })
        .then(response => data.value.career = response.data);
    axios.get(`http://${env.SERVER_HOST}:${env.SERVER_PORT}/api/rank`, { params: { person_id: props.id } })
        .then(response => data.value.rank = response.data);
    console.log(data.value);
})

const data = ref({
    activity: [Activity.EMPTY],
    person: Person.EMPTY,
    career: [Career.EMPTY],
    rank: [Rank.EMPTY],
    mask: true
});

const select = ref({
    activity: Activity.EMPTY,
    career: Career.EMPTY,
    rank: Rank.EMPTY
});

const show = ref({
    activity: false,
    career: false,
    rank: false,
    alert: false
});


function cardRefresh() {
    props.refresh();
    axios.get(`http://${env.SERVER_HOST}:${env.SERVER_PORT}/api/activity`, { params: { person_id: data.value.person.id } })
        .then(response => data.value.activity = response.data);
    axios.get(`http://${env.SERVER_HOST}:${env.SERVER_PORT}/api/career`, { params: { person_id: data.value.person.id } })
        .then(response => data.value.career = response.data);
    axios.get(`http://${env.SERVER_HOST}:${env.SERVER_PORT}/api/rank`, { params: { person_id: data.value.person.id } })
        .then(response => data.value.rank = response.data);
}

function remove() {
    axios.delete(`http://${env.SERVER_HOST}:${env.SERVER_PORT}/api/person/${data.value.person.id}`).then(() => props.refresh());
}

function saveCard() {
    if (data.value.person.id != 0)
        axios.put(`http://${env.SERVER_HOST}:${env.SERVER_PORT}/api/person/${data.value.person.id}`, data.value.person)
            .then(response => { const value = response.data; if (value == undefined) data.value.person = new Person(Person.EMPTY); else { props.refresh(); data.value.person = response.data; } });
    else axios.post(`http://${env.SERVER_HOST}:${env.SERVER_PORT}/api/person`, {
        surname: data.value.person.surname,
        name: data.value.person.name,
        patronymic: data.value.person.patronymic,
        date_birth: data.value.person.date_birth,
        religion: data.value.person.religion,
        origin: data.value.person.origin,
        level_education: data.value.person.level_education,
        educational_institution: data.value.person.educational_institution,
        location_educational_institution: data.value.person.location_educational_institution,
        property: data.value.person.property,
        awards: data.value.person.awards,
        salary: data.value.person.salary,
        marital_status: data.value.person.marital_status,
        other: data.value.person.other
    })
        .then(response => { const value = response.data; if (value == undefined) data.value.person = new Person(Person.EMPTY); else { props.refresh(); data.value.person = response.data; } });
}
</script>

<template>
    <AlertCard v-if="show.alert" :close="() => { show.alert = false; data.mask = true; }" :mask="show.alert"
        :save="() => { }" :accept="() => { }" :message="'Вы не сохранили карточку.\n Закрыть карточку?'">
    </AlertCard>
    <ActivityCard :refresh="cardRefresh" :readonly="readonly" :width="'450px'" v-if="show.activity" :mask="true"
        :close="() => { show.activity = false; data.mask = true; }" :id="select.activity.id"
        :person_id="data.person.id" />
    <CareerCard :refresh="cardRefresh" :readonly="readonly" v-if="show.career" :mask="true"
        :close="() => { show.career = false; data.mask = true; }" :id="select.career.id" :person_id="data.person.id" />
    <RankCard :refresh="cardRefresh" :readonly="readonly" v-if="show.rank" :mask="true"
        :close="() => { show.rank = false; data.mask = true; }" type :id="select.rank.id" :person_id="data.person.id" />
    <Window :width="width" :mask="data.mask" :close="() => { refresh(); close(); }" header="Карточка личности">

        <Body>
            <Section header="Биография">
                <TextField label="Имя:" v-model:value="data.person.name" :readonly="readonly" />
                <TextField label="Фамилия:" v-model:value="data.person.surname" :readonly="readonly" />
                <TextField label="Отчество:" v-model:value="data.person.patronymic" :readonly="readonly" />
                <TextField label="Дата рождения:" v-model:value="data.person.date_birth" :readonly="readonly" />
                <SelectField label="Вероисповедание:" v-model:value="data.person.religion" :disabled="readonly"
                    :options="religionOptions" />
                <TextField label="Происхождение:" v-model:value="data.person.origin" :readonly="readonly" />
            </Section>
            <Section header="Образование">
                <SelectField label="Уровень образования:" v-model:value="data.person.level_education"
                    :disabled="readonly" :options="educationOptions" />
                <TextField label="Учебное учреждение:" v-model:value="data.person.educational_institution"
                    :readonly="readonly" />
                <SelectField label="Место учёбы:" v-model:value="data.person.location_educational_institution"
                    :disabled="readonly" :options="locationOptions" />
            </Section>
            <Section header="Личная информация">
                <TextAreaField label="Имущество:" v-model:value="data.person.property" :readonly="readonly" />
                <TextAreaField label="Награды:" v-model:value="data.person.awards" :readonly="readonly" />
                <TextAreaField label="Жалование:" v-model:value="data.person.salary" :readonly="readonly" />
                <TextAreaField label="Семейное положение:" v-model:value="data.person.marital_status"
                    :readonly="readonly" />
                <TextAreaField label="Другое:" v-model:value="data.person.other" :required="false"
                    :readonly="readonly" />
            </Section>
            <Section header="Достижения" :disabled="data.person.id == 0">

                <DropdownField label="Карьера:" :readonly="readonly"
                    :create="() => { data.mask = false; show.career = true; select.career = Career.EMPTY; }">
                    <List>
                        <Item :readonly="readonly" v-for="item in data.career"
                            :open="() => { data.mask = false; select.career = item; show.career = true; }"
                            :remove="remove" :text="item.post" :removable="false" />
                    </List>
                </DropdownField>

                <DropdownField label="Чин:" :readonly="readonly"
                    :create="() => { select.rank = Rank.EMPTY; data.mask = false; show.rank = true; }">
                    <List>
                        <Item :readonly="readonly" v-for="item in data.rank"
                            :open="() => { data.mask = false; select.rank = item; show.rank = true; }"
                            :remove="() => { }" :text="item.name" :removable="false" />
                    </List>
                </DropdownField>

                <DropdownField label="Деятельность:" :readonly="readonly"
                    :create="() => { data.mask = false; show.activity = true; select.activity = Activity.EMPTY; }">
                    <List>
                        <Item :readonly="readonly" v-for="item in data.activity"
                            :open="() => { data.mask = false; select.activity = item; show.activity = true; }"
                            :remove="() => { }" :text="item.description" :removable="false" />
                    </List>
                </DropdownField>

            </Section>
        </Body>
        <Footer v-if="!readonly" style="height: 42px;">
            <ButtonGroup :right="true">
                <Button v-if="data.person.id != 0" :onClick="() => { remove(); close(); }" text="Удалить"
                    style="height: 32px;" />
            </ButtonGroup>
            <ButtonGroup :right="false">
                <Button :onClick="() => { saveCard(); }" text="Сохранить" style="height: 32px;" />
            </ButtonGroup>
        </Footer>
    </Window>
</template>

<style>

</style>