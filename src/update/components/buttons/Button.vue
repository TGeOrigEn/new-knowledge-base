<script setup lang="ts">
import { computed } from '@vue/reactivity';

const style = computed(() => `background-image: url(${props.src});`);

const props = defineProps({
    disabled: Boolean,
    text: String,
    src: String
});
</script>
            
<template>
    <button :disabled="disabled" class="x-button" :style="style">
        <span class="x-button-text" v-if="text != undefined">{{ text }}</span>
        <slot></slot>
    </button>
</template>

            
<style>
.x-button {
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    background-origin: content-box;
    background-color: #f8f9fa;
    border: 1px solid #85858560;
    border-radius: 4px;
    cursor: pointer;
    margin: 5px;
    touch-action: manipulation;
    white-space: pre;
}

.x-button:disabled {
    background-color: #85858560;
}

.x-button:disabled:hover {
    cursor: default;
    border-color: #85858560;
    box-shadow: 0 !important;
    color: #85858560;
}

.x-button .x-button-text {
    font-family: Helvetica, Arial, sans-serif;
    font-weight: bold;
    padding-left: 5px;
    padding-right: 5px;
    font-size: 14px;
}

.x-button:hover {
    border-color: #777777;
    box-shadow: rgba(0, 0, 0, .1) 0 1px 1px;
    color: #202124;
}

.x-button:focus {
    outline: none;
}
</style>