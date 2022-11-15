<script setup lang="ts">
import type Career from '@/update/entities/tables/Career';

const props = defineProps({ value: { type: Array<Career>, required: true } });
</script>

<template>
    <td>
        <p v-for="career in value">
            <span>{{ career.start_date }}</span>
            <span>-</span>
            <span>{{ career.end_date }}</span>
            <span>—</span>
            <span>{{ career.post }},</span>
            <span>{{ career.place }};</span>
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