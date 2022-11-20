<script setup lang="ts">

import Button from '../../buttons/Button.vue';
</script>

<template>
    <div>
        <div class="x-field-container">
            <div class="x-field-items-container">
                <div class="x-dropdown-container">
                    <slot></slot>

                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.x-field-container {
    min-width: 46px;
    display: flex;
    align-items: center;
    width: max-content;
    border-radius: 4px;
    touch-action: manipulation;
    white-space: pre;
}
</style>