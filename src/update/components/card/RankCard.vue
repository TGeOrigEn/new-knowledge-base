<script setup lang="ts">
import { ref, onBeforeMount } from 'vue';

import { Command, Rank } from '../../entities/DataBase';

import ButtonGroup from '../buttons/ButtonGroup.vue';
import SelectField from '../fields/SelectField.vue';
import TextField from '../fields/TextField.vue';
import Footer from '../windows/Footer.vue';
import Button from '../buttons/Button.vue';
import Window from '../windows/Window.vue';
import Body from '../windows/Body.vue';

const props = defineProps({
    person_id: { type: Number, required: true },
    id: { type: Number, default: -1 },

    refresh: { type: Function, required: true },
    close: { type: Function, required: true },

    readonly: { type: Boolean, required: true },
    mask: { type: Boolean, required: true },
});

const options = ref(["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII", "XIII", "XIV"]);

const rank = ref<Rank>({ ...Rank.instance(), person_id: props.person_id });

const mask = ref<Boolean>(props.mask);

const beforeMount = onBeforeMount(() => {
    Command.select<Rank>(Rank.NAME, { id: props.id }).then(response => {
        if (response == undefined) return;
        if (response.length == 0) return;
        rank.value = response[0];
    });
});

function remove() {
    Command.delete<Rank>(Rank.NAME, rank.value.id).then(() => {
        props.refresh();
        props.close();
    });
};

function save() {
    Command.update<Rank>(Rank.NAME, rank.value.id, rank.value).then(response => {
        if (response == undefined) return;
        rank.value = response;
        props.refresh();
    });
};

function create() {
    Command.insert<Rank>(Rank.NAME, rank.value).then(response => {
        if (response == undefined) return;
        rank.value = response;
        props.refresh();
    });
};
</script>

<template>
    <Window :index="2" :mask="mask" :close="props.close" header="Карточка чина">

        <Body class="x-dody">
            <TextField label="Название:" v-model:value="rank.name" :readonly="readonly" />
            <TextField label="Дата начала:" v-model:value="rank.start_date" :readonly="readonly" :type="'date'" />
            <TextField label="Дата окончания:" v-model:value="rank.end_date" :readonly="readonly" :type="'date'" />
            <SelectField label="Степень:" v-model:value="rank.degree" :disabled="readonly" :options="options" />
        </Body>

        <Footer v-if="!readonly">
            <ButtonGroup :right="true">
                <Button v-if="rank.id != -1" class="x-button" text="Удалить" :onClick="remove" />
            </ButtonGroup>
            <ButtonGroup :left="true">
                <Button v-if="rank.id != -1" class="x-button" text="Сохранить" :onClick="save"></Button>
                <Button v-if="rank.id == -1" class="x-button" text="Создать" :onClick="create"></Button>
            </ButtonGroup>
        </Footer>

    </Window>
</template>

<style scoped>
.x-button {
    height: 32px;
}

.x-dody {
    width: 100%;
    display: table;
}
</style>