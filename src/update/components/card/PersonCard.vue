<script setup lang="ts">
import { ref, onBeforeMount } from 'vue';

import { Command, Rank, Career, Activity, Person, Place, Link } from '@/update/entities/DataBase';

import DropdownField from '../fields/dropdown/DropdownField.vue';
import TextAreaField from '../fields/TextAreaField.vue';
import ButtonGroup from '../buttons/ButtonGroup.vue';
import SelectField from '../fields/SelectField.vue';
import TextField from '../fields/TextField.vue';
import ActivityCard from './ActivityCard.vue';
import Window from '../windows/Window.vue';
import Footer from '../windows/Footer.vue';
import List from '../fields/list/List.vue';
import Item from '../fields/list/Item.vue';
import Button from '../buttons/Button.vue';
import CareerCard from './CareerCard.vue';
import Body from '../windows/Body.vue';
import RankCard from './RankCard.vue';
import Section from '../Section.vue';

const props = defineProps({
    id: { type: Number, required: true },
    close: { type: Function, required: true },
    readonly: { type: Boolean, required: true },
});

const educationOptions = ref(["Нет образования", "Начальное образование", "Домашнее образование", "Среднее образование", "Среднее военное образование", "Высшее образование", "Высшее военное образование"]);
const religionOptions = ref(["Православное", "Римско-католическое", "Евангельско-лютеранское", "Иное"]);
const locationOptions = ref(["Неизвестно", "Европейская часть", "Сибирь"]);

const mask = ref(true);

const displayed = ref({
    activity: false,
    career: false,
    rank: false,
});

const selected = ref({
    activity_id: -1,
    career_id: -1,
    rank_id: -1
});

const person = ref<Person>(Person.instance());

const activity = ref<Activity[]>([]);

const career = ref<Career[]>([]);

const place = ref<Place[]>([]);

const link = ref<Link[]>([]);

const rank = ref<Rank[]>([]);

const beforeMount = onBeforeMount(() => {
    Command.select<Activity>(Activity.NAME, { person_id: props.id }).then(response => {
        if (response == undefined) return;
        activity.value = response;
    });

    Command.select<Career>(Career.NAME, { person_id: props.id }).then(response => {
        if (response == undefined) return;
        response.forEach(item => item.start_date = dateChange(item.start_date))
        response.forEach(item => item.end_date = dateChange(item.end_date))
        career.value = response;
    });

    Command.select<Person>(Person.NAME, { id: props.id }).then(response => {
        if (response == undefined) return;
        if (response.length == 0) return;
        person.value = response[0];
    });

    Command.select<Rank>(Rank.NAME, { person_id: props.id }).then(response => {
        if (response == undefined) return;
        response.forEach(item => item.start_date = dateChange(item.start_date))
        response.forEach(item => item.end_date = dateChange(item.end_date))
        rank.value = response;
    });

    Command.select<Link>(Link.NAME).then(response => {
        if (response == undefined) return;
        link.value = response;
    });

    Command.select<Place>(Place.NAME).then(response => {
        if (response == undefined) return;
        place.value = response;
    });
})

function update() {
    Command.select<Activity>(Activity.NAME, { person_id: person.value.id }).then(response => {
        if (response == undefined) return;
        activity.value = response;
    });

    Command.select<Career>(Career.NAME, { person_id: person.value.id }).then(response => {
        if (response == undefined) return;
        response.forEach(item => item.start_date = dateChange(item.start_date))
        response.forEach(item => item.end_date = dateChange(item.end_date))
        career.value = response;
    });

    Command.select<Rank>(Rank.NAME, { person_id: person.value.id }).then(response => {
        if (response == undefined) return;
        response.forEach(item => item.start_date = dateChange(item.start_date))
        response.forEach(item => item.end_date = dateChange(item.end_date))
        rank.value = response;
    });

    Command.select<Link>(Link.NAME).then(response => {
        if (response == undefined) return;
        link.value = response;
    });

    Command.select<Place>(Place.NAME).then(response => {
        if (response == undefined) return;
        place.value = response;
    });
}

function create() {
    Command.insert<Person>(Person.NAME, person.value).then(response => {
        if (response == undefined) return;
        person.value = response;
    });
};

function remove() {
    Command.delete<Person>(Person.NAME, person.value.id).then(() => {
        props.close();
    });
};

function save() {
    Command.update<Person>(Person.NAME, person.value.id, person.value).then(response => {
        if (response == undefined) return;
        person.value = response;
    });
};

function dateChange(e: string): string {
    const zeroPad = (num: number, places: number) => String(num).padStart(places, '0')

    let date = new Date(e);
    let month = date.getMonth();
    let day = date.getDate();
    let year = date.getFullYear();
    return zeroPad(day, 2) + '.' + zeroPad(month + 1, 2) + '.' + zeroPad(year, 4);
}

