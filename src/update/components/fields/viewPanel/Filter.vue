<script setup lang="ts">

import Button from '../../buttons/Button.vue';

const props = defineProps({
});
</script>

<template>
    <div>
        <div class="x-field-container">
            <div class="x-field-items-container">
                <div class="x-dropdown-container">
                    <slot></slot>

                </div>
            </div>
            <Button :disabled="readonly" :onClick="create" src="/close.svg" class="x-field-button-add"></Button>
        </div>
    </div>
</template>

<style scoped>
.x-field-container {

    display: flex;
    align-items: center;
    width: max-content;
    border-radius: 4px;
    touch-action: manipulation;
    white-space: pre;

}
</style>