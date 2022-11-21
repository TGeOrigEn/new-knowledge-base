<script setup lang="ts">
import { ref, onBeforeMount } from 'vue';

import { Command, Link, Place } from '../../entities/DataBase';

import TextAreaField from '../fields/TextAreaField.vue';
import ButtonGroup from '../buttons/ButtonGroup.vue';
import TextField from '../fields/TextField.vue';
import Window from '../windows/Window.vue';
import Footer from '../windows/Footer.vue';
import Button from '../buttons/Button.vue';
import Body from '../windows/Body.vue';

const props = defineProps({
    id: { type: Number, required: true },

    refresh: { type: Function, required: true },
    close: { type: Function, required: true },

    readonly: { type: Boolean, required: true },
    mask: { type: Boolean, required: true },
});

const place = ref<Place>(Place.instance());

const beforeMount = onBeforeMount(() => {
    Command.select<Place>(Place.NAME, { id: props.id }).then(response => {
        if (response == undefined) return;
        if (response.length == 0) return;
        place.value = response[0];
    });
})

function create() {
    Command.insert<Place>(Place.NAME, localStorage.getItem('token')!, place.value).then(response => {
        if (response == undefined) return;
        place.value = response;
        props.refresh();
    });
};

function remove() {
    Command.delete<Link>(Link.NAME, localStorage.getItem('token')!, { place_id: place.value.id }).then(() => {
        Command.delete<Place>(Place.NAME, localStorage.getItem('token')!, place.value.id).then(() => {
            props.refresh();
            props.close();
        })
    });
};

function save() {
    Command.update<Place>(Place.NAME, localStorage.getItem('token')!, place.value.id, place.value).then(response => {
        if (response == undefined) return;
        place.value = response;
        props.refresh();
    });
};
</script>

<template>
    <Window :width="'70vw'" :index="5" :mask="mask" :close="props.close" header="Карточка места">

        <Body class="x-dody">
            <TextAreaField label="Название:" :readonly="readonly" v-model:value="place.name" />
            <TextAreaField label="Описание:" :readonly="readonly" v-model:value="place.description" />
            <TextField label="Долгота:" :readonly="readonly" v-model:value="place.longitude" />
            <TextField label="Широта:" :readonly="readonly" v-model:value="place.latitude" />
        </Body>

        <Footer v-if="!readonly">
            <ButtonGroup :right="true">
                <Button v-if="place.id != -1" class="x-button" text="Удалить" :onClick="remove"></Button>
            </ButtonGroup>
            <ButtonGroup :left="true">
                <Button v-if="place.id != -1" class="x-button" text="Сохранить" :onClick="save"></Button>
                <Button v-if="place.id == -1" class="x-button" text="Создать" :onClick="create"></Button>
            </ButtonGroup>
        </Footer>

    </Window>
</template>

<style scoped>
.x-button {
    height: 32px;
}

.x-dody {
    display: table;
}
</style>