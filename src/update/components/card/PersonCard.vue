<script setup lang="ts">
import Activity from '@/update/entities/tables/Activity';
import type Career from '@/update/entities/tables/Career';
import type Rank from '@/update/entities/tables/Rank';

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
import { onMounted, ref, onBeforeMount } from 'vue';
import ItemsField from '../fields/itemsField/ItemsField.vue';
import { computed } from '@vue/reactivity';

const props = defineProps({
    activity: { type: Array<Activity>, required: true, default: [] },
    career: { type: Array<Career>, required: true, default: [] },
    rank: { type: Array<Rank>, required: true, default: [] },
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

const beforeMount = onBeforeMount(() => {
    data.value.activity = [...props.activity];
    data.value.person = new Person(props.person);
    data.value.career = [...props.career];
    data.value.rank = [...props.rank];
})

const data = ref({
    activity: props.activity,
    person: props.person,
    career: props.career,
    rank: props.rank
});
</script>

<template>
    <Window :width="width" :mask="mask" :close="close" header="Карточка личности">

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
                <TextAreaField label="Другое:" v-model:value="data.person.other" :readonly="readonly" />
            </Section>
            <Section header="Достижения">
                <ItemsField :readonly="readonly"
                    :value="activity == undefined ? ['123'] : activity.map(item => item.name)" label="Деятельность:">
                </ItemsField>
                <ItemsField :readonly="readonly" :value="career == undefined ? [] : career.map(item => item.post)"
                    label="Карьера:"></ItemsField>
                <ItemsField :readonly="readonly" :value="rank == undefined ? [] : rank.map(item => item.name)"
                    label="Чин:">
                </ItemsField>
            </Section>
        </Body>
        <Footer v-if="remove != undefined" style="height: 42px;">
            <ButtonGroup :right="true">
                <Button v-if="remove != undefined" :onClick="remove" text="Удалить"
                    style="height: 32px; background-color: rgba(255, 169, 169, 0.5);" />
            </ButtonGroup>
            <ButtonGroup :right="false">
                <Button v-if="save != undefined" :onClick="save" text="Сохранить"
                    style="height: 32px; background-color: rgba(169, 255, 169, 0.5);" />
            </ButtonGroup>
        </Footer>
    </Window>
</template>

<style>

</style>