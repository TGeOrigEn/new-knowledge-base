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

const props = defineProps({
    career: { type: Career, required: true, default: Career.EMPTY },

    close: { type: Function, required: true },
    remove: { type: Function },
    save: { type: Function },
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
    data.value.career = new Career(props.career);
})

const data = ref({
    career: props.career
});
</script>

<template>
    <Window :index="index" :width="width" :mask="mask" :close="close" header="Карточка карьеры">

        <Body style="width: 100%; display: table;">
            <TextField label="Должность:" v-model:value="data.career.post" :readonly="readonly" />
            <TextField label="Дата начала:" v-model:value="data.career.start_date" :readonly="readonly"
                :type="'date'" />
            <TextField label="Дата окончания:" v-model:value="data.career.end_date" :readonly="readonly"
                :type="'date'" />
            <SelectField label="Место:" v-model:value="data.career.place" :disabled="readonly" :options="options" />
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