<script setup lang="ts">
import { ref, onBeforeMount } from 'vue';

import { Command, Activity, Link, Place } from '../../entities/DataBase';

import DropdownField from '../fields/dropdown/DropdownField.vue';
import TextAreaField from '../fields/TextAreaField.vue';
import Dropdown from '../fields/dropdown/Dropdown.vue';
import ButtonGroup from '../buttons/ButtonGroup.vue';
import Window from '../windows/Window.vue';
import Footer from '../windows/Footer.vue';
import Button from '../buttons/Button.vue';
import List from '../fields/list/List.vue';
import Item from '../fields/list/Item.vue';
import PlaceCard from './PlaceCard.vue';
import Body from '../windows/Body.vue';


const props = defineProps({
    person_id: { type: Number, required: true },
    id: { type: Number, required: true },

    refresh: { type: Function, required: true },
    close: { type: Function, required: true },

    readonly: { type: Boolean, required: true },
    mask: { type: Boolean, required: true },
});

const activity = ref<Activity>({ ...Activity.instance(), person_id: props.person_id });

const card = ref({
    id: -1,
    mask: false,
    refresh: function refresh() {
        Command.select<Link>(Link.NAME, { activity_id: activity.value.id }).then(response => {
            if (response == undefined) return;
            link.value = response;
        });

        Command.select<Place>(Place.NAME).then(response => {
            if (response == undefined) return;
            place.value = response;
        });
    }
});

const place = ref<Place[]>([]);

const link = ref<Link[]>([]);

const beforeMount = onBeforeMount(() => {

    Command.select<Activity>(Activity.NAME, { id: props.id }).then(response => {
        if (response == undefined) return;
        if (response.length == 0) return;
        activity.value = response[0];
    });

    Command.select<Link>(Link.NAME, { activity_id: props.id }).then(response => {
        if (response == undefined) return;
        link.value = response;
    });

    Command.select<Place>(Place.NAME).then(response => {
        if (response == undefined) return;
        place.value = response;
    });
});

function deleteLink(place_id: number) {
    Command.delete<Link>(Link.NAME, { place_id: place_id, activity_id: activity.value.id }).then(response => {
        card.value.refresh();
    });
};

function createLink(place_id: number) {
    Command.insert<Link>(Link.NAME, { place_id: place_id, activity_id: activity.value.id }).then(response => {
        card.value.refresh();
    });
};

function create() {
    Command.insert<Activity>(Activity.NAME, activity.value).then(response => {
        if (response == undefined) return;
        activity.value = response;
        props.refresh();
    });
};

function remove() {
    Command.delete<Link>(Link.NAME, { activity_id: activity.value.id }).then(() => {
        Command.delete<Activity>(Activity.NAME, activity.value.id).then(() => {
            props.refresh();
            props.close();
        });
    });
};

function save() {
    Command.update<Activity>(Activity.NAME, activity.value.id, activity.value).then(response => {
        if (response == undefined) return;
        activity.value = response;
        props.refresh();
    });
};

function filterItems(): Place[] {
    const id: number[] = link.value.map(link => link.place_id);
    return place.value.filter(place => id.includes(place.id));
};

function filterDropdown(): Place[] {
    const id: number[] = link.value.map(link => link.place_id);
    return place.value.filter(place => !id.includes(place.id));
};
</script>

<template>
    <PlaceCard :refresh="card.refresh" v-if="card.mask" :readonly="readonly" :mask="true"
        :close="() => card.mask = false" :id="card.id" />

    <Window :width="'600px'" :index="4" :mask="!card.mask" :close="props.close" header="Карточка активности">

        <Body class="x-body">
            <TextAreaField label="Описание:" :readonly="readonly" v-model:value="activity.description" />
            <DropdownField label="Место:" :readonly="readonly" :create="() => { card.id = -1; card.mask = true; }">

                <List>
                    <Item v-for="item in filterItems()" :text="item.name"
                        :remove="() => { deleteLink(item.id); props.refresh(); }"
                        :open="() => { card.id = item.id; card.mask = true; }" :readonly="readonly" />
                </List>

                <Dropdown v-if="filterDropdown().length != 0" :readonly="activity.id == -1">
                    <Item v-for="item in filterDropdown()" :width="'100%'" :readonly="readonly" :text="item.name"
                        :open="() => { createLink(item.id); props.refresh(); }" />
                </Dropdown>

            </DropdownField>
        </Body>

        <Footer v-if="!readonly">
            <ButtonGroup :right="true">
                <Button v-if="activity.id != -1" class="x-button" text="Удалить" :onClick="remove"></Button>
            </ButtonGroup>
            <ButtonGroup :left="true">
                <Button v-if="activity.id != -1" class="x-button" text="Сохранить" :onClick="save"></Button>
                <Button v-if="activity.id == -1" class="x-button" text="Создать" :onClick="create"></Button>
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