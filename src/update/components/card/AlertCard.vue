<script setup lang="ts">
import Rank from '../../entities/tables/Rank';

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
    rank: { type: Rank, required: true, default: Rank.EMPTY },

    close: { type: Function, required: true },
    remove: { type: Function },
    index: { type: Number, default: 2 },
    readonly: Boolean,
    width: String,
    mask: Boolean
});

const data = ref({
    rank: props.rank
});
</script>

<template>
    <Window :index="index" :width="width" :mask="mask" :close="close" header="Карточка чина">

        <Body style="width: 100%; display: table;">
        </Body>
        <Footer v-if="!readonly" style="height: 42px;">
            <ButtonGroup :right="true">
                <Button v-if="rank.id != 0" :onClick="remove" text="Удалить" style="height: 32px;" />
            </ButtonGroup>
            <ButtonGroup :right="false">
                <Button :onClick="save" text="Сохранить" style="height: 32px; " />
            </ButtonGroup>
        </Footer>
    </Window>
</template>

<style>

</style>