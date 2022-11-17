<script setup lang="ts">
import Rank from '../../entities/tables/Rank';

import ButtonGroup from '../buttons/ButtonGroup.vue';
import Window from '../windows/Window.vue';
import Body from '../windows/Body.vue';
import Footer from '../windows/Footer.vue';
import Button from '../buttons/Button.vue';
import AlertCard from './AlertCard.vue';
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

const options = ref(["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII", "XIII", "XIV"]);

const data = ref({
    rank: new Rank(Rank.EMPTY),
    mask: props.mask
});

const beforeMount = onBeforeMount(() => {
    axios.get(`http://${env.SERVER_HOST}:${env.SERVER_PORT}/api/rank`, { params: { id: props.id } })
        .then(response => { const value = response.data[0]; if (value == undefined) data.value.rank = new Rank(Rank.EMPTY); else data.value.rank = response.data[0] });
})

const show = ref(false);

function saveCard() {
    if (data.value.rank.id != 0)
        axios.put(`http://${env.SERVER_HOST}:${env.SERVER_PORT}/api/rank/${data.value.rank.id}`, data.value.rank)
            .then(response => { const value = response.data; if (value == undefined) data.value.rank = new Rank(Rank.EMPTY); else { props.refresh(); data.value.rank = response.data; } });
    else axios.post(`http://${env.SERVER_HOST}:${env.SERVER_PORT}/api/rank`, {
        person_id: props.person_id,
        start_date: data.value.rank.start_date,
        end_date: data.value.rank.end_date,
        degree: data.value.rank.degree,
        name: data.value.rank.name
    })
        .then(response => { const value = response.data; if (value == undefined) data.value.rank = new Rank(Rank.EMPTY); else { props.refresh(); data.value.rank = response.data; } });
}

function remove() {
    axios.delete(`http://${env.SERVER_HOST}:${env.SERVER_PORT}/api/rank/${data.value.rank.id}`)
        .then(response => { const value = response.data; if (value == undefined) data.value.rank = new Rank(Rank.EMPTY); else { props.refresh(); data.value.rank = response.data; } });
}
</script>

<template>

    <AlertCard v-if="show" :close="() => { show = false; data.mask = true; }" :mask="show" :save="() => { }"
        :accept="close" :message="'Вы не сохранили карточку.\n Закрыть карточку?'">
    </AlertCard>

    <Window :index="index" :width="width" :mask="mask" :close="() => { props.refresh(); props.close(); }"
        header="Карточка чина">

        <Body style="width: 100%; display: table;">
            <TextField label="Название:" v-model:value="data.rank.name" :readonly="readonly" />
            <TextField label="Дата начала:" v-model:value="data.rank.start_date" :readonly="readonly" :type="'date'" />
            <TextField label="Дата окончания:" v-model:value="data.rank.end_date" :readonly="readonly" :type="'date'" />
            <SelectField label="Степень:" v-model:value="data.rank.degree" :disabled="readonly" :options="options" />
        </Body>
        <Footer v-if="!readonly" style="height: 42px;">
            <ButtonGroup :right="true">
                <Button v-if="data.rank.id != 0" :onClick="() => { remove(); props.close(); }" text="Удалить"
                    style="height: 32px;" />
            </ButtonGroup>
            <ButtonGroup :right="false">
                <Button :onClick="() => { saveCard(); props.refresh(); }" text="Сохранить" style="height: 32px; " />
            </ButtonGroup>
        </Footer>
    </Window>
</template>

<style>

</style>