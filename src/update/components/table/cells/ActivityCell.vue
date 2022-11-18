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
            <p>Описание:</p>
            <span>{{ activity.description }};</span>
            <p>Места:</p>
            <span>{{ activity.description }};</span>
        </p>
    </td>
</template>

<style scoped>
p {
    margin: 2px;
}

span {
    white-space: pre;
    margin: 2px;
}
</style>