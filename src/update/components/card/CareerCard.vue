<script setup lang="ts">
import Career from '../../entities/tables/Career';

import ButtonGroup from '../buttons/ButtonGroup.vue';
import Window from '../windows/Window.vue';
import Body from '../windows/Body.vue';
import Footer from '../windows/Footer.vue';
import Button from '../buttons/Button.vue';
import Section from '../Section.vue';

import SelectField from '../fields/SelectField.vue';
import TextField from '../fields/TextField.vue';
import { ref, onBeforeMount } from 'vue';
import env from '../../entities/settings';
import axios from 'axios';

const props = defineProps({
    id: Number,
    person_id: Number,
    refresh: { type: Function, required: true },
    close: { type: Function, required: true },
    index: { type: Number, default: 2 },
    readonly: Boolean,
    width: String,
    mask: Boolean
});

const options = ref([
    "Главное управление Западной Сибири",
    "Тобольская губерния",
    "Томская губерния",
    "Акмолинская область",
    "Семипалатинская область",
    "Семиреченская область",
    "Степное генерал-губернаторство",
    "Туркестанское генерал-губернаторство",
    "Европейская Россия",
    "Восточная сибирь"]);

const beforeMount = onBeforeMount(() => {
    axios.get(`http://${env.SERVER_HOST}:${env.SERVER_PORT}/api/career`, { params: { id: props.id } })
        .then(response => { const value = response.data[0]; if (value == undefined) data.value.career = new Career(Career.EMPTY); else data.value.career = response.data[0] });
})

const data = ref({
    career: Career.EMPTY
});

function saveCard() {
    if (data.value.career.id != 0)
        axios.put(`http://${env.SERVER_HOST}:${env.SERVER_PORT}/api/career/${data.value.career.id}`, data.value.career)
            .then(response => { const value = response.data; if (value == undefined) data.value.career = new Career(Career.EMPTY); else { props.refresh(); data.value.career = response.data; } });
    else axios.post(`http://${env.SERVER_HOST}:${env.SERVER_PORT}/api/career`, {
        person_id: props.person_id,
        start_date: data.value.career.start_date,
        end_date: data.value.career.end_date,
        post: data.value.career.post,
        place: data.value.career.place
    })
        .then(response => { const value = response.data; if (value == undefined) data.value.career = new Career(Career.EMPTY); else { props.refresh(); data.value.career = response.data; } });
}

function remove() {
    axios.delete(`http://${env.SERVER_HOST}:${env.SERVER_PORT}/api/career/${data.value.career.id}`)
        .then(response => { const value = response.data; if (value == undefined) data.value.career = new Career(Career.EMPTY); else { props.refresh(); data.value.career = response.data; } });
}
</script>

<template>
    <Window :index="index" :width="width" :mask="mask" :close="() => { props.refresh(); props.close(); }"
        header="Карточка карьеры">

        <Body style="display: table;">
            <TextField label="Должность:" v-model:value="data.career.post" :readonly="readonly" />
            <TextField label="Дата начала:" v-model:value="data.career.start_date" :readonly="readonly"
                :type="'date'" />
            <TextField label="Дата окончания:" v-model:value="data.career.end_date" :readonly="readonly"
                :type="'date'" />
            <SelectField label="Место:" v-model:value="data.career.place" :disabled="readonly" :options="options" />
        </Body>
        <Footer v-if="!readonly" style="height: 42px;">
            <ButtonGroup :right="true">
                <Button v-if="data.career.id != 0" :onClick="() => { remove(); props.close(); }" text="Удалить"
                    style="height: 32px;" />
            </ButtonGroup>
            <ButtonGroup :right="false">
                <Button :onClick="() => { saveCard(); props.refresh(); }" text="Сохранить" style="height: 32px;" />
            </ButtonGroup>
        </Footer>
    </Window>
</template>

<style>

</style>