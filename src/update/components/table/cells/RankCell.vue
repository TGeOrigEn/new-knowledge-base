<script setup lang="ts">
import type Rank from '@/update/entities/tables/Rank';

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
    margin: 2px;
}

span {
    margin: 2px;
}
</style>