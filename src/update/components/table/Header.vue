<script setup lang="ts">
import type { PropType } from 'vue';

const props = defineProps({
    name: { type: String, required: true },
    trigger: { type: Function as PropType<(payload: MouseEvent) => void>, required: false }
});
</script>

<template>
    <th class="x-header">
        <span>{{ name }}</span>
    </th>
</template>

<style scoped>
th {
    background-color: #f8f9fa;
    padding: 5px;
}

span {
    min-width: 100px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: inherit;
    display: block;
}
</style>