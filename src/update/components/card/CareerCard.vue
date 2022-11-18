<script setup lang="ts">
import { ref, onBeforeMount } from 'vue';

import { Command, Career } from '../../entities/DataBase';

import ButtonGroup from '../buttons/ButtonGroup.vue';
import SelectField from '../fields/SelectField.vue';
import TextField from '../fields/TextField.vue';
import Window from '../windows/Window.vue';
import Footer from '../windows/Footer.vue';
import Button from '../buttons/Button.vue';
import Body from '../windows/Body.vue';

const props = defineProps({
    person_id: { type: Number, required: true },
    id: { type: Number, required: true },

    refresh: { type: Function, required: true },
    close: { type: Function, required: true },

    readonly: { type: Boolean, required: true },
    mask: { type: Boolean, required: true },
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

const career = ref<Career>({ ...Career.instance(), person_id: props.person_id });

const beforeMount = onBeforeMount(() => {
    Command.select<Career>(Career.NAME, { id: props.id }).then(response => {
        if (response == undefined) return;
        if (response.length == 0) return;
        career.value = response[0];
    });
})

function create() {
    Command.insert<Career>(Career.NAME, career.value).then(response => {
        if (response == undefined) return;
        career.value = response;
        props.refresh();
    });
};

function remove() {
    Command.delete<Career>(Career.NAME, career.value.id).then(() => {
        props.refresh();
        props.close();
    });
};

function save() {
    Command.update<Career>(Career.NAME, career.value.id, career.value).then(response => {
        if (response == undefined) return;
        career.value = response;
        props.refresh();
    });
};
</script>

<template>
    <Window :index="2" :mask="mask" :close="props.close" header="Карточка карьеры">

        <Body class="x-body">
            <TextField label="Должность:" :readonly="readonly" v-model:value="career.post" />
            <TextField label="Дата начала:" :readonly="readonly" :type="'date'" v-model:value="career.start_date" />
            <TextField label="Дата окончания:" :readonly="readonly" :type="'date'" v-model:value="career.end_date" />
            <SelectField label="Место:" :disabled="readonly" :options="options" v-model:value="career.place" />
        </Body>

        <Footer v-if="!readonly">
            <ButtonGroup :right="true">
                <Button v-if="career.id != -1" class="x-button" text="Удалить" :onClick="remove"></Button>
            </ButtonGroup>
            <ButtonGroup :left="true">
                <Button v-if="career.id != -1" class="x-button" text="Сохранить" :onClick="save"></Button>
                <Button v-if="career.id == -1" class="x-button" text="Создать" :onClick="create"></Button>
            </ButtonGroup>
        </Footer>

    </Window>
</template>

<style scoped>
.x-button {
    height: 32px;
}

.x-body {
    display: table;
}
</style>