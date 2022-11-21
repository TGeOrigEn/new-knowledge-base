<script setup lang="ts">

import ButtonGroup from '../buttons/ButtonGroup.vue';
import Window from '../windows/Window.vue';
import Body from '../windows/Body.vue';
import Footer from '../windows/Footer.vue';
import Button from '../buttons/Button.vue';

const props = defineProps({
    close: { type: Function, required: true },
    message: { type: String, required: true },
    cancel: Function,
    exit: Function,
    width: String,
    mask: Boolean
});

</script>

<template>
    <Window :index="5" :width="width" :mask="mask" :close="close" header="Карточка уведомления">

        <Body style="width: 100%;">
            <h3 style="text-align: center; margin: 25px;">
                <pre>{{ message }}</pre>
            </h3>
        </Body>
        <Footer style="height: 42px;">
            <ButtonGroup :right="true" :left="true">
                <Button v-if="exit != undefined" :onClick="exit" text="Выйти"
                    style="margin-left: 15px; margin-right: 15px; height: 32px;" />
                <Button v-if="cancel != undefined" :onClick="cancel" text="Отмена"
                    style="margin-left: 15px; margin-right: 15px; height: 32px;" />
            </ButtonGroup>
        </Footer>
    </Window>
</template>

<style>

</style>