<script setup lang="ts">

import Button from '../../buttons/Button.vue';
import Item from './Item.vue';

const props = defineProps({
    value: { type: Array<String>, required: true },
    remove: { type: Function, required: true },
    open: { type: Function, required: true },
    label: { type: String, required: true },
    readonly: Boolean
});
</script>

<template>
    <div class="x-field">
        <label class="x-field-label">{{ label }}</label>
        <div class="x-field-container">
            <div class="x-field-items-container">
                <ul class="x-field-items-list">
                    <Item :readonly="readonly" v-for="item in value" :remove="remove" :open="open" :text="(item as string)" />
                </ul>
            </div>
            <Button src="/plus.svg" class="x-field-button-add"></Button>
        </div>
    </div>
</template>

<style>
.x-field-container {
    display: flex;
    align-items: center;
    width: calc(100% - 10px);
    border-radius: 4px;
    touch-action: manipulation;
    white-space: pre;
}

.x-field-items-container {
    height: 26px;
    display: flex;
    align-items: center;
    width: 100%;
    background-color: #f8f9fa;
    border: 1px solid #85858560;
    border-radius: 4px;
    margin: 5px;
    touch-action: manipulation;
    white-space: pre;
}

.x-field-items-list {
    flex-flow: row wrap;
    list-style-type: none;
    display: flex;
    align-items: center;
}

.x-field-button-add {
    background-size: 14px;
    flex: 0 0 24px;
    margin-left: auto;
    width: 24px;
    height: 24px;
}
</style>