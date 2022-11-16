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

const props = defineProps({
    activity: { type: Activity, required: true, default: Activity.EMPTY },
    place: { type: Array<Place>, required: true, default: [] },
    link: { type: Array<Link>, required: true, default: [] },

    close: { type: Function, required: true },
    remove: { type: Function },
    save: { type: Function },

    index: { type: Number, default: 2 },
    readonly: Boolean,
    width: String,
    mask: Boolean
});

const beforeMount = onBeforeMount(() => {
    data.value.activity = new Activity(props.activity);
    data.value.place = [...props.place];
    data.value.link = [...props.link];
})

const data = ref({
    activity: props.activity,
    place: props.place,
    link: props.link,
    mask: props.mask
});

const show = ref({
    dropdown: false,
    place: false
});

const select = ref(Place.EMPTY);

function listFilter(): Array<Place> {
    const place_id = data.value.link
        .filter(link => link.activity_id == data.value.activity.person_id)
        .map(link => link.place_id);

    return data.value.place.filter(place => place_id.includes(place.id));
}

function dropdownFilter(): Array<Place> {
    const list = listFilter();
    if (list.length != 0)
        return data.value.place.filter(place => !list.includes(place));
    else return data.value.place;
}
</script>

<template>
    <PlaceCard v-if="show.place" :readonly="readonly" :mask="true" :close="() => { data.mask = true; show.place = false; }"
        :place="select" />
    <Window :index="index" :width="width" :mask="data.mask" :close="close" header="Карточка активности">

        <Body style="width: 100%; display: table;">
            <TextAreaField label="Описание:" v-model:value="data.activity.description" :readonly="readonly" />
            <DropdownField :create="() => { data.mask = false; show.place = true; select = Place.EMPTY; }"
                label="Место:" v-model:value="data.activity.place" :readonly="readonly">
                <List>
                    <Item :open="() => { data.mask = false; show.place = true; select = item; }" :readonly="readonly"
                        v-for="item in listFilter()" :remove="remove" :text="item.name" />
                </List>
                <Dropdown v-if="dropdownFilter().length != 0">
                    <Item :width="'100%'" :readonly="readonly" v-for="item in dropdownFilter()" :remove="remove"
                        :text="item.name" />
                </Dropdown>
            </DropdownField>
        </Body>
        <Footer v-if="!readonly" style="height: 42px;">
            <ButtonGroup :right="true">
                <Button  v-if="activity.id != 0" :onClick="remove" text="Удалить" style="height: 32px;" />
            </ButtonGroup>
            <ButtonGroup :right="false">
                <Button :onClick="save" text="Сохранить" style="height: 32px;" />
            </ButtonGroup>
        </Footer>
    </Window>
</template>

<style>

</style>