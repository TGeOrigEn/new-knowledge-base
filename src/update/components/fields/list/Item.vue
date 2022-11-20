<script setup lang="ts">
import { computed } from '@vue/reactivity';
import Button from '../../buttons/Button.vue';

const props = defineProps({
    remove: { type: Function, default: undefined },
    open: { type: Function, required: true },

    readonly: { type: Boolean, required: true },
    text: { type: String, required: true },

    width: String
});

const style = computed(() => props.width != undefined ? `width: ${props.width}; max-width: unset;` : "")

function click(event: MouseEvent) {
    if (props.remove !== undefined)
        props.remove();

    event.stopImmediatePropagation();
}
</script>

<template>
    <li class="x-item-wrapper" :title="text" :style="style">
        <Button class="x-item" :onClick="open" :style="style">
            <div class="x-item-container" :style="style">
                <div class="x-item-text" :style="style">{{ text }}</div>
                <Button src="/close.svg" v-if="!readonly && remove !== undefined" class="x-item-button-remove"
                    @click="click" />
            </div>
        </Button>
    </li>
</template>

<style>
.x-item-wrapper {
    flex-flow: wrap;
    display: flex;
}

.x-item-container {
    align-items: center;
    display: flex;
}

.x-item-text {
    /* text-align: left; */
    word-break: break-word;
    white-space: pre-line;
    overflow-wrap: break-word;
    -ms-word-break: break-word;
    word-break: break-word;
    -ms-hyphens: auto;
    -moz-hyphens: auto;
    -webkit-hyphens: auto;
    hyphens: auto;
    max-width: 39vw;
    margin-left: 5px;
    margin-right: 5px;
}

.x-item-button-remove {
    background-size: 6px;
    margin-left: 0px;
    height: 12px;
    width: 12px;
}

.x-item {
    margin: 2px;
    white-space: unset;
}
</style>