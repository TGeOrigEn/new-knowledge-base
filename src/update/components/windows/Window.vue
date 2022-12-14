<script setup lang="ts">
import { computed } from '@vue/reactivity';
import Button from '../buttons/Button.vue';
import ButtonGroup from '../buttons/ButtonGroup.vue';

const maskStyle = computed(() => props.mask
    ? `z-index: ${props.index}; background-color: rgba(0, 0, 0, 0.5);`
    : `z-index: ${props.index};`
);

const containerStyle = computed(() => `width: ${props.width};`);

const props = defineProps({
    width: { type: String, default: "max-content" },
    close: { type: Function, required: true },
    header: { type: String, required: true },
    mask: { type: Boolean, default: false },
    index: { type: Number, default: 1 },
});
</script>
            
<template>
    <div :style="maskStyle" class="x-window-mask">
        <div class="x-window-wrapper">
            <div :style="containerStyle" class="x-window-container">
                <div class="x-window-header-container">
                    <span class="x-window-header">{{ header }}</span>
                    <ButtonGroup>
                        <Button class="x-window-button-close" :onClick="close" style="padding: 5px;" src="/close.svg" />
                    </ButtonGroup>
                </div>
                <slot></slot>
            </div>
        </div>
    </div>
</template>

            
<style>
.x-window-mask {
    position: fixed;
    display: table;
    height: 100%;
    width: 100%;
    z-index: 2;
}

.x-window-wrapper {
    display: table-cell;
    vertical-align: middle;
}

.x-window-container {
    margin: 0px auto;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;
}

.x-window-header-container {
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    margin-top: 0;
    display: flex;
    align-items: center;
    background-color: #f5f5f5;
}

.x-window-header {
    margin-right: 100px;
    margin-left: 15px;
    font-weight: bold;
    font-size: 18px;
}

.x-window-button-close {
    width: 32px;
    height: 32px;
}
</style>