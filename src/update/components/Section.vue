<script setup lang="ts">
import { computed } from '@vue/reactivity';
import { ref } from 'vue'

import Button from './buttons/Button.vue';

const props = defineProps({ isOpen: Boolean, header: { type: String, required: true }, disabled: Boolean });
const style = computed(() => isOpen.value ? 'transform: rotate(180deg);' : '')
const isOpen = ref<boolean>(props.isOpen);
</script>
                
<template>
    <section class="x-section">
        <div class="x-section-container">
            <div class="x-section-label-container">
                <label class="x-section-label">{{ header }}</label>
                <Button :disabled="disabled" class="x-section-button" src="/arrow.svg" :style="style"
                    @click="() => isOpen = !isOpen"></Button>
            </div>
        </div>
        <slot v-if="isOpen">
        </slot>
    </section>
</template>
                
<style>
.x-section {
    display: table;
    width: 100%;
}

.x-section-container {
    display: table-caption;
    background-color: #f5f5f5;
    margin: 5px;
    border-radius: 5px;
    border: 1px;
    vertical-align: middle;
    text-align: center;
    font-weight: bold;
    font-size: 18px;
    white-space: nowrap;
}

.x-section-label-container {
    display: flex;
    align-items: center;
    justify-content: center;
}

.x-section-label-container .x-section-button {
    height: 24px;
    width: 24px;
    margin-left: auto;
    margin-right: 15px;
}

.x-section-label-container .x-section-label {
    flex: 1;
    padding-right: 5px;
    padding-left: 5px;
}
</style>