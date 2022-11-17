<script setup lang="ts">
import Activity from '../../entities/tables/Activity';

import ButtonGroup from '../buttons/ButtonGroup.vue';
import Window from '../windows/Window.vue';
import Body from '../windows/Body.vue';
import Footer from '../windows/Footer.vue';
import Button from '../buttons/Button.vue';

import { ref, onBeforeMount } from 'vue';
import DropdownField from '../fields/dropdown/DropdownField.vue';
import PlaceCard from './PlaceCard.vue';
import Place from '@/update/entities/tables/Place';
import Dropdown from '../fields/dropdown/Dropdown.vue';
import List from '../fields/list/List.vue';
import Item from '../fields/list/Item.vue';
import TextAreaField from '../fields/TextAreaField.vue';
import type Link from '@/update/entities/tables/Link';
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

const data = ref({
    activity: new Activity(Activity.EMPTY),
    link: new Array<Link>(),
    place: new Array<Place>(),
    mask: props.mask
});

const show = ref({
    dropdown: false,
    place: false
});

const beforeMount = onBeforeMount(() => {
    axios.get(`http://${env.SERVER_HOST}:${env.SERVER_PORT}/api/activity`, { params: { id: props.id } })
        .then(response => { const value = response.data[0]; if (value == undefined) data.value.activity = new Activity(Activity.EMPTY); else data.value.activity = response.data[0] });
    axios.get(`http://${env.SERVER_HOST}:${env.SERVER_PORT}/api/place/all`)
        .then(response => { const value = response.data; if (value == undefined) data.value.place = []; else data.value.place = response.data });
    axios.get(`http://${env.SERVER_HOST}:${env.SERVER_PORT}/api/activity_place`, { params: { activity_id: props.id } })
        .then(response => { const value = response.data; if (value == undefined) data.value.link = []; else data.value.link = response.data });
})

const select = ref({ place: new Place(Place.EMPTY) });

function listFilter(): Array<Place> {
    const place_id = data.value.link
        .filter(link => link.activity_id == data.value.activity.id)
        .map(link => link.place_id);

    return data.value.place.filter(place => place_id.includes(place.id));
}

function dropdownFilter(): Array<Place> {
    const list = listFilter();
    if (list.length != 0)
        return data.value.place.filter(place => !list.includes(place));
    else return data.value.place;
}

function cardRefresh() {
    props.refresh();
    axios.get(`http://${env.SERVER_HOST}:${env.SERVER_PORT}/api/activity`, { params: { id: data.value.activity.id } })
        .then(response => { const value = response.data[0]; if (value == undefined) data.value.activity = new Activity(Activity.EMPTY); else data.value.activity = response.data[0] });
    axios.get(`http://${env.SERVER_HOST}:${env.SERVER_PORT}/api/place/all`)
        .then(response => { const value = response.data; if (value == undefined) data.value.place = []; else data.value.place = response.data });
    axios.get(`http://${env.SERVER_HOST}:${env.SERVER_PORT}/api/activity_place`, { params: { activity_id: data.value.activity.id } })
        .then(response => { const value = response.data; if (value == undefined) data.value.link = []; else data.value.link = response.data });
}


function saveCard() {
    if (data.value.activity.id != 0)
        axios.put(`http://${env.SERVER_HOST}:${env.SERVER_PORT}/api/activity/${data.value.activity.id}`, data.value.activity)
            .then(response => { const value = response.data; if (value == undefined) data.value.activity = new Activity(Activity.EMPTY); else { props.refresh(); data.value.activity = response.data; } });
    else axios.post(`http://${env.SERVER_HOST}:${env.SERVER_PORT}/api/activity`, {
        person_id: props.person_id,
        description: data.value.activity.description
    })
        .then(response => { console.log("1231231231"); const value = response.data; if (value == undefined) data.value.activity = new Activity(Activity.EMPTY); else { props.refresh(); data.value.activity = response.data; } });
}

function remove() {
    axios.delete(`http://${env.SERVER_HOST}:${env.SERVER_PORT}/api/activity/${data.value.activity.id}`)
        .then(response => { const value = response.data; if (value == undefined) data.value.activity = new Activity(Activity.EMPTY); else { props.refresh(); data.value.activity = response.data; } });
}

function createLink(place_id: number) {
    axios.post(`http://${env.SERVER_HOST}:${env.SERVER_PORT}/api/activity_place`, {
        activity_id: data.value.activity.id,
        place_id: place_id,
    })
        .then(response => { cardRefresh() });
}

function deleteLink(place_id: number) {
    axios.get(`http://${env.SERVER_HOST}:${env.SERVER_PORT}/api/activity_place`, { params: { activity_id: data.value.activity.id, place_id: place_id } })
        .then(response => {
            axios.delete(`http://${env.SERVER_HOST}:${env.SERVER_PORT}/api/activity_place/${response.data[0].id}`)
                .then(response => { cardRefresh() });
        });
}
</script>

<template>
    <PlaceCard :refresh="cardRefresh" v-if="show.place" :readonly="readonly" :mask="true"
        :close="() => { data.mask = true; show.place = false; }" :id="select.place.id" />
    <Window :index="index" :width="width" :mask="data.mask" :close="() => { props.refresh(); props.close(); }"
        header="Карточка активности">

        <Body style="width: 100%; display: table;">
            <TextAreaField label="Описание:" v-model:value="data.activity.description" :readonly="readonly" />
            <DropdownField
                :create="() => { data.mask = false; show.place = true; select.place = new Place(Place.EMPTY); }"
                label="Место:" :readonly="readonly">
                <List>
                    <Item :open="() => { data.mask = false; show.place = true; select.place = item; }"
                        :readonly="readonly" v-for="item in listFilter()" :text="item.name"
                        :remove="() => deleteLink(item.id)" />
                </List>
                <Dropdown :readonly="data.activity.id == 0" v-if="dropdownFilter().length != 0">
                    <Item :remove="() => { }" :open="() => { createLink(item.id) }" :removable="false" :width="'100%'"
                        :readonly="readonly" v-for="item in dropdownFilter()" :text="item.name" />
                </Dropdown>
            </DropdownField>
        </Body>
        <Footer v-if="!readonly" style="height: 42px;">
            <ButtonGroup :right="true">
                <Button v-if="data.activity.id != 0" :onClick="() => { remove(); props.close(); }" text="Удалить"
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