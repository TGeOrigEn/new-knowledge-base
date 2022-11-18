<script setup lang="ts">
import { Person } from '@/update/entities/DataBase';

const props = defineProps({
    person: { type: Person, required: true }
});
</script>

<template>
    <td>
        <p>
            <span>{{ person.surname }}</span>
            <span>{{ person.name }}</span>
            <span>{{ person.patronymic }};</span>
        </p>
        <p>
            <span>Год рождения:</span>
            <span>{{ person.date_birth }};</span>
        </p>
        <p>
            <span>Вероисповедание:</span>
            <span>{{ person.religion }};</span>
        </p>
        <p>
            <span>Происхождение:</span>
            <span>{{ person.origin }}.</span>
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