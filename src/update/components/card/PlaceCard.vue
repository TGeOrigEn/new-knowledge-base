<script setup lang="ts">
import Place from '../../entities/tables/Place';

import ButtonGroup from '../buttons/ButtonGroup.vue';
import Window from '../windows/Window.vue';
import Body from '../windows/Body.vue';
import Footer from '../windows/Footer.vue';
import Button from '../buttons/Button.vue';

import SelectField from '../fields/SelectField.vue';
import TextField from '../fields/TextField.vue';
import { ref, onBeforeMount } from 'vue';

const props = defineProps({
    place: { type: Place, required: true, default: Place.EMPTY },
    isOpen: Boolean,
    close: { type: Function, required: true },
    remove: { type: Function },
    save: { type: Function },
    index: { type: Number, default: 2 },
    readonly: Boolean,
    width: String,
    mask: Boolean
});

const beforeMount = onBeforeMount(() => {
    data.value.place = new Place(props.place);
})

const data = ref({
    place: props.place
});
</script>

<template>
    <Window :index="index" :width="width" :mask="mask" :close="close" header="Карточка места">

        <Body style="width: 100%; display: table;">
            <TextField label="Название:" v-model:value="data.place.name" :readonly="readonly" />
            <TextField label="Описание:" v-model:value="data.place.description" :readonly="readonly" />
            <TextField label="Долгота:" v-model:value="data.place.longitude" :readonly="readonly" />
            <TextField label="Широта:" v-model:value="data.place.latitude" :readonly="readonly" />
        </Body>
        <Footer v-if="!readonly" style="height: 42px;">
            <ButtonGroup :right="true">
                <Button :onClick="remove" text="Удалить"
                    style="height: 32px;" />
            </ButtonGroup>
            <ButtonGroup :right="false">
                <Button :onClick="save" text="Сохранить"
                    style="height: 32px;" />
            </ButtonGroup>
        </Footer>
    </Window>
</template>

<style>

</style>