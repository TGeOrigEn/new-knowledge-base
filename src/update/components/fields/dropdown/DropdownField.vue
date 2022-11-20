<script setup lang="ts">

import Button from '../../buttons/Button.vue';

const props = defineProps({
    create: { type: Function, required: true, default: undefined },
    label: { type: String, required: true },
    readonly: Boolean
});
</script>

<template>
    <div class="x-field">
        <label class="x-field-label">{{ label }}</label>
        <div class="x-field-container">
            <div class="x-field-items-container">
                <div class="x-dropdown-container">
                    <slot></slot>

                </div>
            </div>
            <Button v-if="create != undefined" :disabled="readonly" :onClick="create" src="/plus.svg"
                class="x-field-button-add"></Button>
        </div>
    </div>
</template>

<style>
.x-dropdown-container {
    display: flex;
    flex: 0 0 100%;
    margin-left: auto;
    position: relative;
}

.x-dropdown-button {
    align-self: center;
    background-size: 14px;
    flex: 0 0 24px;
    margin-left: auto;
    width: 24px;
    height: 24px;
}


.x-field-container {
    display: flex;
    align-items: center;
    width: calc(100% - 10px);
    border-radius: 4px;
    touch-action: manipulation;
    white-space: pre;
}

.x-field-items-container {
    min-height: 26px;
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

.x-field-button-add {
    background-size: 14px;
    flex: 0 0 24px;
    margin-left: auto;
    width: 24px;
    height: 24px;
}
</style>