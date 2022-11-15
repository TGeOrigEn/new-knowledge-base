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

    readonly: Boolean,
    width: String,
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
    <Window :width="width" :mask="mask" :close="close" header="Карточка личности">
        <Section header="Биография">
            <TextField label="Имя:" :readonly="readonly" />
            <TextField label="Отчество:" :readonly="readonly" />
            <TextField label="Дата рождения:" :readonly="readonly" />
            <SelectField label="Вероисповедание:" :disabled="readonly" :options="religionOptions" />
            <TextField label="Происхождение:" :readonly="readonly" />
        </Section>
        <Section header="Образование">
            <SelectField label="Уровень образования:" :disabled="readonly" :options="educationOptions" />
            <TextField label="Учебное учреждение:" :readonly="readonly" />
            <SelectField label="Место учёбы:" :disabled="readonly" :options="locationOptions" />
        </Section>
        <Section header="Личная информация">
            <TextAreaField label="Имущество:" :readonly="readonly" />
            <TextAreaField label="Награды:" :readonly="readonly" />
            <TextAreaField label="Жалование:" :readonly="readonly" />
            <TextAreaField label="Семейное положение:" :readonly="readonly" />
            <TextAreaField label="Другое:" :readonly="readonly" />
        </Section>
        <Section header="Достижения">
            <ItemsField :readonly="readonly" :value="activity == undefined ? ['123'] : activity.map(item => item.name)"
                label="Деятельность:"></ItemsField>
            <ItemsField :readonly="readonly" :value="career == undefined ? [] : career.map(item => item.post)"
                label="Карьера:"></ItemsField>
            <ItemsField :readonly="readonly" :value="rank == undefined ? [] : rank.map(item => item.name)" label="Чин:">
            </ItemsField>
        </Section>
        <Footer style="height: 42px;">
            <ButtonGroup :right="true">
                <Button :onClick="remove" text="Удалить"
                    style="height: 32px; background-color: rgba(255, 169, 169, 0.5);" />
            </ButtonGroup>
            <ButtonGroup :right="false">
                <Button :onClick="save" text="Сохранить"
                    style="height: 32px; background-color: rgba(169, 255, 169, 0.5);" />
            </ButtonGroup>
        </Footer>
    </Window>
</template>

<style>

</style>