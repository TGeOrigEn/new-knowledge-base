<script setup lang="ts">
import { Person } from '@/update/entities/DataBase';

const props = defineProps({ value: { type: Person, required: true } });
</script>

<template>
    <td>
        <p>
            <span>Уровень образования:</span>
            <span>{{ value.level_education }};</span>
        </p>
        <p>
            <span>Учебное учреждение:</span>
            <span>{{ value.educational_institution }};</span>
        </p>
        <p>
            <span>Место учёбы:</span>
            <span>{{ value.location_educational_institution }}.</span>
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