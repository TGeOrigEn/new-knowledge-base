<script setup lang="ts">
import Rank from '../../entities/tables/Rank';

import ButtonGroup from '../buttons/ButtonGroup.vue';
import Window from '../windows/Window.vue';
import Body from '../windows/Body.vue';
import Footer from '../windows/Footer.vue';
import Button from '../buttons/Button.vue';

const props = defineProps({
    close: { type: Function, required: true },
    cancel: Function,
    save: Function,
    accept: Function,
    remove: Function,

    message: { type: String, required: true },
    width: String,
    mask: Boolean
});

</script>

<template>
    <Window :index="5" :width="width" :mask="mask" :close="close" header="Карточка уведомления">

        <Body style="width: 100%;">
            <h3 style="text-align: center; margin: 25px;"><pre>{{ message }}</pre></h3>
        </Body>
        <Footer style="height: 42px;">
            <ButtonGroup :right="true" :left="true">
                <Button v-if="save != undefined" :onClick="save" text="Сохранить" style="margin-left: 15px; margin-right: 15px; height: 32px;" />
                <Button v-if="accept != undefined" :onClick="accept" text="Принять" style="margin-left: 15px; margin-right: 15px; height: 32px;" />
                <Button v-if="remove != undefined" :onClick="remove" text="Удалить" style="margin-left: 15px; margin-right: 15px; height: 32px;" />               
                <Button v-if="cancel != undefined" :onClick="cancel" text="Отменить" style="margin-left: 15px; margin-right: 15px; height: 32px;" />
            </ButtonGroup>
        </Footer>
    </Window>
</template>

<style>

</style>