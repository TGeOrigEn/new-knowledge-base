<script setup lang="ts">
import Place from '../../entities/tables/Place';

import ButtonGroup from '../buttons/ButtonGroup.vue';
import Window from '../windows/Window.vue';
import Body from '../windows/Body.vue';
import Footer from '../windows/Footer.vue';
import Button from '../buttons/Button.vue';

import TextAreaField from '../fields/TextAreaField.vue';
import TextField from '../fields/TextField.vue';
import { ref, onBeforeMount } from 'vue';
import env from '../../entities/settings';
import axios from 'axios';

const props = defineProps({
    id: Number,
    isOpen: Boolean,
    refresh: { type: Function, required: true },
    close: { type: Function, required: true },
    index: { type: Number, default: 3 },
    readonly: Boolean,
    width: String,
    mask: Boolean
});

const beforeMount = onBeforeMount(() => {
    axios.get(`http://${env.SERVER_HOST}:${env.SERVER_PORT}/api/place`, { params: { id: props.id } })
        .then(response => { const value = response.data[0]; if (value == undefined) data.value.place = new Place(Place.EMPTY); else data.value.place = response.data[0] });
})

const data = ref({
    place: new Place(Place.EMPTY)
});

function saveCard() {
    if (data.value.place.id != 0)
        axios.put(`http://${env.SERVER_HOST}:${env.SERVER_PORT}/api/place/${data.value.place.id}`, data.value.place)
            .then(response => { const value = response.data; if (value == undefined) data.value.place = new Place(Place.EMPTY); else { props.refresh(); data.value.place = response.data; } });
    else axios.post(`http://${env.SERVER_HOST}:${env.SERVER_PORT}/api/place`, {
        name: data.value.place.name,
        description: data.value.place.description,
        longitude: data.value.place.longitude,
        latitude: data.value.place.latitude
    })
        .then(response => { const value = response.data; if (value == undefined) data.value.place = new Place(Place.EMPTY); else { props.refresh(); data.value.place = response.data; } });
}

function remove() {
    deleteLink()

}

function deleteLink() {
    axios.get(`http://${env.SERVER_HOST}:${env.SERVER_PORT}/api/activity_place`, { params: { place_id: data.value.place.id } })
        .then(response => {
            response.data.forEach((element: any) => {
                axios.delete(`http://${env.SERVER_HOST}:${env.SERVER_PORT}/api/activity_place/${element.id}`).then(() => props.refresh());
            });
            axios.delete(`http://${env.SERVER_HOST}:${env.SERVER_PORT}/api/place/${data.value.place.id}`)
                .then(response => { const value = response.data; if (value == undefined) data.value.place = new Place(Place.EMPTY); else { props.refresh(); data.value.place = response.data; } });
        });
}

</script>

<template>
    <Window :index="index" :width="width" :mask="mask" :close="() => { props.refresh(); props.close(); }"
        header="Карточка места">

        <Body style="width: 100%; display: table;">
            <TextAreaField label="Название:" v-model:value="data.place.name" :readonly="readonly" />
            <TextAreaField label="Описание:" v-model:value="data.place.description" :readonly="readonly" />
            <TextField label="Долгота:" v-model:value="data.place.longitude" :readonly="readonly" />
            <TextField label="Широта:" v-model:value="data.place.latitude" :readonly="readonly" />
        </Body>
        <Footer v-if="!readonly" style="height: 42px;">
            <ButtonGroup :right="true">
                <Button v-if="data.place.id != 0" :onClick="() => { remove(); props.close(); }" text="Удалить"
                    style="height: 32px;" />
            </ButtonGroup>
            <ButtonGroup :right="false">
                <Button :onClick="saveCard" text="Сохранить" style="height: 32px;" />
            </ButtonGroup>
        </Footer>
    </Window>
</template>

<style>

</style>