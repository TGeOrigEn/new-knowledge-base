<script setup lang="ts">
import Activity from '@/update/entities/tables/Activity';
import Career from '@/update/entities/tables/Career';
import Rank from '@/update/entities/tables/Rank';
import type Place from '@/update/entities/tables/Place';
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

import ActivityCard from './ActivityCard.vue';
import CareerCard from './CareerCard.vue';
import RankCard from './RankCard.vue';
import Item from '../fields/list/Item.vue';
import AlertCard from './AlertCard.vue';

const props = defineProps({
    person: { type: Person, required: true, default: Person.EMPTY },
    activity: { type: Array<Activity>, required: true, default: [] },
    career: { type: Array<Career>, required: true, default: [] },
    place: { type: Array<Place>, required: true, default: [] },
    link: { type: Array<Link>, required: true, default: [] },
    rank: { type: Array<Rank>, required: true, default: [] },

    remove: { type: Function, required: true },
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

    console.log(data.value);
})

const data = ref({
    activity: props.activity,
    person: props.person,
    career: props.career,
    place: props.place,
    rank: props.rank,
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

function close() {
    if (JSON.stringify(props.person) !== JSON.stringify(data.value.person)) {
        show.value.alert = true;
        data.value.mask = false;
    }
}
</script>

<template>
    <AlertCard v-if="show.alert" :close="() => { show.alert = false; data.mask = true; }" :mask="show.alert"
        :save="() => { }" :accept="() => { }" :message="'Вы не сохранили карточку.\n Закрыть карточку?'">
    </AlertCard>
    <ActivityCard :readonly="readonly" :link="link" :place="place" :width="'450px'" v-if="show.activity" :mask="true"
        :close="() => { show.activity = false; data.mask = true; }" :activity="select.activity" />
    <CareerCard :readonly="readonly" v-if="show.career" :mask="true"
        :close="() => { show.career = false; data.mask = true; }" :career="select.career" />
    <RankCard :readonly="readonly" v-if="show.rank" :mask="true" :close="() => { show.rank = false; data.mask = true; }"
        type :rank="select.rank" />
    <Window :width="width" :mask="data.mask" :close="close" header="Карточка личности">

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
                <TextAreaField label="Имущество:" v-model:value="data.person.property" 
                    :readonly="readonly" />
                <TextAreaField label="Награды:" v-model:value="data.person.awards" 
                    :readonly="readonly" />
                <TextAreaField label="Жалование:" v-model:value="data.person.salary" 
                    :readonly="readonly" />
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
                            :remove="remove" :text="item.post" />
                    </List>
                </DropdownField>

                <DropdownField label="Чин:" :readonly="readonly"
                    :create="() => { data.mask = false; show.rank = true; select.rank = Rank.EMPTY; }">
                    <List>
                        <Item :readonly="readonly" v-for="item in data.rank"
                            :open="() => { data.mask = false; select.rank = item; show.rank = true; }" :remove="remove"
                            :text="item.name" />
                    </List>
                </DropdownField>

                <DropdownField label="Деятельность:" :readonly="readonly"
                    :create="() => { data.mask = false; show.activity = true; select.activity = Activity.EMPTY; }">
                    <List>
                        <Item :readonly="readonly" v-for="item in data.activity"
                            :open="() => { data.mask = false; select.activity = item; show.activity = true; }"
                            :remove="remove" :text="item.description" />
                    </List>
                </DropdownField>

            </Section>
        </Body>
        <Footer v-if="!readonly" style="height: 42px;">
            <ButtonGroup :right="true">
                <Button v-if="person.id != 0" :onClick="remove" text="Удалить" style="height: 32px;" />
            </ButtonGroup>
            <ButtonGroup :right="false">
                <Button :onClick="save" text="Сохранить" style="height: 32px;" />
            </ButtonGroup>
        </Footer>
    </Window>
</template>

<style>

</style>