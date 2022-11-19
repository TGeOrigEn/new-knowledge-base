<script setup lang="ts">
import type { Rank } from '@/update/entities/DataBase';

const props = defineProps({ value: { type: Array<Rank>, required: true } });
</script>

<template>
    <td>
        <p v-for="rank in value">
            <span>{{ rank.start_date }}</span>
            <span>-</span>
            <span>{{ rank.end_date }}</span>
            <span>—</span>
            <span>Класс:</span>
            <span>{{ rank.degree }},</span>
            <span>{{ rank.name }};</span>
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