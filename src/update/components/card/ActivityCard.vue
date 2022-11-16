<script setup lang="ts">
import Activity from '../../entities/tables/Activity';

import ButtonGroup from '../buttons/ButtonGroup.vue';
import Window from '../windows/Window.vue';
import Body from '../windows/Body.vue';
import Footer from '../windows/Footer.vue';
import Button from '../buttons/Button.vue';

import TextField from '../fields/TextField.vue';
import { ref, onBeforeMount } from 'vue';
import DropdownField from '../fields/dropdown/DropdownField.vue';

const props = defineProps({
    activity: { type: Activity, required: true, default: Activity.EMPTY },

    close: { type: Function, required: true },
    remove: { type: Function },
    save: { type: Function },
    index: { type: Number, default: 2 },
    readonly: Boolean,
    width: String,
    mask: Boolean
});

const options = ref(["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII", "XIII", "XIV"]);

const beforeMount = onBeforeMount(() => {
    data.value.activity = new Activity(props.activity);
})

const data = ref({
    activity: props.activity
});
</script>

<template>
    <Window :index="index" :width="width" :mask="mask" :close="close" header="Карточка активности">

        <Body style="width: 100%; display: table;">
            <TextField label="Описание:" v-model:value="data.activity.description" :readonly="readonly" />
            <DropdownField label="Место:" v-model:value="data.activity.place" :disabled="readonly" :options="options" />
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