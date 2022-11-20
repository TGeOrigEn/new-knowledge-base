<script setup lang="ts">
import type { Career } from '@/update/entities/DataBase';
import { ref } from 'vue';

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