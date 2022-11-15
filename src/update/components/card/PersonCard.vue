<script setup lang="ts">
import type Activity from '@/update/entities/tables/Activity';
import type Career from '@/update/entities/tables/Career';
import type Rank from '@/update/entities/tables/Rank';

import Person from '@/update/entities/tables/Person';

import ButtonGroup from '../buttons/ButtonGroup.vue';
import Window from '../windows/Window.vue';
import Footer from '../windows/Footer.vue';
import Button from '../buttons/Button.vue';
import Section from '../Section.vue';

import TextAreaField from '../fields/TextAreaField.vue';
import SelectField from '../fields/SelectField.vue';
import TextField from '../fields/TextField.vue';
import { ref } from 'vue';
import ItemsField from '../fields/itemsField/ItemsField.vue';

const props = defineProps({
    activity: { type: Array<Activity>, required: true },
    career: { type: Array<Career>, required: true },
    rank: { type: Array<Rank>, required: true },
    person: { type: Person, required: true },

    close: { type: Function, required: true },
    remove: { type: Function },
    save: { type: Function },

    mask: Boolean
});

const educationOptions = ref(["Нет образования", "Начальное образование", "Домашнее образование", "Среднее образование", "Среднее военное образование", "Высшее образование", "Высшее военное образование"]);
const religionOptions = ref(["Православное", "Римско-католическое", "Евангельско-лютеранское", "Иное"]);
const locationOptions = ref(["Неизвестно", "Европейская часть", "Сибирь"]);

const activity = ref(props.activity);
const person = ref(props.person);
const career = ref(props.career);
const rank = ref(props.rank);

</script>

<template>
    <Window :mask="mask" :close="close" header="Карточка личности">
        <Section header="Биография">
            <TextField label="Имя:" />
            <TextField label="Отчество:" />
            <TextField label="Дата рождения:" />
            <SelectField label="Вероисповедание:" :options="religionOptions" />
            <TextField label="Происхождение:" />
        </Section>
        <Section header="Образование">
            <SelectField label="Уровень образования:" :options="educationOptions" />
            <TextField label="Учебное учреждение:" />
            <SelectField label="Место учёбы:" :options="locationOptions" />
        </Section>
        <Section header="Личная информация">
            <TextAreaField label="Имущество:" />
            <TextAreaField label="Награды:" />
            <TextAreaField label="Жалование:" />
            <TextAreaField label="Семейное положение:" />
            <TextAreaField label="Другое:" />
        </Section>
        <Section header="Достижения">
            <ItemsField :value="activity.map(item => item.name)" label="Деятельность:"></ItemsField>
            <ItemsField :value="career.map(item => item.post)" label="Карьера:"></ItemsField>
            <ItemsField :value="rank.map(item => item.name)" label="Чин:"></ItemsField>
        </Section>
        <Footer style="height: 42px;">
            <ButtonGroup :left="true">
                <Button v-if="remove != undefined" :onClick="remove" text="Удалить"
                    style="background-color: rgba(255, 169, 169, 0.5);" />
            </ButtonGroup>
            <ButtonGroup :right="true">
                <Button v-if="remove != undefined" :onClick="save" text="Сохранить"
                    style="background-color: rgba(169, 255, 169, 0.5);" />
            </ButtonGroup>
        </Footer>
    </Window>
</template>

<style>

</style>