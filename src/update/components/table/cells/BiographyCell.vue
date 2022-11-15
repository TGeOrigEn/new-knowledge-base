<script setup lang="ts">
import Person from '@/update/entities/tables/Person';

const props = defineProps({ value: { type: Person, required: true } });
</script>

<template>
    <td>
        <p>
            <span>{{ value.surname }}</span>
            <span>{{ value.name }}</span>
            <span>{{ value.patronymic }};</span>
        </p>
        <p>
            <span>Год рождения:</span>
            <span>{{ value.date_birth }}</span>
        </p>
        <p>
            <span>Вероисповедание:</span>
            <span>{{ value.religion }};</span>
        </p>
        <p>
            <span>Происхождение:</span>
            <span>{{ value.origin }}.</span>
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