function filterItems(activity_id: number): string {
    const id: number[] = link.value.filter(link => link.activity_id === activity_id).map(link => link.place_id);
    const s = place.value.filter(place => id.includes(place.id)).map(place => place.name).join(", ");
    return "\nМеста:" + s;
};
</script>

<template>
    <ActivityCard :refresh="update" :readonly="readonly" v-if="displayed.activity" :mask="true"
        :close="() => { displayed.activity = false; mask = true; }" :id="selected.activity_id" :person_id="person.id" />
    <CareerCard :refresh="update" :readonly="readonly" v-if="displayed.career" :mask="true"
        :close="() => { displayed.career = false; mask = true; }" :id="selected.career_id" :person_id="person.id" />
    <RankCard :refresh="update" :readonly="readonly" v-if="displayed.rank" :mask="true"
        :close="() => { displayed.rank = false; mask = true; }" type :id="selected.rank_id" :person_id="person.id" />
    <Window :index="3" :width="'50vw'" :mask="mask" :close="props.close" header="Карточка личности">

        <Body>

            <Section :isOpen="true" header="Биография">
                <TextField label="Имя:" v-model:value="person.name" :readonly="readonly" />
                <TextField label="Фамилия:" v-model:value="person.surname" :readonly="readonly" />
                <TextField label="Отчество:" v-model:value="person.patronymic" :readonly="readonly" />
                <TextField label="Дата рождения:" v-model:value="person.date_birth" :readonly="readonly" />
                <SelectField label="Вероисповедание:" v-model:value="person.religion" :disabled="readonly"
                    :options="religionOptions" />
                <TextField label="Происхождение:" v-model:value="person.origin" :readonly="readonly" />
            </Section>

            <Section :isOpen="true" header="Образование">
                <SelectField label="Уровень образования:" v-model:value="person.level_education" :disabled="readonly"
                    :options="educationOptions" />
                <TextField label="Учебное учреждение:" v-model:value="person.educational_institution"
                    :readonly="readonly" />
                <SelectField label="Место учёбы:" v-model:value="person.location_educational_institution"
                    :disabled="readonly" :options="locationOptions" />
            </Section>

            <Section header="Личная информация">
                <TextAreaField label="Имущество:" v-model:value="person.property" :readonly="readonly" />
                <TextAreaField label="Награды:" v-model:value="person.awards" :readonly="readonly" />
                <TextAreaField label="Жалование:" v-model:value="person.salary" :readonly="readonly" />
                <TextAreaField label="Семейное положение:" v-model:value="person.marital_status" :readonly="readonly" />
                <TextAreaField label="Другое:" v-model:value="person.other" :required="false" :readonly="readonly" />
            </Section>

            <Section :isOpen="true" header="Достижения" :disabled="person.id == -1">
                <DropdownField label="Карьера:" :readonly="readonly"
                    :create="() => { selected.career_id = -1; mask = false; displayed.career = true; }">
                    <List>
                        <Item :readonly="readonly" v-for="item in career"
                            :text="`${item.start_date} - ${item.end_date} : ${item.post}, ${item.place}`"
                            :open="() => { selected.career_id = item.id; mask = false; displayed.career = true; }" />
                    </List>
                </DropdownField>

                <DropdownField label="Чин:" :readonly="readonly"
                    :create="() => { selected.rank_id = -1; mask = false; displayed.rank = true; }">
                    <List>
                        <Item :readonly="readonly" v-for="item in rank"
                            :text="`${item.start_date} - ${item.end_date} : ${item.degree}, ${item.name}`"
                            :open="() => { selected.rank_id = item.id; mask = false; displayed.rank = true; }" />
                    </List>
                </DropdownField>

                <DropdownField label="Деятельность:" :readonly="readonly"
                    :create="() => { selected.activity_id = -1; mask = false; displayed.activity = true; }">
                    <List>
                        <Item :readonly="readonly" v-for="item in activity"
                            :text="`${item.description}${filterItems(item.id)}`"
                            :open="() => { selected.activity_id = item.id; mask = false; displayed.activity = true; }" />
                    </List>
                </DropdownField>
            </Section>

            <Section header="Источники" :disabled="person.id == -1">
                <TextAreaField label="Источники:" v-model:value="person.source" :required="false"
                    :readonly="readonly" />
            </Section>

        </Body>

        <Footer v-if="!readonly">
            <ButtonGroup :right="true">
                <Button v-if="person.id != -1" class="x-button" text="Удалить" :onClick="remove"></Button>
            </ButtonGroup>
            <ButtonGroup :left="true">
                <Button v-if="person.id != -1" class="x-button" text="Сохранить" :onClick="save"></Button>
                <Button v-if="person.id == -1" class="x-button" text="Создать" :onClick="create"></Button>
            </ButtonGroup>
        </Footer>

    </Window>
</template>

<style scoped>
.x-button {
    height: 32px;
}
</style>