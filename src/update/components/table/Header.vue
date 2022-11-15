<script setup lang="ts">
import type { PropType } from 'vue';

const props = defineProps({
    name: { type: String, required: true },
    trigger: { type: Function as PropType<(payload: MouseEvent) => void>, required: true }
});
</script>

<template>
    <th class="x-header">
        <div class="x-header-container">
            <span class="x-header-name">{{ name }}</span>
            <div @click="trigger" class='x-header-trigger'>
                <slot></slot>
            </div>
        </div>
    </th>
</template>

<style>
.x-header {
    background-color: aliceblue;
    min-width: max-content;
    padding: 0;
}

.x-header .x-header-container {
    display: flex;
    height: 100%;
    width: 100%;
}

.x-header .x-header-container .x-header-name {
    margin-bottom: 5px;
    margin-top: 5px;
}

.x-header .x-header-container .x-header-trigger {
    flex: 1;
}
</style>