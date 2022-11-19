<script setup lang="ts">
import type { Activity, Place } from '@/update/entities/DataBase';

const props = defineProps({
    value: { type: Array<Activity>, required: true },
    place: { type: Array<Place>, required: true }
});
</script>

<template>
    <td>
        <p v-for="activity in value">
            <span>{{ activity.description }};</span>
        <p v-if="place.length != 0">Места:</p>
        <p v-for="item in place">{{ item.name }};</p>
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