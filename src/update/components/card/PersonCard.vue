<script setup lang="ts">
import type Activity from '@/update/entities/tables/Activity';
import type Career from '@/update/entities/tables/Career';
import type Rank from '@/update/entities/tables/Rank';
import type Place from '@/update/entities/tables/Place';

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
import { ref, onBeforeMount } from 'vue';
import ItemsField from '../fields/itemsField/ItemsField.vue';
import RankCard from './RankCard.vue';
import CareerCard from './CareerCard.vue';
import ActivityCard from './ActivityCard.vue';
import PlaceCard from './PlaceCard.vue';

const props = defineProps({
    activity: { type: Array<Activity>, required: true, default: [] },
    career: { type: Array<Career>, required: true, default: [] },
    place: { type: Array<Place>, required: true, default: [] },
    rank: { type: Array<Rank>, required: true, default: [] },
    person: { type: Person, required: true, default: Person.EMPTY },

    remove: { type: Function, required: true },
    close: { type: Function, required: true },
    save: { type: Function, required: true },

    readonly: Boolean,
    mask: Boolean,
    width: String
});

const educationOptions = ref(["Нет образования", "Начальное образование", "Домашнее образование", "Среднее образование", "Среднее военное образование", "Высшее образование", "Высшее военное образование"]);
const religionOptions = ref(["Православное", "Римско-католическое", "Евангельско-лютеранское", "Иное"]);
const locationOptions = ref(["Неизвестно", "Европейская часть", "Сибирь"]);

const beforeMount = onBeforeMount(() => {
    data.value.person = new Person(props.person);
    data.value.activity = [...props.activity];
    data.value.career = [...props.career];
    data.value.place = [...props.place];
    data.value.rank = [...props.rank];
})

const data = ref({
    activity: props.activity,
    person: props.person,
    career: props.career,
    place: props.place,
    rank: props.rank
});
</script>

<template>
    <!-- <PlaceCard :place="data.place[0]"></PlaceCard> -->
    <!-- <ActivityCard :activity="data.activity[0]"></ActivityCard> -->
    <!-- <CareerCard :readonly="false"  :career="data.career[0]"></CareerCard> -->
    <!-- <RankCard :rank="data.rank[0]" ></RankCard> -->
    <Window :width="width" :mask="true" :close="close" header="Карточка личности">

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
                <TextAreaField label="Имущество:" v-model:value="data.person.property" :required="false"
                    :readonly="readonly" />
                <TextAreaField label="Награды:" v-model:value="data.person.awards" :required="false"
                    :readonly="readonly" />
                <TextAreaField label="Жалование:" v-model:value="data.person.salary" :required="false"
                    :readonly="readonly" />
                <TextAreaField label="Семейное положение:" v-model:value="data.person.marital_status" :required="false"
                    :readonly="readonly" />
                <TextAreaField label="Другое:" v-model:value="data.person.other" :required="false"
                    :readonly="readonly" />
            </Section>
            <Section header="Достижения">
                <ItemsField :readonly="readonly" :value="career == undefined ? [] : career.map(item => item.post)"
                    label="Карьера:"></ItemsField>
                <ItemsField :readonly="readonly" :value="rank == undefined ? [] : rank.map(item => item.name)"
                    label="Чин:">
                </ItemsField>
                <ItemsField :readonly="readonly"
                    :value="activity == undefined ? ['123'] : activity.map(item => item.name)" label="Деятельность:">
                </ItemsField>
            </Section>
        </Body>
        <Footer v-if="!readonly" style="height: 42px;">
            <ButtonGroup :right="true">
                <Button :onClick="remove" text="Удалить" style="height: 32px;" />
            </ButtonGroup>
            <ButtonGroup :right="false">
                <Button :onClick="save" text="Сохранить" style="height: 32px;" />
            </ButtonGroup>
        </Footer>
    </Window>
</template>

<style>

</style>