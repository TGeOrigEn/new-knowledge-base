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

const style = computed(() => `width: ${props.width}; max-width: unset;`)

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
                <span class="x-item-text" :style="style">{{ text }}</span>
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
    max-width: 100px;
    margin-left: 5px;
    margin-right: 5px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
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