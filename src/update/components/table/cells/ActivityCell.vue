<script setup lang="ts">
import type { FullActivity } from '@/update/entities/DataBase';

const props = defineProps({
    value: { type: Array<FullActivity>, required: true },
});
</script>

<template>
    <td>
        <p v-for="activity in value">
            <span>{{ activity.activity.description }};</span>
        <p v-if="activity.place.length != 0">Места:</p>
        <p v-for="item in activity.place">{{ item.name }};</p>
        </p>
    </td>
</template>

<style scoped>
p {
    min-width: 100px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: inherit;
    display: block;
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